"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import "lenis/dist/lenis.css";

// 전역 Lenis 인스턴스 (GNB 열림 시 스크롤 정지 등에 사용)
let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** 라우트 변경 시 맨 위로 이동 + AOS 재계산, Lenis 는 홈페이지에서만 (usePathname은 Suspense 안에서 사용) */
function RouteChangeEffect() {
  const pathname = usePathname();
  // 블로그(/blog)는 모두의안과 블로그처럼 브라우저 기본 스크롤을 쓴다 (긴 글 읽기에는 부드러운 스크롤이 오히려 거슬린다)
  const smooth = !pathname.startsWith("/blog");

  // Lenis 부드러운 스크롤: 홈페이지 경로에 있는 동안만 만들고, 블로그로 가면 없앤다
  useEffect(() => {
    if (!smooth) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [smooth]);

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);

  return null;
}

/** 클라이언트 전역 초기화: AOS (+ 홈페이지 경로에서만 Lenis 부드러운 스크롤 — RouteChangeEffect) */
export default function Providers({ children }: { children: ReactNode }) {
  // 최초 1회 AOS 초기화
  useEffect(() => {
    // AOS는 [data-aos] 요소의 className을 직접 바꾼다.
    // 아직 하이드레이션 전인 요소와 어긋날 수 있어 각 요소에 suppressHydrationWarning을 붙여 둠
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <RouteChangeEffect />
      </Suspense>
      {children}
    </>
  );
}
