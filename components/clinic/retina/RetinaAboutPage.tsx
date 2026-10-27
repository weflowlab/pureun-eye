import Link from "next/link";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SectionHead from "./SectionHead";
import styles from "./retina.module.css";

// 대표 망막질환 (상세 페이지가 있으면 링크)
const DISEASES = [
  { title: "당뇨망막병증", desc: "당뇨로 망막 미세혈관이 손상되어 출혈·부종이 생기는 합병증입니다.", href: "/retina/diabetic" },
  { title: "연령관련 황반변성", desc: "중심 시력을 담당하는 황반이 손상되어 시야 가운데가 흐려지거나 휘어 보입니다.", href: "/retina/macular" },
  { title: "망막혈관폐쇄", desc: "망막의 동맥이나 정맥이 막혀 갑작스러운 시력 저하가 나타날 수 있습니다." },
  { title: "망막박리", desc: "망막이 안구 벽에서 떨어지는 질환으로, 빠른 수술이 필요한 응급 질환입니다.", href: "/retina/detachment" },
];

// 망막 정밀 검사
const EXAMS = ["안저 촬영", "형광안저조영검사", "인도시아닌그린 혈관조영", "빛간섭단층촬영(OCT)"];

/** 망막이란 페이지 */
export default function RetinaAboutPage() {
  return (
    <SubLayout
      path="/retina/about"
      description={
        <>
          눈으로 들어온 빛을 신호로 바꿔 <br className="pc_block" />
          뇌로 전달하는 얇은 신경막
        </>
      }
    >
      {/* 망막의 구조와 역할 · 조기 진단 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="망막이란" imageLabel="망막 구조">
          <span className="cr fw500">
            눈의 가장 안쪽에 있는 얇은 신경막
            <br />
            <br />
          </span>
          카메라의 필름, 디지털카메라의 이미지 센서(CCD)와 같은 역할을 합니다.
          <br className="pc_block" />
          눈에 들어온 빛을 전기 신호로 바꿔 시신경을 통해 뇌로 전달하며,
          <br className="pc_block" />
          눈의 다른 조직들은 망막이 제 기능을 하도록 돕습니다.
        </InfoBox>
        <InfoBox title="조기 진단이 중요한 이유" imageLabel="망막 검사" reverse>
          망막은 한 번 손상되면 회복이 어렵습니다.
          <br className="pc_block" />
          치료 시기를 놓치면 시력 손실이 영구적으로 남을 수 있으므로,
          <br className="pc_block" />
          손상이 심해지기 전에 발견해 치료하는 것이 중요합니다.
        </InfoBox>
      </ContentBlock>

      {/* 안내 띠 */}
      <ImgTxtBox
        label="망막 안내 배경"
        lead={
          <>
            망막은 눈 속 깊은 곳에 있어
            <br className="pc_block" />
            겉으로 보는 검사만으로는 이상을 알기 어렵습니다.
          </>
        }
      />

      {/* 대표 망막질환 */}
      <ContentBlock tone="gray">
        <SectionHead first title="대표적인 망막질환" sub="증상이 늦게 나타나는 경우가 많아 정기적인 검진이 필요합니다." />
        <div className={`${styles.secBody} ${styles.cardGrid} ${styles.four}`}>
          {DISEASES.map((d, i) =>
            d.href ? (
              <Link key={d.title} href={d.href} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.cardTitle}>{d.title}</p>
                <p className={styles.cardDesc}>{d.desc}</p>
                <p className={styles.cardMore}>자세히 보기 →</p>
              </Link>
            ) : (
              <div key={d.title} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.cardTitle}>{d.title}</p>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            ),
          )}
        </div>
      </ContentBlock>

      {/* 망막 정밀 검사 */}
      <ContentBlock>
        <SectionHead first title="망막 정밀 검사" sub="특수 장비와 망막 전문의의 진료로 정확하게 진단합니다." />
        <ul className={`${styles.secBody} ${styles.pillList}`}>
          {EXAMS.map((e, i) => (
            <li key={e} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              {e}
            </li>
          ))}
        </ul>
        <div className={styles.centerLink}>
          <Link href="/retina/equipment" className={styles.doctorLink}>
            보임 장비 보기
          </Link>
        </div>
      </ContentBlock>
    </SubLayout>
  );
}
