import type { Metadata } from "next";
import ContentBlock from "@/components/news/ContentBlock";
import styles from "@/components/news/privacy.module.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${SITE.name}`,
};

/** 수집 항목 표 데이터 */
const COLLECT_ROWS = [
  { purpose: "진료 예약·상담", items: "성명, 연락처, 희망 진료일", period: "목적 달성 후 즉시 파기" },
  { purpose: "진료 및 진료기록 관리", items: "성명, 생년월일, 연락처, 주소, 진료정보", period: "의료법에 따른 보존기간" },
  { purpose: "진료비 청구·수납", items: "성명, 주민등록번호, 결제정보", period: "관계 법령에 따른 보존기간" },
];

/** 개인정보처리방침 페이지 (샘플 문안 — 실제 운영 전 법률 검토 필요) */
export default function PrivacyPage() {
  return (
    <ContentBlock headerOffset>
      <div className={styles.wrap}>
        {/* 제목 */}
        <h1 className={styles.title}>개인정보처리방침</h1>
        <p className={styles.subtitle}>{SITE.name}은(는) 이용자의 개인정보를 소중히 보호합니다.</p>

        {/* 조항 */}
        <div className={styles.body}>
          <p>
            {SITE.name}(이하 &lsquo;병원&rsquo;)은 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를
            보호하고 관련 고충을 신속하게 처리하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <h2>제1조 (개인정보의 처리 목적 및 항목)</h2>
          <p>병원은 다음의 목적을 위하여 최소한의 개인정보를 처리하며, 목적 이외의 용도로는 이용하지 않습니다.</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>처리 목적</th>
                <th>수집 항목</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              {COLLECT_ROWS.map((row) => (
                <tr key={row.purpose}>
                  <td>{row.purpose}</td>
                  <td>{row.items}</td>
                  <td>{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>제2조 (개인정보의 제3자 제공)</h2>
          <p>
            병원은 이용자의 동의, 법률의 특별한 규정 등 「개인정보 보호법」에서 허용하는 경우를 제외하고는
            개인정보를 제3자에게 제공하지 않습니다.
          </p>

          <h2>제3조 (개인정보의 파기)</h2>
          <p>
            보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자 파일은 복구할 수 없는
            방법으로 삭제하며, 종이 문서는 분쇄하거나 소각합니다.
          </p>

          <h2>제4조 (정보주체의 권리·의무)</h2>
          <p>
            이용자는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있으며, 병원은 이에 대해 지체 없이
            조치합니다.
          </p>

          <h2>제5조 (개인정보 보호책임자)</h2>
          <p>
            개인정보 보호책임자: {SITE.privacyOfficer} / 연락처: {SITE.tel}
          </p>

          <h2>제6조 (개인정보처리방침의 변경)</h2>
          <p>본 방침의 내용 추가·삭제 및 수정이 있을 경우 시행 7일 전부터 홈페이지를 통해 고지합니다.</p>
        </div>

        {/* 시행일 */}
        <p className={styles.date}>시행일자: 2026년 1월 1일</p>
      </div>
    </ContentBlock>
  );
}
