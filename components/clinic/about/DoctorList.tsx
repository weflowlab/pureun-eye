"use client";

import { useEffect, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { getLenis } from "@/components/layout/Providers";
import { CLINIC_LABEL, DOCTORS, type Clinic, type Doctor } from "@/lib/doctors";
import ScheduleTable from "./ScheduleTable";
import styles from "./about.module.css";

type Tab = "all" | Clinic;

// 기존 홈페이지 탭 구성 (전체 / 외래 / 망막)
const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "전체 의료진" },
  { key: "outpatient", label: CLINIC_LABEL.outpatient },
  { key: "retina", label: CLINIC_LABEL.retina },
];

/** 고정 헤더 높이만큼 띄워서 해당 의사 카드로 스크롤 (Lenis 우선) */
function scrollToDoctor(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;
  const offset = -((document.querySelector("header")?.getBoundingClientRect().height ?? 85) + 20);
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

/** 의료진 목록: 클리닉 탭 + 의사 카드(약력·진료시간 펼침). /about/doctors#slug 로 바로 이동 */
export default function DoctorList() {
  const [tab, setTab] = useState<Tab>("all");
  const [opened, setOpened] = useState<Set<string>>(() => new Set());

  // 해시(#slug) 진입 시 전체 탭으로 돌리고 카드를 펼친 뒤 스크롤
  useEffect(() => {
    const timers: number[] = [];
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!DOCTORS.some((d) => d.slug === slug)) return;
      setTab("all");
      setOpened((prev) => new Set(prev).add(slug));
      // 렌더·Lenis 초기화(Providers 이펙트) 이후에 이동
      timers.push(window.setTimeout(() => scrollToDoctor(slug), 200));
    };
    timers.push(window.setTimeout(openFromHash, 0));
    window.addEventListener("hashchange", openFromHash);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const toggle = (slug: string) =>
    setOpened((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const list = tab === "all" ? DOCTORS : DOCTORS.filter((d) => d.clinic === tab);

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="클리닉별 의료진">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`doctor-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="doctor-list"
            className={`${styles.tab} ${tab === t.key ? styles.tabOn : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="doctor-list" role="tabpanel" aria-labelledby={`doctor-tab-${tab}`} className={styles.doctorList}>
        {list.map((d) => (
          <DoctorCard key={d.slug} doctor={d} open={opened.has(d.slug)} onToggle={() => toggle(d.slug)} />
        ))}
      </div>
    </>
  );
}

type CardProps = { doctor: Doctor; open: boolean; onToggle: () => void };

/** 의사 카드: 사진 | 이름·분야·한마디 + 펼침 패널(약력·진료시간표) */
function DoctorCard({ doctor: d, open, onToggle }: CardProps) {
  const panelId = `${d.slug}-detail`;
  return (
    <article id={d.slug} className={`${styles.doctorCard} ${open ? styles.open : ""}`}>
      <div className={styles.doctorPhoto}>
        <Placeholder label={`${d.name} ${d.title}`} aspectRatio="3 / 4" />
      </div>

      <div className={styles.doctorInfo}>
        <p className={styles.doctorClinic}>{CLINIC_LABEL[d.clinic]}</p>
        <h4 className={styles.doctorName}>
          <span className={styles.doctorTitle}>{d.title}</span>
          {d.name}
          <span className={styles.doctorEn}>{d.nameEn}</span>
        </h4>
        <ul className={styles.specialties} aria-label="진료 분야">
          {d.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className={styles.motto}>“{d.motto}”</p>
        {d.reservationOnly && <p className={styles.reserveBadge}>예약 진료만 가능</p>}

        <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          약력 · 진료시간 {open ? "접기" : "보기"}
          <span className={styles.toggleIcon} aria-hidden />
        </button>
      </div>

      {/* 펼침 패널: 닫혀 있어도 DOM에는 유지 (검색 노출) */}
      <div id={panelId} className={styles.detail} hidden={!open}>
        <div className={styles.careers}>
          {d.careers.map((c) => (
            <div key={c.label} className={styles.careerGroup}>
              <p className={styles.careerLabel}>{c.label}</p>
              <ul className={styles.careerList}>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.schedule}>
          <p className={styles.careerLabel}>진료시간</p>
          <ScheduleTable rows={d.schedule} notes={d.scheduleNotes} caption={`${d.name} ${d.title} 주간 진료시간표`} />
        </div>
      </div>
    </article>
  );
}
