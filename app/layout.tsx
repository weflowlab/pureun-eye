import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickMenu from "@/components/layout/QuickMenu";
import Providers from "@/components/layout/Providers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: `${SITE.name} — 망막·백내장 전문 안과`,
};

/** 공통 레이아웃: 헤더(+모바일 GNB) / 본문 / 푸터 / 우측 퀵메뉴 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        {/* AOS·Lenis 등 클라이언트 전역 초기화 */}
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <QuickMenu />
        </Providers>
      </body>
    </html>
  );
}
