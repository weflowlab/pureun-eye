import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickMenu from "@/components/layout/QuickMenu";
import Providers from "@/components/layout/Providers";
import { PageTracker } from "@/components/blog/PageTracker";
import { SITE } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";

const DESCRIPTION = `${SITE.name} — 전주 시력교정·백내장·망막 전문 안과`;

/** 공통 메타: 공유(OG)는 로고 이미지, 주소는 pureun-eye.vercel.app (도메인 확정 후 교체) */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || "https://pureun-eye.vercel.app"),
  title: SITE.name,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: SITE.name,
    title: SITE.name,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} 로고` }],
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: DESCRIPTION, images: ["/og.png"] },
};

/** 홈페이지·블로그 공통 루트 레이아웃: 헤더(+모바일 GNB) / 본문 / 푸터 / 우측 퀵메뉴. (관리자 /admin 은 app/(payload) 의 별도 레이아웃) */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={fontVariables}>
      <body>
        {/* AOS·Lenis 등 클라이언트 전역 초기화 */}
        <Providers>
          {/* 방문 기록 (관리자 "유입 관리"). 관리자 로그인 브라우저·봇·로컬은 서버가 걸러 낸다 */}
          <Suspense fallback={null}>
            <PageTracker />
          </Suspense>
          <Header />
          <main>{children}</main>
          <Footer />
          <QuickMenu />
        </Providers>
      </body>
    </html>
  );
}
