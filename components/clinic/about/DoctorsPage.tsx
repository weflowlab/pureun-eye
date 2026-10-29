import Placeholder from "@/components/common/Placeholder";
import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import { CLINIC_LABEL, DOCTORS } from "@/lib/doctors";
import { playfairItalic } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import DoctorList from "./DoctorList";
import styles from "./doctors.module.css";

/** 병원소개 — 의료진소개: 소개(사진 카드가 가로로 흐름) → 클리닉 탭 + 원장별 프로필 */
export default function DoctorsPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <div className={playfairItalic.variable}>
        {/* 소개: 두 톤 제목 + 의료진 사진 카드 흐름 (누르면 해당 프로필로) */}
        <section className={styles.intro}>
          <div className={styles.introHead} suppressHydrationWarning data-aos="fade-up">
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={styles.introTitle}>
              <span>많은 수술보다,</span>
              <strong>안전한 수술을 합니다</strong>
            </h2>
            <p className={styles.introSub}>
              수술 후의 관리까지 생각하는 {SITE.name} 의료진 <b>{DOCTORS.length}인</b>
            </p>
          </div>
          <div className={styles.marquee}>
            <ul className={styles.marqueeTrack}>
              {[0, 1].map((dup) =>
                DOCTORS.map((d) => (
                  <li key={`${dup}-${d.slug}`} aria-hidden={dup === 1 || undefined}>
                    <a href={`#${d.slug}`} tabIndex={dup === 1 ? -1 : undefined}>
                      <Placeholder label={`${d.name} ${d.title}`} aspectRatio="274 / 340" stock={false} />
                      <p className={styles.cardName}>
                        {d.name} <span>{d.title}</span>
                      </p>
                      <p className={styles.cardClinic}>{CLINIC_LABEL[d.clinic]}</p>
                    </a>
                  </li>
                )),
              )}
            </ul>
          </div>
        </section>

        <section className={styles.profiles}>
          <DoctorList />
        </section>
      </div>
    </SubLayout>
  );
}
