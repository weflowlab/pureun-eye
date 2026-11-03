// 개발 전용 시드: 첫 관리자 계정, 병원 정보·블로그 메인 기본 문구, 카테고리·의료진(lib/mock.ts ← lib/site.ts·lib/doctors.ts), 본보기 글 1편(lib/samplePost.ts).
// 사용: 개발 서버 실행 중 `npm run seed` (GET /api/dev-seed). 여러 번 실행해도 안전하다:
//   - 카테고리·의료진은 없을 때만 만들고, 본보기 글은 slug 로 찾아 내용만 덮어쓴다 (사진·조회수·발행일 유지).
//   - 병원 정보는 매번 lib/site.ts 기준으로 맞추고(글 하단 문구는 비어 있을 때만), 블로그 메인은 비어 있는 문구만 채운다.
// 운영 DB 에는 절대 실행하지 않는다 (NODE_ENV=production 이면 404).
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { clinic, categories, doctors, popularKeywords } from "@/lib/mock";
import * as homeDefaults from "@/lib/homeDefaults";
import * as clinicDefaults from "@/lib/clinicDefaults";
import { samplePost, SAMPLE_POST_SLUG } from "@/lib/samplePost";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@pureun-eye.kr";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "pureun1234!";

// 본보기 글(lib/samplePost.ts)을 넣거나 갱신한다. 카테고리·의료진이 있어야 하므로 콘텐츠 시드 뒤에 부른다.
async function upsertSamplePost(payload: Payload, context: Record<string, unknown>): Promise<string> {
  const [cat, doc] = await Promise.all([
    payload.find({ collection: "categories", where: { slug: { equals: samplePost.categorySlug } }, limit: 1, depth: 0 }),
    payload.find({ collection: "doctors", where: { slug: { equals: samplePost.authorSlug } }, limit: 1, depth: 0 }),
  ]);
  const category = cat.docs[0]?.id;
  const author = doc.docs[0]?.id;
  if (!category || !author) return "본보기 글 건너뜀 (카테고리/의료진 없음)";

  const data = {
    _status: "published" as const,
    title: samplePost.title,
    slug: samplePost.slug,
    category,
    author,
    summary: samplePost.summary,
    keyPoints: samplePost.keyPoints.map((text) => ({ text })),
    content: samplePost.content as never,
    faq: samplePost.faq,
    sources: samplePost.sources,
    tags: samplePost.tags.map((tag) => ({ tag })),
  };
  const existing = (await payload.find({ collection: "posts", where: { slug: { equals: SAMPLE_POST_SLUG } }, limit: 1, depth: 0 })).docs[0];
  if (existing) {
    await payload.update({ collection: "posts", id: existing.id, context, draft: false, data });
    return `본보기 글 갱신: /blog/${samplePost.categorySlug}/${SAMPLE_POST_SLUG}`;
  }
  await payload.create({ collection: "posts", context, draft: false, data: { ...data, publishedAt: new Date().toISOString(), views: 0 } });
  return `본보기 글 생성: /blog/${samplePost.categorySlug}/${SAMPLE_POST_SLUG}`;
}

