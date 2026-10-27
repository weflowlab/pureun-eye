import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./ClinicValues.module.css";

const VALUES = [
  { title: "환자중심", desc: "환자의 이야기에 귀 기울이며\n최선의 결과를 함께 찾습니다." },
  { title: "체계적 시스템", desc: "검사부터 수술 후 관리까지\n체계적으로 진행합니다." },
  { title: "안전지향", desc: "안전을 가장 먼저 생각하는\n진료 환경을 지킵니다." },
  { title: "전문성", desc: "풍부한 임상 경험을 바탕으로\n전문적인 진료를 제공합니다." },
];

/** 병원 가치 소개: 로고·슬로건·대표 이미지 + 하단 어두운 띠의 4가지 가치 */
export default function ClinicValues() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.logoWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label={`${SITE.name} 로고`} aspectRatio="270 / 80" />
        </div>
        <p className={styles.quote} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          “{SITE.name}는 <span className={styles.quoteBold}>망막 · 백내장 전문 안과</span>입니다”
        </p>
        <div className={styles.clinicImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="병원 전경 이미지" aspectRatio="1210 / 600" />
        </div>
      </div>

      {/* 하단 가치 카드 띠 (0.1초 간격 순차 등장) */}
      <div className={styles.valueStrip}>
        {VALUES.map((v, i) => (
          <div key={v.title} className={styles.valueCard} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay={String(100 * i)}>
            <Placeholder label={`${v.title} 아이콘`} width={120} height={120} dark className={styles.valueIcon} />
            <p className={styles.valueTitle}>{v.title}</p>
            <p className={styles.valueDesc}>
              {v.desc.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
