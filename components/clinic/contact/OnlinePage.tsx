import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import { HOURS, SITE } from "@/lib/site";
import ConsultButton from "./ConsultButton";
import styles from "./contact.module.css";

/** 온라인 상담: 상담 신청(모달) · 카카오톡 · 전화 3가지 방법 + 진료시간 */
export default function OnlinePage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        <SectionHead title="편하신 방법으로 문의해 주세요" sub="남겨주신 연락처로 확인 후 연락드립니다." first />

        {/* 문의 방법 3가지 */}
        <ul className={styles.ways}>
          <li suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            <p className={styles.wayLabel}>ONLINE</p>
            <p className={styles.wayTitle}>온라인 상담 신청</p>
            <p className={styles.wayDesc}>진료 분야와 연락처를 남겨주시면 상담 가능한 시간에 연락드립니다.</p>
            <ConsultButton className={styles.wayBtn}>상담 신청하기</ConsultButton>
          </li>
          <li suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
            <p className={styles.wayLabel}>KAKAO</p>
            <p className={styles.wayTitle}>카카오톡 상담</p>
            <p className={styles.wayDesc}>카카오톡 채널로 편하게 문의하실 수 있습니다.</p>
            <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={styles.wayBtn}>
              카카오톡 채널 열기
            </a>
          </li>
          <li suppressHydrationWarning data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
            <p className={styles.wayLabel}>CALL</p>
            <p className={styles.wayTitle}>전화 상담</p>
            <p className={styles.wayDesc}>
              대표전화 <a href={`tel:${SITE.tel}`}>{SITE.tel}</a>
              <br />
              라식상담 <a href={`tel:${SITE.lasikTel}`}>{SITE.lasikTel}</a>
            </p>
            <a href={`tel:${SITE.tel}`} className={styles.wayBtn}>
              전화 걸기
            </a>
          </li>
        </ul>

        {/* 진료시간 */}
        <dl className={styles.hours}>
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
      </ContentBlock>
    </SubLayout>
  );
}
