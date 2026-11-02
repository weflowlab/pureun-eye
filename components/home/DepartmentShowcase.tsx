"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE, findPage, pageHref } from "@/lib/site";
import { EXAM_TOTAL } from "@/lib/vision";
import { getLenis } from "@/components/layout/Providers";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./DepartmentShowcase.module.css";

type Department = {
  name: string;
  nameEn: string;
  desc: ReactNode[];
  /** 바로가기 페이지: [대메뉴 slug, 페이지 slug] */
  links: [string, string][];
};

// 진료과목 3개 (각 클리닉 페이지 원고 기준)
const DEPARTMENTS: Department[] = [
  {
    name: "시력교정 클리닉",
    nameEn: "VISION",
    desc: [
      <>시력교정수술의 시작은 <br /><span className={styles.highlight}>꼼꼼한 수술 전 검사</span>입니다.</>,
      <>{EXAM_TOTAL}가지 정밀 검사 결과를 종합해 <br />스마일 · 라식 · 라섹 중 <br className={styles.moBr} /><span className={styles.highlight}>내 눈에 맞는 방법</span>을 함께 정합니다.</>,
    ],
    links: [["vision", "pre-care"], ["vision", "smile"], ["vision", "lasik"]],
  },
  {
    name: "푸른 백내장 노안센터",
    nameEn: "CATARACT",
    desc: [
      <>검사부터 인공수정체 선택까지 <br /><br className={styles.moBr} /><span className={styles.highlight}>생활에 맞춘 백내장 수술</span>을 계획합니다.</>,
      <>수정체 탈구, 작은 동공 등 <br /><br className={styles.moBr} /><span className={styles.highlight}>까다로운 조건의 백내장</span>도 신중하게 수술합니다.</>,
    ],
    links: [["cataract", "about"], ["cataract", "iol"]],
  },
  {
    name: "망막클리닉 보임",
    nameEn: "RETINA",
    desc: [
      <>{SITE.since}년 개원 때부터 이어온 <br /><span className={styles.highlight}>망막 진료</span>를 <br className={styles.moBr} />망막 전문 클리닉에서 이어갑니다.</>,
      <>망막박리, 당뇨망막병증, 황반변성처럼 <br /><br className={styles.moBr} /><span className={styles.highlight}>치료 시기가 중요한 질환</span>을 가까이에서 진료합니다.</>,
    ],
    links: [["retina", "boim"], ["retina", "diabetic"], ["retina", "macular"]],
  },
];

// 마우스(정밀 포인터) 환경 여부 구독
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// 마우스 환경: 패널 위에 머무르면 커서 옆 원형 게이지가 1초 동안 차고, 다 차면 펼쳐짐
const HOLD_MS = 1000;
const RING_R = 24;
const RING_C = 2 * Math.PI * RING_R;

