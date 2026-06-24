#!/usr/bin/env python3
import base64
import hashlib
import html
import json
import mimetypes
import re
import subprocess
import time
import urllib.parse
import urllib.request
from collections import OrderedDict
from html.parser import HTMLParser
from pathlib import Path


BOOK_URL = "https://brunch.co.kr/brunchbook/haul-mind"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0 Safari/537.36"
)
HTML_FETCH_UA = "Mozilla/5.0"
VOID_TAGS = {"img", "br"}
ALLOWED_HTML_TAGS = {
    "p",
    "br",
    "b",
    "strong",
    "i",
    "em",
    "u",
    "blockquote",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "figure",
    "figcaption",
    "img",
    "a",
    "span",
}
DROP_CONTENT_TAGS = {"script", "style"}


def fetch_response(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    return urllib.request.urlopen(req, timeout=30)


def fetch_text(url: str) -> str:
    quoted_ua = HTML_FETCH_UA.replace("'", "'\"'\"'")
    quoted_url = url.replace("'", "'\"'\"'")
    command = f"curl -L -A '{quoted_ua}' '{quoted_url}'"
    result = subprocess.run(
        command,
        check=True,
        shell=True,
        executable="/bin/zsh",
        capture_output=True,
    )
    return result.stdout.decode("utf-8", "ignore")


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def safe_name(value: str) -> str:
    value = normalize_space(value)
    value = re.sub(r"[\\\\/:*?\"<>|]+", "-", value)
    value = re.sub(r"\s+", "_", value)
    value = value.strip("._-")
    return value[:120] or "post"


def strip_tags(value: str) -> str:
    value = re.sub(r"<br\s*/?>", "\n", value, flags=re.I)
    value = re.sub(r"<[^>]+>", "", value)
    return normalize_space(html.unescape(value))


def normalize_text_for_dedupe(value: str) -> str:
    value = strip_tags(value)
    value = value.replace("\xa0", " ")
    value = re.sub(r"^\s*\d+화\s*", "", value)
    value = re.sub(r"[^0-9a-z가-힣]+", "", value.lower())
    return value


def content_fingerprint(value: str) -> str:
    normalized = normalize_text_for_dedupe(value)
    return hashlib.sha1(normalized.encode("utf-8")).hexdigest() if normalized else ""


def pick_extension(url: str, content_type: str | None) -> str:
    path = urllib.parse.urlparse(url).path
    ext = Path(path).suffix.lower()
    if ext in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"}:
        return ".jpg" if ext == ".jpeg" else ext
    guessed = mimetypes.guess_extension((content_type or "").split(";")[0].strip()) or ".bin"
    if guessed == ".jpe":
        return ".jpg"
    return guessed


class CleanHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.output = []
        self.drop_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in DROP_CONTENT_TAGS:
            self.drop_depth += 1
            return
        if self.drop_depth or tag not in ALLOWED_HTML_TAGS:
            return
        attrs_dict = dict(attrs)
        kept_attrs = []
        if tag == "img":
            src = attrs_dict.get("src") or attrs_dict.get("data-src")
            if src:
                if src.startswith("//"):
                    src = "https:" + src
                kept_attrs.append(("src", src))
            kept_attrs.append(("alt", attrs_dict.get("alt", "")))
        elif tag == "a":
            href = attrs_dict.get("href")
            if href:
                kept_attrs.append(("href", href))
        elif tag == "p":
            klass = attrs_dict.get("class")
            if klass:
                kept_attrs.append(("class", klass))

        opening = "<" + tag
        for key, value in kept_attrs:
            opening += f' {key}="{html.escape(value, quote=True)}"'
        opening += ">"
        self.output.append(opening)

    def handle_endtag(self, tag):
        if tag in DROP_CONTENT_TAGS:
            if self.drop_depth:
                self.drop_depth -= 1
            return
        if self.drop_depth or tag not in ALLOWED_HTML_TAGS or tag in VOID_TAGS:
            return
        self.output.append(f"</{tag}>")

    def handle_data(self, data):
        if not self.drop_depth:
            self.output.append(html.escape(data, quote=False))

    def handle_entityref(self, name):
        if not self.drop_depth:
            self.output.append(f"&{name};")

    def handle_charref(self, name):
        if not self.drop_depth:
            self.output.append(f"&#{name};")


class PlainTextParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)


