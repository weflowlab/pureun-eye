import SubLayout from "@/components/sub/SubLayout";
import EquipPhoto from "../common/EquipPhoto";
import SectionHead from "@/components/clinic/retina/SectionHead";
import rs from "@/components/clinic/retina/retina.module.css";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import ImgTxtBox from "../common/ImgTxtBox";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import DiabeticSlider from "./DiabeticSlider";
import styles from "./diabetic.module.css";

// 당뇨망막병증 분류 (기존 원고)
const TYPES = [
  {
    title: "비증식성 당뇨망막병증",
    desc: "안저검사에서 미세동맥류, 경성삼출물, 망막출혈이 보이지만 신생혈관은 생기지 않은 단계입니다. 정기적인 경과 관찰이 필요합니다.",
  },
  {
    title: "증식성 당뇨망막병증",
    desc: "신생혈관이 생겨 유리체출혈, 견인성 망막박리 등으로 진행할 가능성이 높은 단계입니다. 적극적으로 치료하지 않으면 실명에 이를 수 있습니다.",
  },
  {
    title: "당뇨황반부종",
    desc: "망막 중심부인 황반의 미세혈관 이상으로 부종이 생겨 중등도의 시력 저하가 나타납니다. 안구 내 주사 치료로 시력 회복을 기대할 수 있습니다.",
  },
];

/** 당뇨망막병증 페이지 */
export default function DiabeticPage() {
  return (
    <SubLayout
      path="/retina/diabetic"
      description={
        <>
          당뇨로 망막 혈관이 손상되어 생기는 <br className="pc_block" />
          대표적인 당뇨 합병증
        </>
      }
    >
      {/* 질환 소개 · 분류 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="당뇨망막병증" image={<DiabeticSlider />}>
          <span className="cr fw500">
            당뇨병으로 망막의 말초 혈관이 손상되어 생기는 질환
            <br />
            <br />
          </span>
          실명을 일으키는 주요 원인 중 하나로,
          <br className="pc_block" />
          당뇨를 앓은 기간이 길수록, 혈당 조절이 잘 되지 않을수록 위험이 커집니다.
          <br />
          <br />
          혈당 조절을 잘하더라도 당뇨 발생 후 15~20년 이상 지나면
          <br className="pc_block" />
          상당수의 환자에게서 당뇨망막병증이 나타납니다.
        </InfoBox>

        <SectionHead title="당뇨망막병증의 분류" sub="신생혈관이 생겼는지, 황반까지 침범했는지에 따라 나뉩니다." />
        <div className={`${rs.secBody} ${rs.values}`}>
          {TYPES.map((t, i) => (
            <div key={t.title} className={rs.value} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={rs.valueNum}>{String(i + 1).padStart(2, "0")}</p>
              <p className={rs.valueTitle}>{t.title}</p>
              <p className={rs.valueDesc}>{t.desc}</p>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 정기 검진 안내 띠 */}
      <ImgTxtBox
        label="당뇨망막병증 안내 배경"
        lead={
          <>
            당뇨가 있다면 눈에 불편이 없더라도
            <br className="pc_block" />
            정기적으로 안저검사를 받아 망막 상태를 확인하세요.
          </>
        }
      />

      {/* 정밀 검사 · 치료 */}
      <ContentBlock>
        <InfoBox title="망막 정밀 검사" image={<EquipPhoto model="Heidelberg Spectralis HRA" />}>
          형광안저혈관조영 검사로 혈관에서 새는 곳과
          <br className="pc_block" />
          혈류가 부족한 망막 부위를 확인하고,
          <br className="pc_block" />
          빛간섭단층촬영(OCT)으로 황반부종 여부를 살펴
          <br className="pc_block" />
          단계에 맞는 치료를 결정합니다.
        </InfoBox>

        <BadgeBox heading="당뇨망막병증 치료">
          <BadgeItem
            badge={
              <>
                01 <span className="fwb">레이저 광응고술</span>
              </>
            }
          >
            쉽게 터지는 신생혈관은 혈액 공급이 부족한(허혈성) 망막에서 생겨납니다.
            <br className="pc_block" />
            레이저로 망막 주변부를 응고시켜 신생혈관이 줄어들도록 하며,
            <br className="pc_block" />
            증식성 단계에서 심각한 시력 저하를 예방하기 위해 시행합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                02 <span className="fwb">항체 주사</span>
              </>
            }
          >
            혈관내피성장인자(VEGF)를 차단해 신생혈관을 줄이고 모세혈관에서 새는 것을 막습니다.
            <br className="pc_block" />
            당뇨황반부종 치료에 사용하며, 유리체출혈 환자의 재출혈 가능성을 낮춥니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                03 <span className="fwb">유리체 절제술</span>
              </>
            }
            media={<EquipPhoto model="Constellation" className={styles.treatImg} />}
          >
            유리체출혈이나 견인성 망막박리가 생길 만큼 진행된 경우 수술이 필요합니다.
            <br className="pc_block" />
            안구에 작은 구멍을 내어 유리체출혈과 망막을 당기는 섬유혈관막을 제거합니다.
            <br className="pc_block" />
            봉합 없이 진행하는 25G 무봉합 방식으로 시행하며,
            <br className="pc_block" />
            수술 후에도 철저한 혈당 조절이 함께 이루어져야 좋은 경과를 기대할 수 있습니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>
    </SubLayout>
  );
}

