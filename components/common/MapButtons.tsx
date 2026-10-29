import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import styles from "./MapButtons.module.css";

// 지도 앱 아이콘: 네이버 "N" · 카카오맵 위치 핀
const NaverIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4 3h5.2l5.6 8.3V3H20v18h-5.2l-5.6-8.3V21H4z" />
  </svg>
);
const KakaoMapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.4 11.6 6.7 11.9a1.1 1.1 0 0 0 1.6 0c.3-.3 6.7-6.6 6.7-11.9A7.5 7.5 0 0 0 12 2zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" />
  </svg>
);

/** 지도 바로가기 링크: 앱별 브랜드 색 (URL 미정("#")이면 새 창 열지 않음) */
function MapLink({ href, brand, children }: { href: string; brand: "naver" | "kakao"; children: ReactNode }) {
  const external = href !== "#";
  return (
    <a href={href} className={`${styles.btn} ${styles[brand]}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {brand === "naver" ? <NaverIcon /> : <KakaoMapIcon />}
      {children}
    </a>
  );
}

/** 네이버 지도 · 카카오맵 버튼 한 쌍 (메인 · 오시는 길 공통) — 바깥 여백은 className으로 */
export default function MapButtons({ className }: { className?: string }) {
  return (
    <div className={`${styles.btns} ${className ?? ""}`}>
      <MapLink href={SITE.naverMapUrl} brand="naver">
        네이버 지도
      </MapLink>
      <MapLink href={SITE.kakaoMapUrl} brand="kakao">
        카카오맵
      </MapLink>
    </div>
  );
}
