# 디어펫

Next.js 15 기반 **디어펫** — 견종·묘종을 품종별로 안내하는 분양 사이트입니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/dearpet` 저장소와 `deatpet.breederclub.co.kr` 로만 배포하세요.**
기존 `maincoonmar` / `pupmaincoon` / `maincoon.marketstore.co.kr` 에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/dearpet` | `maincoonmar`, `pupmaincoon`, `mainyou`, `doodle`, `muzi` 등 |
| 도메인 | `deatpet.breederclub.co.kr` | `maincoon.marketstore.co.kr` 및 이전 브랜드 도메인 |

```bash
npm run check:deploy-target
npm run deploy:prod
```

## 로컬 개발

```bash
npm install
npm run dev
```

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL` = `https://deatpet.breederclub.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터, 사용자가 직접 설정)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)

카카오톡 상담 URL은 코드에 넣지 않습니다. 관리자 스폰서 설정에서 등록한 뒤에만 버튼이 나옵니다.
