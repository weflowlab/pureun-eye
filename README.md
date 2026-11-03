# 전주푸른안과 홈페이지 + 웹블로그

Next.js 16 App Router 하나에 홈페이지, 웹블로그(`/blog`), 관리자(`/admin`, Payload CMS 3)가 함께 있다. 저장소 하나, Vercel 프로젝트 하나로 배포한다.

- **홈페이지**: `app/(site)/` — 메뉴 구조는 `lib/site.ts`(MENU), 페이지 컴포넌트는 `components/clinic/*`, 메인은 `components/home/*`. 스타일은 CSS Modules.
- **블로그**: `app/(site)/blog/` — 글은 Payload 에서 읽는다(`lib/payload.ts`). 컴포넌트는 `components/blog/*`, 스타일은 Tailwind(토큰은 `app/blog.css`).
- **관리자(CMS)**: `app/(payload)/` — Payload 관리자 `/admin`, REST API `/api`. 스키마는 `collections/`, `globals/`, 설정은 `payload.config.ts`.
- **DB**: 개발은 SQLite 파일(`payload.db`), 운영은 `DATABASE_URI` 가 `postgres://` 로 시작하면 Postgres(Neon) 어댑터.

## 시작하기

```bash
cp .env.example .env     # PAYLOAD_SECRET, PREVIEW_SECRET 을 임의의 긴 문자열로 바꾼다
npm install
npm run dev              # http://localhost:3000
npm run seed             # (dev 서버 실행 중) 첫 관리자 계정 + 병원 정보·카테고리·의료진·본보기 글 1편
```

시드가 만드는 관리자 계정은 `admin@pureun-eye.kr / pureun1234!` (환경변수 `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` 로 변경). **운영 전 반드시 바꿀 것.**
시드는 여러 번 실행해도 안전하다. 카테고리·의료진은 없을 때만 만들고, 본보기 글은 내용만 덮어쓴다.

## 관리자 메뉴

| 묶음 | 항목 | 쓰임 |
| --- | --- | --- |
| 홈페이지 | 상담 문의 | 상담 신청 폼(페이지·퀵메뉴 창)으로 들어온 문의. 상태(접수/연락 완료)·메모 관리 |
| 홈페이지 | 팝업 | 메인 첫 화면 팝업. 이미지·링크·노출 기간·순서. 여러 개면 탭으로 전환 |
| 블로그 | 글 · 카테고리 · 의료진 · 블로그 메인 | 블로그 콘텐츠. 글은 초안 → 발행, 오른쪽 미리보기 탭에서 실제 페이지 확인 |
| 공통 | 이미지 · 병원 정보 | 업로드 이미지, 블로그 글 하단 문구·상담 블록 |
| 설정 | 관리자 | 로그인 계정 |
| 통계 | 유입 관리 | 홈페이지·블로그 방문 기록 집계 (경로·유입 소스·기기·체류시간·상담 버튼 클릭) |

발행·수정·삭제 시 관련 페이지는 자동으로 다시 생성된다(`revalidatePath`). 메인 블로그 섹션은 최신 글 4편을, 메인 팝업은 켜 둔 팝업을 DB 에서 읽는다.

## 구조

```
app/(site)/            홈페이지 + 블로그 (공통 헤더·푸터·퀵메뉴 레이아웃)
app/(site)/blog/       블로그 (메인, 카테고리, 글 상세, 전체 글, 검색, rss)
app/(site)/next/       내부 라우트: 미리보기(draft 모드) 진입·종료, 방문 기록(/next/v), 조회수
app/(payload)/         Payload 관리자(/admin)와 REST API(/api), 개발용 시드·타입 생성
app/sitemap.ts         홈페이지 메뉴 + 블로그 글 사이트맵. robots.ts 는 /admin, /api, /next 수집 제외
collections/, globals/ Payload 스키마 (상담 문의, 팝업, 글, 카테고리, 의료진, 이미지, 관리자, 방문 기록 / 블로그 메인, 병원 정보)
lib/site.ts            홈페이지 전역 정보·메뉴 (블로그 병원 정보·의료진 시드도 여기와 lib/doctors.ts 를 쓴다)
lib/payload.ts         블로그 데이터 계층 (Payload 문서 → lib/types.ts)
lib/inquiry.ts         상담 신청 서버 액션 / lib/popups.ts 팝업 조회
components/blog/       블로그 UI (Tailwind). components/blog/admin 은 관리자 커스텀 화면(유입 관리·로고)
```

## 개발 메모

- **스키마를 바꾸면** dev 서버를 띄운 채 `npm run payload:generate` 로 `payload-types.ts` 와 `app/(payload)/admin/importMap.js` 를 다시 만든다 (Payload CLI 는 이 환경에서 깨진다).
- `cacheComponents` 는 꺼 두었다(Payload 관리자·미리보기와 충돌). 홈페이지는 그대로 정적 생성된다.
- 홈페이지 리셋 CSS 는 `@layer base` 안에 있다. 그래야 블로그의 Tailwind 유틸리티가 리셋에 덮이지 않는다. 블로그 토큰(`--brand-*`, `--primary`)은 홈페이지 토큰(`--color-primary`)과 이름이 다르다.
- 이미지 최적화(`/_next/image`)는 꺼져 있다. 블로그 업로드는 Payload 가 업로드 시점에 WebP·용도별 크기를 만든다.
- 방문 기록은 로컬(localhost)과 관리자 로그인 브라우저에서는 쌓이지 않는다. 로컬에서 확인하려면 주소 뒤에 `?track=1`.

## 배포 전 할 일

- [ ] Vercel 환경변수: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `DATABASE_URI`(Neon Postgres), `NEXT_PUBLIC_SERVER_URL`(실제 도메인), `BLOB_READ_WRITE_TOKEN`(Vercel Blob 이미지 저장소)
- [ ] 운영 DB 에서 관리자 계정 직접 생성 후 비밀번호 관리 (시드는 운영에서 실행되지 않는다)
- [ ] 본보기 글 삭제 또는 실제 글로 교체, 블로그 메인 배너 이미지·문구 입력
- [ ] 도메인 확정 후 `app/(site)/layout.tsx` 의 metadataBase 기본값 교체