def cleaned_plain_text(value: str) -> str:
    parser = PlainTextParser()
    parser.feed(re.sub(r"<br\s*/?>", "\n", value, flags=re.I))
    text = "".join(parser.parts).replace("\xa0", " ")
    return normalize_space(text)


def newest_export_dir() -> Path:
    candidates = sorted(Path.home().glob("think-sis.tistory.com-export-*"))
    if not candidates:
        raise FileNotFoundError("think-sis export folder not found")
    return candidates[-1]


def load_book_articles() -> list[dict]:
    html_text = fetch_text(BOOK_URL)
    match = re.search(r'<script id="__BDFC__" type="application/json">([^<]+)</script>', html_text)
    if not match:
        raise RuntimeError("brunchbook data blob not found")
    data = json.loads(base64.b64decode(match.group(1)))
    articles = []
    for chapter in data["brunchbook"]["chapters"]:
        articles.extend(chapter["articles"])
    return articles


def download_image(url: str, out_dir: Path, index: int) -> tuple[str, int]:
    with fetch_response(url) as resp:
        data = resp.read()
        ext = pick_extension(url, resp.headers.get("Content-Type"))
    filename = f"{index:02d}{ext}"
    path = out_dir / filename
    path.write_bytes(data)
    return filename, len(data)


def build_index(entries: list[dict]) -> str:
    lines = [
        "<!doctype html>",
        '<html lang="ko">',
        "<head>",
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        "  <title>think-sis export</title>",
        "  <style>body { font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; margin: 40px auto; max-width: 980px; padding: 0 20px; } table { width: 100%; border-collapse: collapse; } th, td { border-bottom: 1px solid #ddd; text-align: left; padding: 10px 8px; vertical-align: top; } a { color: #0b5bd3; }</style>",
        "</head>",
        "<body>",
        "  <h1>think-sis export</h1>",
        f"  <p>총 글 수: {len(entries)}</p>",
        "  <table>",
        "    <thead><tr><th>#</th><th>제목</th><th>날짜</th><th>분류</th><th>이미지</th><th>파일</th></tr></thead>",
        "    <tbody>",
    ]
    for idx, entry in enumerate(entries, start=1):
        rel = html.escape(entry["relative_post_html"])
        title = html.escape(entry["title"])
        date = html.escape(entry["date"])
        category = html.escape(entry["category"])
        image_count = entry["image_count"]
        lines.append(
            f'      <tr><td>{idx}</td><td><a href="{rel}">{title}</a></td><td>{date}</td><td>{category}</td><td>{image_count}</td><td>{rel}</td></tr>'
        )
    lines.extend(["    </tbody>", "  </table>", "</body>", "</html>"])
    return "\n".join(lines)


def wrap_post_html(title: str, subtitle: str, date: str, source_url: str, cover_image: str | None, content_html: str) -> str:
    cover_block = f'<p><img src="{html.escape(cover_image)}" alt=""></p>' if cover_image else ""
    subtitle_block = f"<p><strong>{html.escape(subtitle)}</strong></p>" if subtitle else ""
    return f"""<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; margin: 40px auto; max-width: 860px; line-height: 1.7; padding: 0 20px; }}
    img {{ max-width: 100%; height: auto; display: block; margin: 20px auto; }}
    .meta {{ color: #555; font-size: 14px; margin-bottom: 24px; }}
    .content {{ border-top: 1px solid #ddd; padding-top: 24px; }}
    a {{ color: #0b5bd3; }}
  </style>
</head>
<body>
  <h1>{html.escape(title)}</h1>
  <div class="meta">
    <div>출처: Brunch Book</div>
    <div>날짜: {html.escape(date or "-")}</div>
    <div>원문: <a href="{html.escape(source_url)}">{html.escape(source_url)}</a></div>
  </div>
  {subtitle_block}
  {cover_block}
  <div class="content">
    {content_html}
  </div>
</body>
</html>
"""


