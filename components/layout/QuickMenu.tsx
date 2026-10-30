"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ClipboardList, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";
import { getLenis } from "./Providers";
import ReservationModal from "./ReservationModal";
import styles from "./QuickMenu.module.css";

// 펼침 상태를 localStorage에 저장 (새로고침 후에도 유지)
const STORAGE_KEY = "quickMenuOpen";
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const readOpen = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};
const writeOpen = (v: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(v));
  } catch {}
  listeners.forEach((l) => l());
};

// 퀵메뉴 화살표 아이콘 (단순 라인 아이콘)
const Icon = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
// 항목 아이콘: 전화·카카오·인스타·블로그는 실제 앱 모양(채움), 상담신청·오시는 길은 lucide 선 아이콘
const Fill = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);
const ICONS = {
  consult: <ClipboardList size={22} strokeWidth={2} aria-hidden />,
  call: (
    <Fill>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </Fill>
  ),
  kakao: (
    <Fill>
      <path d="M12 3C6.48 3 2 6.51 2 10.84c0 2.8 1.86 5.26 4.66 6.65l-.95 3.48c-.08.3.26.54.52.37l4.15-2.74c.53.07 1.07.11 1.62.11 5.52 0 10-3.51 10-7.87S17.52 3 12 3z" />
    </Fill>
  ),
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  blog: (
    <Fill>
      <text x="12" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="900">
        B
      </text>
    </Fill>
  ),
  map: <MapPin size={22} strokeWidth={2} aria-hidden />,
};
// 실제 앱 색을 쓰는 항목 (마우스를 올려도 남색으로 바뀌지 않음)
const BRAND = new Set(["call", "kakao", "instagram", "blog"]);

/** 우측 고정 퀵메뉴(흰 카드) + 맨 위로 버튼 */
export default function QuickMenu() {
  const open = useSyncExternalStore(subscribe, readOpen, () => false);
  const [modalOpen, setModalOpen] = useState(false);
  // 맨 위로 버튼: 조금 내려왔을 때만 표시
  const [showTop, setShowTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => writeOpen(!open);

  // 메뉴 항목: 고객 요청 문의 채널(전화·카카오채널·인스타그램·블로그) + 상담신청·오시는 길
  const items = [
    { key: "consult", label: "상담신청", onClick: () => setModalOpen(true) },
    { key: "call", label: "상담전화", onClick: () => window.location.assign(`tel:${SITE.tel}`) },
    { key: "kakao", label: "카카오채널", onClick: () => window.open(SITE.kakaoUrl) },
    { key: "instagram", label: "인스타그램", onClick: () => window.open(SITE.instagramUrl) },
    { key: "blog", label: "블로그", onClick: () => window.open(SITE.blogUrl) },
    { key: "map", label: "오시는 길", onClick: () => router.push("/about/location") },
  ] as const;

  // 맨 위로 (Lenis 사용 시 부드럽게)
  const scrollTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={`${styles.side} ${open ? styles.on : ""}`}>
        {/* 펼친 상태: 흰 카드 메뉴 (상담신청만 남색 강조) */}
        <nav className={styles.panel} aria-label="퀵메뉴" aria-hidden={!open}>
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.item} ${item.key === "consult" ? styles.primary : ""} ${BRAND.has(item.key) ? `${styles.brand} ${styles[item.key]}` : ""}`}
              onClick={item.onClick}
              tabIndex={open ? 0 : -1}
            >
              <span className={styles.icon}>{ICONS[item.key]}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
          <button type="button" className={styles.closeBtn} onClick={toggle} aria-label="퀵메뉴 접기" tabIndex={open ? 0 : -1}>
            <Icon size={16}>
              <path d="M9 6l6 6-6 6" />
            </Icon>
          </button>
        </nav>

        {/* 접힌 상태: 우측 끝 남색 탭 */}
        <button type="button" className={styles.toggleBtn} onClick={toggle} aria-label="퀵메뉴 펼치기" tabIndex={open ? -1 : 0}>
          <Icon size={18}>
            <path d="M15 6l-6 6 6 6" />
          </Icon>
        </button>
      </div>

      {/* 맨 위로 버튼 */}
      <button type="button" className={`${styles.topBtn} ${showTop ? styles.topShow : ""}`} onClick={scrollTop} aria-label="맨 위로">
        <Icon size={20}>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </Icon>
      </button>

      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
