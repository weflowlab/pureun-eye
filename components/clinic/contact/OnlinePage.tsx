import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import { playfairItalic } from "@/lib/fonts";
import { HOURS, SITE } from "@/lib/site";
import ConsultForm from "./ConsultForm";
import styles from "./contact.module.css";

// 전화기(채워진 수화기) · 카카오톡 말풍선 심볼
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
  </svg>
);
const KakaoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 3C6.48 3 2 6.51 2 10.84c0 2.8 1.86 5.26 4.66 6.65l-.95 3.48c-.08.3.26.54.52.37l4.15-2.74c.53.07 1.07.11 1.62.11 5.52 0 10-3.51 10-7.87S17.52 3 12 3z" />
  </svg>
);

/** 상담 신청: 왼쪽 안내 문구 · 전화/카카오톡 버튼 · 연락처·진료시간 | 오른쪽 상담 신청 폼 */
export default function OnlinePage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        <div className={`${styles.wrap} ${playfairItalic.variable}`}>
          {/* 왼쪽: 안내 */}
          <div className={styles.side} suppressHydrationWarning data-aos="fade-up">
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={styles.title}>
              <span>궁금한 점을</span>
              <strong>편하게 물어보세요</strong>
            </h2>
            <p className={styles.desc}>
              진료 분야와 연락처를 남겨 주시면
              <br />
              상담 가능한 시간에 연락드립니다.
            </p>

            <div className={styles.btns}>
              <a href={`tel:${SITE.tel}`} className={`${styles.btn} ${styles.call}`}>
                <PhoneIcon />
                전화하기
              </a>
              <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.kakao}`}>
                <KakaoIcon />
                카카오톡 상담
              </a>
            </div>

            <dl className={styles.info}>
              <div>
                <dt>대표전화</dt>
                <dd>{SITE.tel}</dd>
              </div>
              <div>
                <dt>라식상담</dt>
                <dd>{SITE.lasikTel}</dd>
              </div>
              {[HOURS.weekday, HOURS.saturday].map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <ul className={styles.notes}>
              {HOURS.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          {/* 오른쪽: 상담 신청 폼 */}
          <div suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            <ConsultForm />
          </div>
        </div>
      </ContentBlock>
    </SubLayout>
  );
}
