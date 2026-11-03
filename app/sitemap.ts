// 사이트맵 (/sitemap.xml). 홈페이지 메뉴 페이지 + 블로그(전체 글·카테고리·발행된 글)를 검색엔진에 알린다.
import type { MetadataRoute } from "next";
import { MENU, pageHref } from "@/lib/site";
import { getAllPosts, getCategories } from "@/lib/payload";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://pureun-eye.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const sitePages = MENU.flatMap((g) => g.pages.filter((p) => !p.external).map((p) => pageHref(g, p)));
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...sitePages.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/blog/posts`, changeFrequency: "daily", priority: 0.7 },
    ...categories.map((c) => ({ url: `${SITE_URL}/blog/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.category}/${encodeURIComponent(p.slug)}`,
      lastModified: p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
