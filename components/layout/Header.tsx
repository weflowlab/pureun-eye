"use client";

import { Suspense, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import { NAV, SITE } from "@/lib/site";
import GnbMenu from "./GnbMenu";
import styles from "./Header.module.css";

// 스크롤 여부(scrollY > 0) 구독
const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrolled = () => window.scrollY > 0;
const getScrolledServer = () => false;

/** 헤더 본체: 로고 / PC 메뉴 / 햄버거 + 모바일 GNB */
function HeaderView({ pathname }: { pathname: string | null }) {
  const [gnbOpen, setGnbOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);
  // 메인이 아닌 페이지는 항상 흰 배경
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.headerScrolled : ""}`}>
        <div className={styles.cont}>
          {/* 로고 */}
          <Link href="/" className={styles.logo} aria-label={SITE.name}>
            <Placeholder label="로고" width={160} height="100%" />
          </Link>

          {/* PC 메뉴 (1210px 이하 숨김) */}
          <nav className={styles.headerList}>
            {NAV.map((item) => {
              const active = !!pathname && pathname.includes(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.headerListTit} ${active ? styles.headerListTitActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 햄버거 버튼 */}
          <button type="button" className={styles.mGnb} onClick={() => setGnbOpen(true)} aria-label="메뉴 열기">
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M4 8h22M4 15h22M4 22h22" stroke="#152c6b" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <GnbMenu open={gnbOpen} onClose={() => setGnbOpen(false)} />
    </>
  );
}

/** usePathname 사용 래퍼 (cacheComponents 환경 대비 Suspense 내부에서 호출) */
function HeaderWithPath() {
  const pathname = usePathname();
  return <HeaderView pathname={pathname} />;
}

/** 공통 헤더 */
export default function Header() {
  return (
    <Suspense fallback={<HeaderView pathname={null} />}>
      <HeaderWithPath />
    </Suspense>
  );
}
