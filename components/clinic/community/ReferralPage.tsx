import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import { SITE } from "@/lib/site";
import styles from "./referral.module.css";

// 진료의뢰서 파일 — 병원 확인 후 public/files/referral/에 넣고 href 지정 (기존 홈페이지에 doc/pdf/hwp 양식 있음)
const FILES: { format: string; desc: string; href?: string }[] = [
  { format: "PDF", desc: "인쇄용" },
  { format: "HWP", desc: "한글 문서" },
  { format: "DOC", desc: "워드 문서" },
];

/** 진료의뢰서 다운로드: 안내 + 파일 형식별 버튼 (파일 준비 전에는 비활성) */
export default function ReferralPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        <SectionHead
          title="진료의뢰서 다운로드"
          sub={
            <>
              {SITE.name}로 환자를 의뢰하실 때 아래 양식을 내려받아 작성해 주세요.
              <br className="pc_block" /> 문의: 대표전화 {SITE.tel}
            </>
          }
          first
        />

        {/* 형식별 다운로드 */}
        <ul className={styles.files}>
          {FILES.map((f) => (
            <li key={f.format} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <span className={styles.format}>{f.format}</span>
              <span className={styles.desc}>{f.desc}</span>
              {f.href ? (
                <a href={f.href} download className={styles.btn}>
                  다운로드
                </a>
              ) : (
                <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true">
                  파일 준비 중
                </span>
              )}
            </li>
          ))}
        </ul>
      </ContentBlock>
    </SubLayout>
  );
}
