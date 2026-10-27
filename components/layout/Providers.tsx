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

/** 라우트 변경 시 맨 위로 이동 + AOS 재계산 (usePathname은 Suspense 안에서 사용) */
function RouteChangeEffect() {
  const pathname = usePathname();

  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
    AOS.refresh();
  }, [pathname]);

  return null;
}

/** 클라이언트 전역 초기화: Lenis 부드러운 스크롤 + AOS */
export default function Providers({ children }: { children: ReactNode }) {
  // 최초 1회 Lenis·AOS 초기화
  useEffect(() => {
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

    // AOS는 [data-aos] 요소의 className을 직접 바꾼다.
    // 아직 하이드레이션 전인 요소와 어긋날 수 있어 각 요소에 suppressHydrationWarning을 붙여 둠
    AOS.init({ duration: 800, once: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
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