def extract_rendered_brunch_body(article_html: str) -> str:
    match = re.search(
        r'<div id="ArticleView"[^>]*>\s*<astro-island[^>]*await-children>(.*?)</astro-island>',
        article_html,
        flags=re.S,
    )
    if not match:
        raise RuntimeError("rendered brunch body not found")
    rendered_fragment = re.sub(r"<!--.*?-->", "", match.group(1), flags=re.S)
    parser = CleanHTMLParser()
    parser.feed(rendered_fragment)
    cleaned = "".join(parser.output)
    cleaned = re.sub(r"<p[^>]*>\s*</p>", "", cleaned, flags=re.S)
    cleaned = re.sub(r"\s+srcset=\"[^\"]*\"", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s+loading=\"lazy\"", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s+decoding=\"async\"", "", cleaned, flags=re.I)
    return cleaned.strip()


def collect_source_image_urls(article: dict, article_html: str, content_html: str) -> tuple[list[str], str | None]:
    image_urls = OrderedDict()
    cover_url = None

    for image_info in article.get("articleImageList", []):
        raw_url = image_info.get("url")
        if not raw_url:
            continue
        normalized = raw_url.replace("http://", "https://", 1)
        if image_info.get("type") == "cover" and not cover_url:
            cover_url = normalized
        image_urls.setdefault(normalized, None)

    for source in re.findall(r'<img[^>]+src="([^"]+)"', content_html):
        if source.startswith("//"):
            source = "https:" + source
        if source.startswith(("http://", "https://")):
            image_urls.setdefault(source.replace("http://", "https://", 1), None)

    for source in re.findall(r'background-image:\s*url\(([^)]+)\)', article_html):
        source = source.strip(' "\'')
        if source.startswith("//"):
            source = "https:" + source
        if source.startswith(("http://", "https://")):
            normalized = source.replace("http://", "https://", 1)
            image_urls.setdefault(normalized, None)
            if not cover_url:
                cover_url = normalized

    return list(image_urls.keys()), cover_url


