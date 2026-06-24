# iemeducation

이 저장소는 `이음통합평생교육원` 홈페이지 제작 작업의 현재 상태를 보관합니다.

현재는 교육원 본사이트(`ieumedu.or.kr/`)와 별도 인터넷신문 사이트(`news.ieumedu.kr/`)를 함께 관리합니다.

## 현재 상태

- 메인 홈페이지는 정적 HTML + 로컬 번들 React 구조로 배포합니다.
- 핵심 엔트리 파일은 `ieumedu.or.kr/이음통합평생교육원.html` 입니다.
- 공통 네비게이션과 페이지 컴포넌트는 `ieumedu.or.kr/components/` 아래에 분리되어 있습니다.
- 배포용 정적 자산은 `ieumedu.or.kr/vendor/`와 `ieumedu.or.kr/components-dist/` 아래에 생성됩니다.
- 운영자가 자주 바꾸는 내용은 `ieumedu.or.kr/components/site-content.js` 한 파일에 모아두었습니다.
- 수강신청 폼은 `ieumedu.or.kr/components/site-content.js`의 `enroll.gasUrl`에 Google Apps Script Web App URL을 넣으면 Google Sheets로 접수할 수 있습니다.
- 운영자는 Google Sheets의 `접수관리` 탭을 기준으로 보면 한국어 헤더와 상태값으로 접수 현황을 확인할 수 있습니다.
- 현재 접수 폼은 이메일 필수 입력이며, 같은 이메일·연락처·과정 조합은 최근 30일 내 중복 접수를 차단하도록 설계되어 있습니다.
- 이름은 한글만, 연락처는 숫자 기반 자동 포맷, 이메일은 `아이디 + 도메인 선택` 방식으로 받도록 정리되어 있습니다.
- 기본적인 수식 인젝션 방지, 숨김 필드 봇 차단, 과도한 링크 입력 차단, 알림 실패 시 접수 유지 같은 fail-safe 로직이 포함되어 있습니다.
- Cloudflare Turnstile을 붙일 수 있도록 프런트 위젯과 GAS 서버 검증 자리를 마련해 두었습니다.
- Google Apps Script 쪽은 `접수관리` 관리자 탭과 `접수보안로그` 탭을 자동으로 유지하도록 설계되어 있습니다.
- 브라우저 임시저장은 만료시간이 있으며, 중복 접수 확인에 필요한 최소 정보만 남기도록 정리되어 있습니다.
- 메인 HTML에는 `Content-Security-Policy`, `referrer` 제한 메타를 넣어 외부 스크립트/연결 범위를 최소화했습니다.
- 런타임은 `unpkg`와 브라우저 Babel을 쓰지 않고, 로컬 `vendor/`와 `components-dist/` 정적 파일만 읽도록 바꿨습니다.
- 프런트 소스를 수정한 뒤에는 `npm run build:site`로 배포용 정적 JS를 다시 생성해야 합니다.
- 배포된 Google Apps Script 음성 테스트는 `npm run test:enroll:gas -- <web-app-url>`로 다시 돌릴 수 있습니다.
- GitHub Pages 배포는 `.github/workflows/github-pages.yml` 한 파일만 사용합니다.
- 구현된 주요 화면:
  - 홈
  - 원장 인사말
  - 설립목적 · 교육철학
  - 연혁
  - 교육과정
  - 수강신청
  - 민간자격 안내
  - 자격인증 조회
- 게시글 자산은 `ieumedu.or.kr/uploads/posts/` 아래에 정적 HTML 형태로 보관되어 있습니다.
- 원본 수집본은 `think-sis.tistory.com-export-2026-04-20/` 아래에 유지하고 있습니다.
- `news.ieumedu.kr/`는 교육원 사이트와 분리된 인터넷신문용 정적 사이트입니다. 별도 Pages 배포에서는 이 폴더가 사이트 루트가 됩니다.

## 운영 배포

- 교육원 공식 운영 도메인은 `www.ieumedu.kr` 입니다.
- 인터넷신문 공식 운영 도메인은 `news.ieumedu.kr` 입니다.
- Gabia DNS에서 `www`와 `news`는 모두 `ResearchForMathew.github.io`를 가리키는 CNAME으로 관리합니다.
- 루트 도메인 `ieumedu.kr`는 GitHub Pages의 apex 레코드로 유지해 `www.ieumedu.kr` 진입을 보조합니다.
- 정적 사이트는 GitHub Pages로 배포합니다.
- `main` 브랜치에 머지되면 `.github/workflows/github-pages.yml`이 자동 배포를 수행합니다.
- 저장소 규칙상 `main`은 PR 경유와 `github-pages` 배포 성공이 필요합니다.

## 참고

- 현재 작업 폴더 용량은 크며, 게시글 정적 자산이 함께 포함되어 있습니다.
- 운영용 수정 기준은 `ieumedu.or.kr/운영가이드.md`를 보면 됩니다.
- 블로그/브런치 수집 스크립트:
  - `download_think_sis_blog.py`
  - `append_brunchbook_haul_mind.py`
