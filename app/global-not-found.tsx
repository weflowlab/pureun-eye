import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickMenu from "@/components/layout/QuickMenu";
import Providers from "@/components/layout/Providers";
import NotFoundView from "@/components/common/NotFoundView";
import { SITE } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: `페이지를 찾을 수 없습니다 | ${SITE.name}`,
  description: "주소가 바뀌었거나 삭제된 페이지입니다.",
};

/** 어느 레이아웃에도 잡히지 않는 주소(/없는주소)의 404.
 *  루트 레이아웃이 홈페이지(app/(site))와 관리자(app/(payload)) 둘이라 Next 가 공통 404 를 만들지 못해, 여기서 홈페이지 레이아웃을 그대로 꾸민다 */
export default function GlobalNotFound() {
  return (
    <html lang="ko" className={fontVariables}>
      <body>
        <Providers>
          <Header />
          <main>
            <NotFoundView />
          </main>
          <Footer />
          <QuickMenu />
        </Providers>
      </body>
    </html>
  );
}