def write_article_files(post_dir: Path, article: dict, article_url: str, article_html: str, content_html: str) -> dict:
    images_dir = post_dir / "images"
    images_dir.mkdir(parents=True, exist_ok=True)

    image_urls, cover_url = collect_source_image_urls(article, article_html, content_html)
    download_map = {}
    image_files = []
    for image_index, image_url in enumerate(image_urls, start=1):
        try:
            filename, size = download_image(image_url, images_dir, image_index)
            local_path = f"images/{filename}"
            download_map[image_url] = local_path
            image_files.append({"source_url": image_url, "local_path": local_path, "bytes": size})
        except Exception as image_error:
            image_files.append({"source_url": image_url, "local_path": None, "error": str(image_error)})

    for source_url, local_path in download_map.items():
        content_html = content_html.replace(source_url, local_path)
    local_cover = download_map.get(cover_url) if cover_url else None

    post_html = wrap_post_html(
        title=article["title"],
        subtitle=article.get("subTitle") or "",
        date=article.get("publishTime", ""),
        source_url=article_url,
        cover_image=local_cover,
        content_html=content_html,
    )
    (post_dir / "post.html").write_text(post_html, encoding="utf-8")
    (post_dir / "source.html").write_text(article_html, encoding="utf-8")

    metadata = {
        "title": article["title"],
        "subtitle": article.get("subTitle") or "",
        "date": article.get("publishTime", ""),
        "category": "Brunch Book",
        "source_url": article_url,
        "post_html": "post.html",
        "source_snapshot": "source.html",
        "images": image_files,
        "content_fingerprint": content_fingerprint(content_html),
        "content_text": cleaned_plain_text(content_html),
    }
    (post_dir / "metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return metadata


def rebuild_manifest(output_dir: Path) -> dict:
    manifest = {
        "site": "https://think-sis.tistory.com/",
        "downloaded_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "posts": [],
        "failures": [],
    }
    for metadata_path in sorted((output_dir / "posts").glob("*/metadata.json")):
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        post_dir = metadata_path.parent.name
        manifest["posts"].append(
            {
                "title": metadata.get("title", post_dir),
                "date": metadata.get("date", ""),
                "category": metadata.get("category", ""),
                "source_url": metadata.get("source_url", ""),
                "relative_post_html": f"posts/{post_dir}/post.html",
                "relative_metadata": f"posts/{post_dir}/metadata.json",
                "image_count": len([x for x in metadata.get("images", []) if x.get("local_path")]),
            }
        )
    manifest["post_count"] = len(manifest["posts"])
    return manifest


def main():
    output_dir = newest_export_dir()
    posts_dir = output_dir / "posts"
    posts_dir.mkdir(exist_ok=True)

    articles = load_book_articles()

    tistory_fingerprints = set()
    brunch_by_url = {}
    highest_index = 0
    for metadata_path in sorted(posts_dir.glob("*/metadata.json")):
        try:
            highest_index = max(highest_index, int(metadata_path.parent.name.split("_", 1)[0]))
        except Exception:
            pass
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        category = metadata.get("category", "")
        fingerprint = metadata.get("content_fingerprint") or content_fingerprint(metadata.get("content_text", ""))
        if category == "Brunch Book":
            brunch_by_url[metadata.get("source_url", "")] = metadata_path.parent
        elif fingerprint:
            tistory_fingerprints.add(fingerprint)

    next_index = highest_index + 1
    added = 0
    updated = 0
    skipped_duplicates = 0
    skipped_unpublished = 0

    for article in articles:
        if not article.get("profileId") or not article.get("no"):
            skipped_unpublished += 1
            print(f"[skip-unpublished] {article.get('title', 'untitled')}")
            continue

        article_url = f"https://brunch.co.kr/@{article['profileId']}/{article['no']}"
        article_html = fetch_text(article_url)
        content_html = extract_rendered_brunch_body(article_html)
        fingerprint = content_fingerprint(content_html)

        existing_dir = brunch_by_url.get(article_url)
        if fingerprint in tistory_fingerprints and existing_dir is None:
            skipped_duplicates += 1
            print(f"[skip-duplicate-content] {article['title']}")
            continue

        if existing_dir is None:
            post_dir = posts_dir / f"{next_index:03d}_{safe_name(article['title'])}"
            next_index += 1
            added += 1
        else:
            post_dir = existing_dir
            updated += 1

        metadata = write_article_files(post_dir, article, article_url, article_html, content_html)
        brunch_by_url[article_url] = post_dir
        print(f"[{'add' if existing_dir is None else 'update'}] {article['title']}")
        time.sleep(0.15)

    manifest = rebuild_manifest(output_dir)
    manifest["merged_brunchbook"] = {
        "source": BOOK_URL,
        "added": added,
        "updated": updated,
        "skipped_duplicates": skipped_duplicates,
        "skipped_unpublished": skipped_unpublished,
        "updated_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "dedupe_basis": "normalized content fingerprint",
    }
    (output_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    (output_dir / "index.html").write_text(build_index(manifest["posts"]), encoding="utf-8")
    (output_dir / "README.txt").write_text(
        "\n".join(
            [
                f"Primary export folder: {output_dir}",
                f"Total posts saved: {len(manifest['posts'])}",
                f"Brunchbook added: {added}",
                f"Brunchbook updated: {updated}",
                f"Brunchbook skipped as duplicate content: {skipped_duplicates}",
                f"Brunchbook skipped as unpublished: {skipped_unpublished}",
                "Open index.html for the local listing.",
            ]
        ),
        encoding="utf-8",
    )

    print(f"OUTPUT_DIR={output_dir}")
    print(f"BRUNCHBOOK_ADDED={added}")
    print(f"BRUNCHBOOK_UPDATED={updated}")
    print(f"BRUNCHBOOK_SKIPPED_DUPLICATES={skipped_duplicates}")
    print(f"BRUNCHBOOK_SKIPPED_UNPUBLISHED={skipped_unpublished}")


if __name__ == "__main__":
    main()
