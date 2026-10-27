import { Fragment } from "react";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { HOURS } from "./data";
import s from "./Section.module.css";
import styles from "./HoursSection.module.css";

/** 전화 아이콘 */
function PhoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

/** 시계 아이콘 */
function ClockIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

/** 진료시간 안내: 어두운 배경 위 전화번호(좌) + 진료시간 표(우) */
export default function HoursSection() {
  const tels = [SITE.tel, SITE.lasikTel];
  return (
    <section className={`${s.contB} ${styles.wrap}`}>
      {/* 배경 이미지 자리 + 어둡게 */}
      <div className={styles.bg}>
        <Placeholder label="진료시간 배경" dark />
      </div>
      <div className={s.contInner} id="intro4">
        <p className={`${s.contTitTxt} ${styles.light}`} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          진료시간 안내
        </p>
        <p className={`${s.contSubTxt} ${styles.light}`} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
          최고의 의료진이 최선을 다하는 {SITE.name}입니다.
        </p>

        <div className={styles.ttmBx}>
          {/* 전화번호: 클릭 시 전화 연결 */}
          <div suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
            <div className={styles.tit}>
              <PhoneIcon />
              <div className={styles.titTxt}>
                <p>전화 번호</p>
                <p>
                  상담시간 9AM ~ 6PM <br className={s.m} />
                  (주말, 공휴일 휴무)
                </p>
              </div>
            </div>
            <div className={styles.tel}>
              {tels.map((t) => (
                <a key={t} href={`tel:${t}`} title="전화 걸기">
                  {t.replaceAll("-", ".")}
                </a>
              ))}
            </div>
          </div>

          {/* 진료 안내 + 시간표 */}
          <div className={styles.right} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
            <div className={styles.tit}>
              <ClockIcon />
              <div className={styles.titTxt}>
                <p>진료 안내</p>
              </div>
            </div>
            <div className={styles.ttmTxt}>
              <div>※ 수술 일정에 따라 외래 진료가 변동될 수 있으니 전화로 확인 부탁드립니다.</div>
              <div>※ 접수는 진료 종료 30분 전까지 가능합니다.</div>
            </div>
            <div className={styles.time}>
              <table>
                <tbody>
                  {HOURS.map((g, gi) => (
                    <Fragment key={g.group}>
                      {/* 그룹 간 간격 */}
                      {gi > 0 && (
                        <tr className={styles.gap}>
                          <td colSpan={3} />
                        </tr>
                      )}
                      {/* 모바일: 그룹명을 별도 행으로 */}
                      <tr>
                        <td className={s.m} colSpan={3}>
                          {g.group}
                        </td>
                      </tr>
                      {g.rows.map(([day, time], ri) => (
                        <tr key={day}>
                          <td className={s.p}>{ri === 0 ? g.group : ""}</td>
                          <td>{day}</td>
                          <td>{time}</td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
