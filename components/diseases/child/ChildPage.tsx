import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import QnaCard from "../common/QnaCard";
import SectionTitle from "../common/SectionTitle";
import styles from "./child.module.css";

// 근시 진행 완화 방법 비교표
const TABLE: [string, string, string, string][] = [
  ["각막 굴절 교정 렌즈", "(드림렌즈)", "약 40%", "잠자는 동안 착용해 각막 모양을 일시적으로 교정하는 렌즈"],
  ["저농도 아트로핀", "(점안액)", "약 60%", "매일 밤 점안하는 방식으로, 눈부심 등 부작용 여부를 함께 관찰"],
  ["근시 완화 안경렌즈", "(디포커스 렌즈)", "약 60%", "중심부는 선명하게, 주변부는 근시 진행 신호를 줄이도록 설계된 안경렌즈"],
  ["근시 완화 콘택트렌즈", "(소프트렌즈)", "약 60%", "낮 동안 착용하는 일회용 렌즈로 시력 교정과 근시 억제를 함께"],
];

/** 소아근시억제 페이지 */
export default function ChildPage() {
  return (
    <DiseaseLayout
      title="소아근시 억제"
      description={
        <>
          어린 시기의 근시 관리는 <br className="pc_block" />
          고도근시와 각종 망막 질환을 예방하는 첫걸음입니다.
        </>
      }
    >
      <ContentBlock>
        <SectionTitle />

        {/* 치료 전략 */}
        <BadgeBox heading="어린이 근시 억제 치료 전략" spacing="md">
          <BadgeItem
            badge="Myopia Control"
            after={
              <div className={styles.strategyImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                <Placeholder label="근시 진행 그래프" aspectRatio="16 / 7" />
              </div>
            }
          >
            심한 근시는 성인이 된 뒤 망막박리, 녹내장 등 여러 눈 질환의 위험을 높입니다.
            <br className="pc_block" />
            성장기에 근시 진행을 늦추면 고도근시로 이어질 가능성을 줄일 수 있습니다.
          </BadgeItem>
        </BadgeBox>

        {/* 01. 근시 억제 소프트렌즈 */}
        <div className={`${styles.qnaBbx} ${styles.qnaBbxMt}`}>
          <QnaCard title="01. 근시 억제 소프트렌즈" inset>
            <div className={styles.oneContTbx}>
              <p className={styles.oneContTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                (일회용 소프트렌즈)
                <br />
                근시를 교정하면서 동시에 진행을 늦추는 관리용 렌즈입니다.
              </p>
              <ContImg label="소프트렌즈 구조" />
              <p className={styles.oneContTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                시력을 교정하는 영역과 근시 진행 신호를 줄이는 영역이 함께 설계되어,
                <br className="pc_block" />
                <span className="fwb">안경 없이도 또렷한 시야를 확보</span>할 수 있습니다.
              </p>
              <div className={styles.line} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" />
              {/* 효과 2가지 + 플러스 아이콘 */}
              <div className={styles.plusFbx}>
                <PlusItem label="시력 교정 효과" />
                <span className={styles.plus} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" aria-hidden>
                  +
                </span>
                <PlusItem label="근시 진행 완화" />
              </div>
              <p className={styles.oneContTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                <span className="fwb">낮 동안 착용하는 렌즈로 착용 즉시 시력이 교정됩니다.</span>
                <br className="pc_block" />
                정기 검진 때마다 눈 상태에 맞춰 도수를 조정해 처방합니다.
              </p>
            </div>
          </QnaCard>
        </div>

        {/* 02. 근시 억제 안경렌즈 */}
        <div className={styles.qnaBbx}>
          <QnaCard title="02. 근시 억제 안경렌즈" inset>
            <div className={styles.oneContTbx}>
              <p className={styles.oneContTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                렌즈 주변부에 미세한 영역을 고르게 배치해 근시 진행을 억제하는 안경렌즈입니다.
              </p>
              <ContImg label="안경렌즈 구조" />
              <p className={`${styles.oneContTxt} ${styles.oneContTxtMt}`} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                중심부는 선명한 시야를, 주변부는 근시 억제를 담당합니다.
                <br className="pc_block" />
                충격에 강한 소재라 활동량이 많은 아이도 안심하고 착용할 수 있습니다.
              </p>
            </div>
          </QnaCard>
        </div>

        {/* 03. 점안액 */}
        <div className={styles.titBar} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          03. 저농도 아트로핀 점안액
        </div>
        <div className={styles.subFbx}>
          <div className={styles.subImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            <Placeholder label="점안액" aspectRatio="4 / 3" />
          </div>
          <div className={styles.subFbxFbx}>
            <p className={styles.subFbxTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              {SITE.name}는 <span className="fwb">아이의 성향과 눈 상태에 맞춰 아래 방법을 선택</span>하여
              <br className="pc_block" />
              근시 진행을 효과적으로 관리합니다.
            </p>
            <div className={styles.subFbxLine} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" />
            <ul className={styles.subFbxUl} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <li>근시 억제 소프트렌즈</li>
              <li>근시 억제 안경렌즈</li>
              <li>저농도 아트로핀 점안액</li>
            </ul>
          </div>
        </div>

        {/* 비교표 (모바일 가로 스크롤) */}
        <div className={styles.mXScroll} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>근시 진행 완화 방법</th>
                <th>진행 완화율</th>
                <th>특징</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map(([name, sub, rate, desc]) => (
                <tr key={name}>
                  <td>
                    {name}
                    <br />
                    {sub}
                  </td>
                  <td>{rate}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentBlock>
    </DiseaseLayout>
  );
}

/** 카드 내부 둥근 이미지 */
function ContImg({ label }: { label: string }) {
  return (
    <div className={styles.oneContImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <Placeholder label={label} aspectRatio="16 / 7" />
    </div>
  );
}

/** 효과 아이콘 + 라벨 */
function PlusItem({ label }: { label: string }) {
  return (
    <div className={styles.plusItem} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <div className={styles.plusImg}>
        <Placeholder label={label} aspectRatio="1 / 1" />
      </div>
      <p>{label}</p>
    </div>
  );
}
