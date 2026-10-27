/** 사이트 전역 정보 (고객 구글폼·기존 홈페이지 기준). 링크 URL은 확정 후 교체 */
export const SITE = {
  name: "푸른안과",
  nameEn: "PUREUN EYE CLINIC",
  legalName: "푸른안과의원",
  ceo: "유태영 외 5명",
  privacyOfficer: "유태영",
  zip: "54921",
  address: "전북특별자치도 전주시 덕진구 백제대로 660 푸른안과",
  tel: "063-278-2121",
  lasikTel: "063-278-2072",
  fax: "063-278-2030",
  bizNo: "418-06-98556",
  since: 2001,
  kakaoUrl: "#",
  instagramUrl: "#",
  blogUrl: "#",
  youtubeUrl: "#",
  naverMapUrl: "#",
  kakaoMapUrl: "#",
};

/** 진료시간 (기존 홈페이지 기준) */
export const HOURS = {
  weekday: { label: "평일", time: "오전 09:00 ~ 12:30 / 오후 14:00 ~ 18:00" },
  saturday: { label: "토요일", time: "오전 08:30 ~ 12:30" },
  notes: ["대기자가 많을 경우 접수가 조기 마감됩니다.", "전화 접수는 불가합니다. 양해 부탁드립니다."],
};

export type MenuPage = { slug: string; label: string; /** 외부 링크면 지정 */ external?: string };
export type MenuGroup = { slug: string; label: string; labelEn: string; pages: MenuPage[] };

/** 전체 메뉴 — 기존 홈페이지 구조 기준, 커뮤니티는 구글폼 요청(공지·FAQ·후기) + 진료의뢰서. URL: /{group}/{page} */
export const MENU: MenuGroup[] = [
  {
    slug: "about",
    label: "푸른안과",
    labelEn: "ABOUT",
    pages: [
      { slug: "philosophy", label: "푸른안과 진료이념" },
      { slug: "doctors", label: "의료진소개" },
      { slug: "equipment", label: "첨단의료장비" },
      { slug: "hours", label: "진료시간안내" },
      { slug: "tour", label: "병원둘러보기" },
      { slug: "location", label: "오시는 길" },
    ],
  },
  {
    slug: "vision",
    label: "시력교정 클리닉",
    labelEn: "VISION CORRECTION",
    pages: [
      { slug: "pre-care", label: "수술 전 진료 시스템" },
      { slug: "lasik", label: "LASIK / LASEK" },
      { slug: "smile", label: "Smile 4 me" },
      { slug: "post-care", label: "수술 후의 관리 시스템" },
      { slug: "fact-check", label: "FACT CHECK" },
    ],
  },
  {
    slug: "cataract",
    label: "백내장",
    labelEn: "CATARACT",
    pages: [
      { slug: "center", label: "푸른 백내장 노안센터" },
      { slug: "about", label: "백내장이란" },
      { slug: "choice", label: "백내장 수술 선택 방법" },
      { slug: "premium", label: "프리미엄 백내장 수술" },
      { slug: "advanced", label: "고난이도 백내장 수술" },
      { slug: "laser", label: "레이저 백내장 수술" },
      { slug: "complications", label: "백내장 수술 후 합병증" },
    ],
  },
  {
    slug: "retina",
    label: "망막클리닉 보임",
    labelEn: "RETINA CLINIC BOIM",
    pages: [
      { slug: "boim", label: "망막클리닉 보임" },
      { slug: "equipment", label: "망막클리닉 보임 장비" },
      { slug: "about", label: "망막이란" },
      { slug: "diabetic", label: "당뇨망막병증" },
      { slug: "macular", label: "황반변성" },
      { slug: "detachment", label: "망막박리" },
      { slug: "csc", label: "중심성 망막증" },
      { slug: "floaters", label: "비문증" },
    ],
  },
  {
    slug: "community",
    label: "커뮤니티",
    labelEn: "COMMUNITY",
    pages: [
      { slug: "notice", label: "공지사항" },
      { slug: "faq", label: "자주묻는질문" },
      { slug: "reviews", label: "고객후기" },
      { slug: "referral", label: "진료의뢰서" },
    ],
  },
  {
    slug: "contact",
    label: "상담 & 문의",
    labelEn: "CONTACT",
    pages: [
      { slug: "online", label: "온라인 상담" },
      { slug: "kakao", label: "카카오톡 상담", external: SITE.kakaoUrl },
    ],
  },
];

/** 페이지 링크 (외부 링크 우선) */
export const pageHref = (group: MenuGroup, page: MenuPage) => page.external ?? `/${group.slug}/${page.slug}`;

/** 대메뉴 링크 = 첫 하위 페이지 */
export const groupHref = (group: MenuGroup) => pageHref(group, group.pages[0]);

/** URL 조각으로 메뉴 찾기 */
export function findPage(groupSlug: string, pageSlug: string) {
  const group = MENU.find((g) => g.slug === groupSlug);
  const page = group?.pages.find((p) => p.slug === pageSlug && !p.external);
  return group && page ? { group, page } : null;
}
