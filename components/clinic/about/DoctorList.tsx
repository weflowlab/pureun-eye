"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { getLenis } from "@/components/layout/Providers";
import { CLINIC_LABEL, DOCTORS, type Clinic, type Doctor } from "@/lib/doctors";
import ScheduleTable from "./ScheduleTable";
import tabStyles from "./about.module.css";
import styles from "./doctors.module.css";

type Tab = "all" | Clinic;

// 기존 홈페이지 탭 구성 (전체 / 외래 / 망막)
const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "전체 의료진" },
  { key: "outpatient", label: CLINIC_LABEL.outpatient },
  { key: "retina", label: CLINIC_LABEL.retina },
];

/** 고정 헤더 높이만큼 띄워서 해당 원장 프로필로 스크롤 (Lenis 우선) */
function scrollToDoctor(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;
  const offset = -((document.querySelector("header")?.getBoundingClientRect().height ?? 85) + 20);
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

/** 클리닉 탭 + 원장별 프로필 (약력·진료시간 모두 펼친 상태). /about/doctors#slug 로 바로 이동 */
export default function DoctorList() {
  const [tab, setTab] = useState<Tab>("all");
  const [target, setTarget] = useState<string | null>(null); // 해시로 찾아온 원장 (폰에서는 약력을 펼쳐 둠)

  // 해시(#slug) 진입·사진 카드 클릭 시 전체 탭으로 돌리고 스크롤
  useEffect(() => {
    const timers: number[] = [];
    const goToHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!DOCTORS.some((d) => d.slug === slug)) return;
      setTab("all");
      setTarget(slug);
      // 렌더·Lenis 초기화(Providers 이펙트) 이후에 이동
      timers.push(window.setTimeout(() => scrollToDoctor(slug), 200));
    };
    timers.push(window.setTimeout(goToHash, 0));
    window.addEventListener("hashchange", goToHash);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("hashchange", goToHash);
    };
  }, []);

  const list = tab === "all" ? DOCTORS : DOCTORS.filter((d) => d.clinic === tab);

  return (
    <>
      <div className={`${tabStyles.tabs} ${styles.tabs}`} role="tablist" aria-label="클리닉별 의료진">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`doctor-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="doctor-list"
            className={`${tabStyles.tab} ${tab === t.key ? tabStyles.tabOn : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="doctor-list" role="tabpanel" aria-labelledby={`doctor-tab-${tab}`}>
        {list.map((d) => (
          <Profile key={d.slug} doctor={d} forceOpen={target === d.slug} />
        ))}
      </div>
    </>
  );
}

/** 원장 프로필: 왼쪽 사진(스크롤 동안 따라옴) | 소속·이름·한마디·분야 → 약력 3단 → 진료시간표
 *  폰에서는 약력·진료시간을 접어 두고 버튼으로 펼침 (페이지가 너무 길어지지 않게) */
function Profile({ doctor: d, forceOpen }: { doctor: Doctor; forceOpen?: boolean }) {
  // 직접 누르기 전에는 해시로 찾아온 원장만 펼쳐 둠
  const [open, setOpen] = useState<boolean | null>(null);
  const shown = open ?? !!forceOpen;
  const detailId = `${d.slug}-detail`;
  return (
    <article id={d.slug} className={styles.profile}>
      <div className={styles.photo}>
        <Placeholder label={`${d.name} ${d.title}`} aspectRatio="3 / 4" stock={false} />
      </div>

      <div className={styles.info}>
        <p className={styles.clinic}>
          {CLINIC_LABEL[d.clinic]}
          {d.reservationOnly && <span className={styles.reserve}>예약 진료만 가능</span>}
        </p>
        <h3 className={styles.name}>
          {d.name}
          <span className={styles.title}>{d.title}</span>
        </h3>
        <p className={styles.nameEn}>{d.nameEn}</p>
        <blockquote className={styles.motto}>{d.motto}</blockquote>
        <ul className={styles.specialties} aria-label="진료 분야">
          {d.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <button type="button" className={styles.moreBtn} aria-expanded={shown} aria-controls={detailId} onClick={() => setOpen(!shown)}>
          약력 · 진료시간 {shown ? "접기" : "보기"}
          <ChevronDown size={18} strokeWidth={2} aria-hidden />
        </button>

        <div id={detailId} className={styles.detail} data-open={shown}>
          <div className={styles.careers}>
            {d.careers.map((c) => (
              <div key={c.label}>
                <p className={styles.label}>{c.label}</p>
                <ul className={styles.careerList}>
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.schedule}>
            <p className={styles.label}>진료시간</p>
            <ScheduleTable rows={d.schedule} notes={d.scheduleNotes} caption={`${d.name} ${d.title} 주간 진료시간표`} />
          </div>
        </div>
      </div>
    </article>
  );
}