/** 진료과목 3분할 쇼케이스: 공통 머리 + 머무르면(터치는 탭) 해당 패널이 전체로 펼쳐지며 소개·바로가기 노출 */
export default function DepartmentShowcase() {
  const [opened, setOpened] = useState<number | null>(null);
  // 터치 환경: 화면 가운데에 들어온 패널 (호버 대신 컬러 처리)
  const [inView, setInView] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => true,
  );

  // 커서 따라다니는 게이지 (재렌더 없이 ref로 위치·진행도 갱신)
  const ringRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGCircleElement>(null);
  const holdRaf = useRef(0);

  const stopHold = useCallback(() => {
    cancelAnimationFrame(holdRaf.current);
    holdRaf.current = 0;
    if (ringRef.current) ringRef.current.style.opacity = "0";
  }, []);

  const moveRing = (e: ReactMouseEvent) => {
    const el = ringRef.current;
    if (!el) return;
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
  };

  const startHold = (i: number, e: ReactMouseEvent) => {
    if (!finePointer || opened !== null) return;
    stopHold();
    moveRing(e);
    if (fillRef.current) fillRef.current.style.strokeDashoffset = String(RING_C);
    if (ringRef.current) ringRef.current.style.opacity = "1";
    // 시작 시각은 첫 프레임의 타임스탬프로 잡음
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / HOLD_MS);
      if (fillRef.current) fillRef.current.style.strokeDashoffset = String(RING_C * (1 - p));
      if (p >= 1) {
        stopHold();
        setOpened(i);
        return;
      }
      holdRaf.current = requestAnimationFrame(tick);
    };
    holdRaf.current = requestAnimationFrame(tick);
  };

  useEffect(() => stopHold, [stopHold]);

  // 터치 환경: 펼친 내용이 바로 보이도록 패널 묶음 위로 스크롤 (헤더 50px 아래)
  const scrollToList = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const offset = -60;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }, []);

  // 클릭: 마우스 환경은 기다리지 않고 바로 펼침(재클릭 시 닫힘) / 터치 환경: 펼치고 위치 이동, 닫기 버튼으로만 닫힘
  const handleOpen = useCallback(
    (i: number) => {
      stopHold();
      if (finePointer) {
        setOpened((prev) => (prev === i ? null : i));
      } else {
        setOpened(i);
        scrollToList();
      }
    },
    [finePointer, stopHold, scrollToList],
  );

  const handleClose = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation();
    setOpened(null);
  }, []);

  // 터치 환경: 스크롤로 화면 가운데 띠(중앙 20%)에 들어온 패널에 컬러
  useEffect(() => {
    if (finePointer) return;
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-index]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [finePointer]);

  // 마우스 환경: 리스트 바깥 클릭 시 닫기
  useEffect(() => {
    if (!finePointer) return;
    const onBodyClick = (e: globalThis.MouseEvent) => {
      if (opened !== null && listRef.current && !listRef.current.contains(e.target as Node)) setOpened(null);
    };
    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
  }, [finePointer, opened]);

  return (
    <HomeSection tone="white">
      <Inner>
        <HomeHead
          eyebrow="CLINICS"
          align="center"
          title={
            <>
              소중한 눈을 위해
              <br />
              {SITE.name}는 <b>세 개의 전문 클리닉</b>으로 진료합니다
            </>
          }
          sub={
            <>
              시력교정 · 백내장 · 망막, <br className={home.moBr} />
              분야별 전문 의료진이 진료합니다.
            </>
          }
        />
      </Inner>

      {/* 3분할 패널 (화면 전체 폭) — 마우스가 영역을 벗어나면 접힘 */}
      <div
        className={`${styles.eqList} ${opened !== null ? styles.hasOpen : ""}`}
        ref={listRef}
        onMouseLeave={() => {
          stopHold();
          if (finePointer) setOpened(null);
        }}
      >
        {DEPARTMENTS.map((d, i) => (
          <div
            key={d.nameEn}
            className={`${styles.eqItem} ${opened === i ? styles.on : ""} ${inView === i ? styles.inView : ""}`}
            data-index={i}
            onMouseEnter={(e) => startHold(i, e)}
            onMouseMove={moveRing}
            onMouseLeave={stopHold}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(i);
            }}
          >
            {/* 배경 이미지 (PC/태블릿 분리) */}
            <div className={styles.cover}>
              <Placeholder className={styles.pcImg} label={`${d.name} 대표 이미지`} />
              <Placeholder className={styles.tabImg} label={`${d.name} 대표 이미지 (태블릿)`} />
            </div>
            {/* 기본 상태 오버레이: 클리닉명 */}
            <div className={styles.over}>
              <div className={styles.name}>
                <span>{d.name}</span>
                <strong>{d.nameEn}</strong>
              </div>
            </div>
            {/* 펼침 상태 상세 */}
            <div className={styles.txtGroup}>
              <div>
                <strong>{d.nameEn}</strong>
                <span className={styles.eqName}>{d.name}</span>
                <div className={styles.desc}>
                  {d.desc.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {/* 하위 페이지 바로가기 (닫힌 패널에서는 포커스·클릭 차단) */}
                <ul>
                  {d.links.map(([g, pg]) => {
                    const found = findPage(g, pg);
                    if (!found) return null;
                    return (
                      <li key={pg}>
                        <Link href={pageHref(found.group, found.page)} tabIndex={opened === i ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                          {found.page.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="닫기">
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 커서 옆 원형 게이지 (마우스 환경 전용, 화면 좌표로 따라다님) */}
      <div ref={ringRef} className={styles.ring} aria-hidden="true">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={RING_R} className={styles.ringTrack} />
          <circle ref={fillRef} cx="28" cy="28" r={RING_R} className={styles.ringFill} strokeDasharray={RING_C} strokeDashoffset={RING_C} />
        </svg>
      </div>
    </HomeSection>
  );
}