export async function GET(): Promise<Response> {
  if (process.env.NODE_ENV === "production") return new Response("Not available", { status: 404 });
  const payload = await getPayload({ config });
  const context = { disableRevalidate: true, seed: true }; // 페이지 재생성 폭주 방지
  const log: string[] = [];

  // 1) 첫 관리자 계정
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    await payload.create({ collection: "users", data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "관리자" } });
    log.push(`관리자 계정 생성: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  // 2) 병원 정보 글로벌 (글 하단 문구 3개는 비어 있을 때만 기본 문구로 채운다)
  const savedClinic = await payload.findGlobal({ slug: "clinic", depth: 0 });
  await payload.updateGlobal({
    slug: "clinic",
    context,
    data: {
      disclaimerText: savedClinic.disclaimerText || clinicDefaults.DISCLAIMER_TEXT,
      ctaTitle: savedClinic.ctaTitle || clinicDefaults.CTA_TITLE,
      ctaText: savedClinic.ctaText || clinicDefaults.ctaText(clinic.name),
      name: clinic.name,
      nameEn: clinic.nameEn,
      homepageUrl: clinic.homepageUrl,
      address: clinic.address,
      phone: clinic.phone,
      fax: clinic.fax,
      businessNumber: clinic.businessNumber,
      representatives: clinic.representatives.map((value) => ({ value })),
      stats: clinic.stats,
      statsNote: clinic.statsNote,
      hours: clinic.hours,
      directions: clinic.directions,
      parking: clinic.parking.map((value) => ({ value })),
      mapLinks: clinic.mapLinks,
      consultUrl: clinic.consultUrl,
      kakaoChannelUrl: clinic.kakaoChannelUrl,
      sns: clinic.sns,
      legalLinks: clinic.legalLinks,
      homepageMenu: clinic.homepageMenu,
    },
  });
  log.push("병원 정보 저장");

  // 3) 블로그 메인 글로벌: 비어 있는 문구만 기본 문구(lib/homeDefaults.ts)로 채운다. 관리자가 이미 고친 값과 배너 이미지는 그대로 둔다.
  const home = await payload.findGlobal({ slug: "home", depth: 0 });
  const banners = (home.banners?.length ? home.banners : homeDefaults.BANNERS.map((b) => ({ ...b, image: null, mobileImage: null }))).map((b, i) => {
    const d = homeDefaults.BANNERS[i % homeDefaults.BANNERS.length];
    return { ...b, label: b.label || d.label, text: b.text || d.text };
  });
  await payload.updateGlobal({
    slug: "home",
    context,
    draft: false,
    data: {
      _status: "published",
      heroTitle: home.heroTitle || homeDefaults.heroTitle(clinic),
      heroText: home.heroText || homeDefaults.HERO_TEXT,
      searchPlaceholder: home.searchPlaceholder || homeDefaults.SEARCH_PLACEHOLDER,
      popularKeywords: home.popularKeywords?.length ? home.popularKeywords : popularKeywords.map((value) => ({ value })),
      banners,
      doctorsTitle: home.doctorsTitle || homeDefaults.doctorsTitle(clinic),
      doctorsText: home.doctorsText || homeDefaults.DOCTORS_TEXT,
      doctorsButton: home.doctorsButton || homeDefaults.DOCTORS_BUTTON,
      doctorsLink: home.doctorsLink || homeDefaults.DOCTORS_LINK,
      summaryTitle: home.summaryTitle || homeDefaults.SUMMARY_TITLE,
      summaryText: home.summaryText || homeDefaults.summaryText(clinic),
      keyPoints: home.keyPoints?.length ? home.keyPoints : homeDefaults.KEY_POINTS.map(({ title, text }) => ({ title, value: text })),
      faq: home.faq?.length ? home.faq : homeDefaults.faq(clinic),
    },
  });
  log.push("블로그 메인 저장 (비어 있던 문구를 기본 문구로 채움)");

  // 4) 카테고리 / 의료진: slug 로 찾아 없을 때만 만든다 (관리자가 고친 내용과 사진은 보존)
  let newCategories = 0;
  for (const [i, c] of categories.entries()) {
    const found = await payload.find({ collection: "categories", where: { slug: { equals: c.slug } }, limit: 1, depth: 0 });
    if (!found.docs[0]) {
      await payload.create({ collection: "categories", context, data: { name: c.name, slug: c.slug, description: c.description, order: i } });
      newCategories++;
    }
  }
  let newDoctors = 0;
  for (const [i, d] of doctors.entries()) {
    const found = await payload.find({ collection: "doctors", where: { slug: { equals: d.slug } }, limit: 1, depth: 0 });
    if (!found.docs[0]) {
      await payload.create({
        collection: "doctors",
        context,
        data: {
          name: d.name,
          slug: d.slug,
          title: d.title,
          bio: d.bio,
          specialties: d.specialties.map((value) => ({ value })),
          career: d.career.map((value) => ({ value })),
          order: i,
        },
      });
      newDoctors++;
    }
  }
  log.push(`카테고리 ${categories.length}개 (새로 만든 것 ${newCategories}), 의료진 ${doctors.length}명 (새로 만든 것 ${newDoctors})`);

  // 5) 본보기 글 (모든 본문 블록을 한 번씩 쓴 글. 관리자가 "이렇게 쓰면 된다"는 예시로 본다)
  log.push(await upsertSamplePost(payload, context));

  return new Response(log.join("\n"));
}
