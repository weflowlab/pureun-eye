"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE, findPage, pageHref } from "@/lib/site";
import { EXAM_TOTAL } from "@/lib/vision";
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
      <>{EXAM_TOTAL}가지 정밀 검사 결과를 종합해 <br />스마일 · 라식 · 라섹 중 <span className={styles.highlight}>내 눈에 맞는 방법</span>을 함께 정합니다.</>,
    ],
    links: [["vision", "pre-care"], ["vision", "smile"], ["vision", "lasik"]],
  },
  {
    name: "푸른 백내장 노안센터",
    nameEn: "CATARACT",
    desc: [
      <>검사부터 인공수정체 선택까지 <br /><span className={styles.highlight}>생활에 맞춘 백내장 수술</span>을 계획합니다.</>,
      <>수정체 탈구, 작은 동공 등 <br /><span className={styles.highlight}>까다로운 조건의 백내장</span>도 신중하게 수술합니다.</>,
    ],
    links: [["cataract", "center"], ["cataract", "premium"], ["cataract", "advanced"]],
  },
  {
    name: "망막클리닉 보임",
    nameEn: "RETINA",
    desc: [
      <>{SITE.since}년 개원 때부터 이어온 <br /><span className={styles.highlight}>망막 진료</span>를 망막 전문 클리닉에서 이어갑니다.</>,
      <>망막박리, 당뇨망막병증, 황반변성처럼 <br /><span className={styles.highlight}>치료 시기가 중요한 질환</span>을 가까이에서 진료합니다.</>,
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

/** 진료과목 3분할 쇼케이스: 클릭 시 해당 패널이 전체로 펼쳐지며 소개·바로가기 노출 */
export default function DepartmentShowcase() {
  const [opened, setOpened] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => true,
  );

  // 마우스 환경: 같은 항목 재클릭 시 닫힘 / 터치 환경: 닫기 버튼으로만 닫힘
  const handleOpen = useCallback(
    (i: number) => {
      if (finePointer) setOpened((prev) => (prev === i ? null : i));
      else setOpened(i);
    },
    [finePointer],
  );

  const handleClose = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation();
    setOpened(null);
  }, []);

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
    <section>
      <div className={styles.titWrap}>
        <h3 suppressHydrationWarning data-aos="fade-up">
          소중한 눈을 위해
          <br />
          {SITE.name}는 <b>세 개의 전문 클리닉</b>으로 진료합니다.
        </h3>
      </div>

      <div className={styles.eqList} ref={listRef}>
        {DEPARTMENTS.map((d, i) => (
          <div
            key={d.nameEn}
            className={`${styles.eqItem} ${opened === i ? styles.on : ""}`}
            data-index={i}
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
    </section>
  );
}
