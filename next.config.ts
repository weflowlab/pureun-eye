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
    ];
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
