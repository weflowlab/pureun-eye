"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./EquipmentShowcase.module.css";

type Equipment = {
  name: string;
  model: string;
  desc: ReactNode[];
  features: string[];
};

const EQUIPMENTS: Equipment[] = [
  {
    name: "YAG 레이저",
    model: "YAG LASER",
    desc: [
      <>백내장 수술 이후 생길 수 있는 <br /><span className={styles.highlight}>후발백내장 치료에 쓰이는 레이저 장비</span>입니다.</>,
      <>필요 시 레이저 홍채절개술 등에도 <br />활용됩니다.</>,
    ],
    features: ["1. 정밀한 에너지 조절로 빠른 시력 회복", "2. 주변 조직 손상 최소화", "3. 외래에서 짧은 시간에 시행 가능"],
  },
  {
    name: "안과 수술용 현미경",
    model: "SURGICAL MICROSCOPE",
    desc: [
      <>미세한 안구 조직을 <br /><span className={styles.highlight}>고배율로 관찰하며 수술할 수 있도록 돕는 장비</span>입니다.</>,
      <>수술 중에도 흔들림 없는 선명한 시야로 <br /><span className={styles.highlight}>수술의 정밀도</span>를 높입니다.</>,
    ],
    features: ["1. 밝고 선명한 수술 시야", "2. 세밀한 구조까지 확인 가능", "3. 장시간 수술에도 안정적인 광학계"],
  },
  {
    name: "망막 · 백내장 수술장비",
    model: "VITRECTOMY SYSTEM",
    desc: [
      <><span className={styles.highlight}>망막 수술과 백내장 수술을 한 장비</span>에서 <br />함께 진행할 수 있는 <span className={styles.highlight}>통합 수술 장비</span>입니다.</>,
      <>유리체·망막 수술에 최적화되어 있으며 <br />백내장 수술도 함께 가능합니다.</>,
    ],
    features: ["1. 빠르고 정교한 유리체 절제", "2. 수술 중 안전 시스템 탑재", "3. 복합 질환 환자에게 효율적인 수술"],
  },
  {
    name: "망막질환 레이저",
    model: "RETINA LASER",
    desc: [
      <>황반부종, 당뇨망막병증 등 <br />다양한 망막질환 치료에 쓰이는 레이저입니다.</>,
      <>미세 펄스 방식으로 <span className={styles.highlight}>열 손상을 <br />줄이도록 설계</span>되어 있습니다.</>,
    ],
    features: ["1. 황반부 손상 최소화", "2. 만성 망막질환 치료에 활용", "3. 반복 치료가 필요한 경우에도 안정적"],
  },
];

// 마우스(정밀 포인터) 환경 여부 구독
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** 장비 4분할 쇼케이스: 클릭 시 해당 패널이 전체로 펼쳐지며 상세 노출 */
export default function EquipmentShowcase() {
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
          {SITE.name}는 <b>정밀한 장비</b>로 진료합니다.
        </h3>
      </div>

      <div className={styles.eqList} ref={listRef}>
        {EQUIPMENTS.map((eq, i) => (
          <div
            key={eq.model}
            className={`${styles.eqItem} ${opened === i ? styles.on : ""}`}
            data-index={i}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(i);
            }}
          >
            {/* 배경 이미지 (PC/태블릿 분리) */}
            <div className={styles.cover}>
              <Placeholder className={styles.pcImg} label={`${eq.model} 장비 이미지`} />
              <Placeholder className={styles.tabImg} label={`${eq.model} 장비 이미지 (태블릿)`} />
            </div>
            {/* 기본 상태 오버레이: 장비명 */}
            <div className={styles.over}>
              <div className={styles.name}>
                <span>{eq.name}</span>
                <strong>{eq.model}</strong>
              </div>
            </div>
            {/* 펼침 상태 상세 */}
            <div className={styles.txtGroup}>
              <div>
                <strong>{eq.model}</strong>
                <span className={styles.eqName}>{eq.name}</span>
                <div className={styles.desc}>
                  {eq.desc.map((d, j) => (
                    <p key={j}>{d}</p>
                  ))}
                </div>
                <ul>
                  {eq.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
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
