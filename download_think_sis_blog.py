#!/usr/bin/env python3
import html
import json
import mimetypes
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import OrderedDict
from html.parser import HTMLParser
from pathlib import Path


SITE_URL = "https://think-sis.tistory.com/"
SITEMAP_URL = urllib.parse.urljoin(SITE_URL, "sitemap.xml")
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0 Safari/537.36"
)
VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def fetch_response(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    return urllib.request.urlopen(req, timeout=30)


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


def pick_extension(url: str, content_type: str | None) -> str:
    path = urllib.parse.urlparse(url).path
    ext = Path(path).suffix.lower()
    if ext in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"}:
        return ".jpg" if ext == ".jpeg" else ext
    guessed = mimetypes.guess_extension((content_type or "").split(";")[0].strip()) or ".bin"
    if guessed == ".jpe":
        return ".jpg"
    return guessed


class ArticleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.meta = {}
        self.title_parts = []
        self.date_parts = []
        self.category_parts = []
        self.capture_title = False
        self.capture_date = False
        self.capture_category = False
        self.capture_content = False
        self.content_depth = 0
        self.content_chunks = []
        self.images = OrderedDict()

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "meta":
            key = attrs_dict.get("property") or attrs_dict.get("name")
            if key and "content" in attrs_dict:
                self.meta[key] = attrs_dict["content"]

        classes = set((attrs_dict.get("class") or "").split())
        if tag == "p" and "txt_sub_tit" in classes:
            self.capture_title = True
        if tag == "span" and "date" in classes:
            self.capture_date = True
        if tag == "span" and "category" in classes:
            self.capture_category = True

        starttag_text = self.get_starttag_text()
        if not self.capture_content and tag == "div" and "tt_article_useless_p_margin" in classes:
            self.capture_content = True
            self.content_depth = 1
            self.content_chunks.append(starttag_text)
            return

        if self.capture_content:
            self.content_chunks.append(starttag_text)
            self._collect_image_candidates(attrs_dict)
            if tag not in VOID_TAGS:
                self.content_depth += 1

    def handle_startendtag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if self.capture_content:
            self.content_chunks.append(self.get_starttag_text())
            self._collect_image_candidates(attrs_dict)

    def handle_endtag(self, tag):
        if self.capture_content:
            self.content_chunks.append(f"</{tag}>")
            if tag not in VOID_TAGS:
                self.content_depth -= 1
                if self.content_depth == 0:
                    self.capture_content = False
        if tag == "p" and self.capture_title:
            self.capture_title = False
        if tag == "span" and self.capture_date:
            self.capture_date = False
        if tag == "span" and self.capture_category:
            self.capture_category = False

    def handle_data(self, data):
        if self.capture_title:
            self.title_parts.append(data)
        if self.capture_date:
            self.date_parts.append(data)
        if self.capture_category:
            self.category_parts.append(data)
        if self.capture_content:
            self.content_chunks.append(html.escape(data, quote=False))

    def handle_entityref(self, name):
        entity = f"&{name};"
        if self.capture_content:
            self.content_chunks.append(entity)
        decoded = html.unescape(entity)
        if self.capture_title:
            self.title_parts.append(decoded)
        if self.capture_date:
            self.date_parts.append(decoded)
        if self.capture_category:
            self.category_parts.append(decoded)

    def handle_charref(self, name):
        entity = f"&#{name};"
        if self.capture_content:
            self.content_chunks.append(entity)
        decoded = html.unescape(entity)
        if self.capture_title:
            self.title_parts.append(decoded)
        if self.capture_date:
            self.date_parts.append(decoded)
        if self.capture_category:
            self.category_parts.append(decoded)

    def handle_comment(self, data):
        if self.capture_content:
            self.content_chunks.append(f"<!--{data}-->")

    def _collect_image_candidates(self, attrs_dict):
        for key in ("data-url", "src", "data-src", "data-ke-src", "poster"):
            value = attrs_dict.get(key)
            if value and value.startswith(("http://", "https://")):
                self.images.setdefault(value, None)
        srcset = attrs_dict.get("srcset")
        if srcset:
            first = srcset.split(",")[0].strip().split(" ")[0]
            if first.startswith(("http://", "https://")):
                self.images.setdefault(first, None)

    @property
    def title(self) -> str:
        return normalize_space("".join(self.title_parts)) or self.meta.get("og:title", "").strip()

    @property
    def date(self) -> str:
        return normalize_space("".join(self.date_parts)) or self.meta.get("article:published_time", "").strip()

    @property
    def category(self) -> str:
        return normalize_space("".join(self.category_parts))

    @property
    def content_html(self) -> str:
        return "".join(self.content_chunks).strip()


def get_post_urls() -> list[str]:
    xml_bytes = fetch_bytes(SITEMAP_URL)
    root = ET.fromstring(xml_bytes)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = []
    for node in root.findall("sm:url/sm:loc", ns):
        value = (node.text or "").strip()
        if "/entry/" in value and "/m/entry/" not in value:
            urls.append(value)
    # Preserve sitemap order while de-duplicating.
    return list(OrderedDict.fromkeys(urls))


def download_image(url: str, out_dir: Path, index: int) -> tuple[str, int]:
    with fetch_response(url) as resp:
        data = resp.read()
        ext = pick_extension(url, resp.headers.get("Content-Type"))
    filename = f"{index:02d}{ext}"
    path = out_dir / filename
    path.write_bytes(data)
    return filename, len(data)


def wrap_post_html(title: str, date: str, category: str, source_url: str, content_html: str) -> str:
    return f"""<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; margin: 40px auto; max-width: 860px; line-height: 1.7; padding: 0 20px; }}
    img {{ max-width: 100%; height: auto; display: block; margin: 20px auto; }}
    figure {{ margin: 24px 0; }}
    .meta {{ color: #555; font-size: 14px; margin-bottom: 24px; }}
    .content {{ border-top: 1px solid #ddd; padding-top: 24px; }}
    a {{ color: #0b5bd3; }}
  </style>
</head>
<body>
  <h1>{html.escape(title)}</h1>
  <div class="meta">
    <div>분류: {html.escape(category or "-")}</div>
    <div>날짜: {html.escape(date or "-")}</div>
    <div>원문: <a href="{html.escape(source_url)}">{html.escape(source_url)}</a></div>
  </div>
  <div class="content">
    {content_html}
  </div>
</body>
</html>
"""


def build_index(entries: list[dict]) -> str:
    lines = [
        "<!doctype html>",
        '<html lang="ko">',
        "<head>",
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        "  <title>think-sis.tistory.com export</title>",
        "  <style>body { font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; margin: 40px auto; max-width: 980px; padding: 0 20px; } table { width: 100%; border-collapse: collapse; } th, td { border-bottom: 1px solid #ddd; text-align: left; padding: 10px 8px; vertical-align: top; } a { color: #0b5bd3; }</style>",
        "</head>",
        "<body>",
        "  <h1>think-sis.tistory.com export</h1>",
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


def main():
    timestamp = time.strftime("%Y-%m-%d")
    output_dir = Path.home() / f"think-sis.tistory.com-export-{timestamp}"
    output_dir.mkdir(parents=True, exist_ok=True)
    posts_dir = output_dir / "posts"
    posts_dir.mkdir(exist_ok=True)

    urls = get_post_urls()
    manifest = {
        "site": SITE_URL,
        "downloaded_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "post_count": len(urls),
        "posts": [],
        "failures": [],
    }

    for idx, url in enumerate(urls, start=1):
        try:
            raw_html = fetch_bytes(url).decode("utf-8", "ignore")
            parser = ArticleParser()
            parser.feed(raw_html)
            parser.close()

            title = parser.title or f"post-{idx:03d}"
            category = parser.category
            if not category:
                category_match = re.search(
                    r'<span class="category">.*?<a [^>]*>(.*?)</a>',
                    raw_html,
                    flags=re.S,
                )
                category = strip_tags(category_match.group(1)) if category_match else ""

            content_html = parser.content_html
            content_html = re.sub(r'\s+srcset="[^"]*"', "", content_html, flags=re.I)
            content_html = re.sub(r"\s+loading=\"lazy\"", "", content_html, flags=re.I)
            content_html = re.sub(r"\s+decoding=\"async\"", "", content_html, flags=re.I)

            post_dir_name = f"{idx:03d}_{safe_name(title)}"
            post_dir = posts_dir / post_dir_name
            images_dir = post_dir / "images"
            images_dir.mkdir(parents=True, exist_ok=True)

            image_files = []
            for image_index, image_url in enumerate(parser.images.keys(), start=1):
                try:
                    filename, size = download_image(image_url, images_dir, image_index)
                    relative_image = f"images/{filename}"
                    content_html = content_html.replace(image_url, relative_image)
                    image_files.append(
                        {
                            "source_url": image_url,
                            "local_path": relative_image,
                            "bytes": size,
                        }
                    )
                except Exception as image_error:
                    image_files.append(
                        {
                            "source_url": image_url,
                            "local_path": None,
                            "error": str(image_error),
                        }
                    )

            post_html = wrap_post_html(title, parser.date, category, url, content_html)
            post_path = post_dir / "post.html"
            post_path.write_text(post_html, encoding="utf-8")

            source_snapshot = post_dir / "source.html"
            source_snapshot.write_text(raw_html, encoding="utf-8")

            metadata = {
                "title": title,
                "date": parser.date,
                "category": category,
                "source_url": url,
                "post_html": "post.html",
                "source_snapshot": "source.html",
                "images": image_files,
            }
            (post_dir / "metadata.json").write_text(
                json.dumps(metadata, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

            manifest["posts"].append(
                {
                    "title": title,
                    "date": parser.date,
                    "category": category,
                    "source_url": url,
                    "relative_post_html": f"posts/{post_dir_name}/post.html",
                    "relative_metadata": f"posts/{post_dir_name}/metadata.json",
                    "image_count": len([x for x in image_files if x.get("local_path")]),
                }
            )
            print(f"[{idx}/{len(urls)}] saved {title}")
            time.sleep(0.15)
        except Exception as exc:
            manifest["failures"].append({"source_url": url, "error": str(exc)})
            print(f"[{idx}/{len(urls)}] failed {url}: {exc}")

    manifest_path = output_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    index_path = output_dir / "index.html"
    index_path.write_text(build_index(manifest["posts"]), encoding="utf-8")

    readme = output_dir / "README.txt"
    readme.write_text(
        "\n".join(
            [
                f"Site: {SITE_URL}",
                f"Exported at: {manifest['downloaded_at']}",
                f"Posts discovered: {manifest['post_count']}",
                f"Posts saved: {len(manifest['posts'])}",
                f"Failures: {len(manifest['failures'])}",
                "Open index.html for the local listing.",
            ]
        ),
        encoding="utf-8",
    )

    print(f"OUTPUT_DIR={output_dir}")
    print(f"POSTS_SAVED={len(manifest['posts'])}")
    print(f"FAILURES={len(manifest['failures'])}")


if __name__ == "__main__":
    main()
