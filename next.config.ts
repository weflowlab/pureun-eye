import type { NextConfig } from "next";
import { MENU, groupHref } from "./lib/site";

const nextConfig: NextConfig = {
  // 대메뉴 주소(/about 등)는 첫 하위 페이지로, 이전 주소는 새 주소로 이동
  async redirects() {
    return [
      ...MENU.map((g) => ({ source: `/${g.slug}`, destination: groupHref(g), permanent: false })),
      { source: "/intro", destination: "/about/doctors", permanent: true },
      { source: "/news", destination: "/community/notice", permanent: true },
      { source: "/news/:id", destination: "/community/notice/:id", permanent: true },
      { source: "/retina/referral", destination: "/community/referral", permanent: true },
    ];
  },
  // 이미지 최적화 끔: public/images 를 미리 WebP(가로 1600px 이하, 품질 82)로 압축해 두어
  // Vercel 이미지 최적화(/_next/image, 월 한도 있는 유료 항목)를 거칠 필요가 없다.
  // 대신 원본 파일이 그대로 전송되므로, 새 이미지를 넣을 때도 반드시 WebP로 가볍게 만들어 둘 것.
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Tailwind 로더는 전역 CSS에만 적용 (CSS Modules의 :global() 파싱 오류 방지)
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
