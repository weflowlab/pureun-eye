import SubLayout from "@/components/sub/SubLayout";
import EquipPhoto from "../common/EquipPhoto";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import ImgTxtBox from "../common/ImgTxtBox";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import SymptomGrid from "../common/SymptomGrid";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./detachment.module.css";

/** 망막박리 페이지 */
export default function DetachmentPage() {
  return (
    <SubLayout
      path="/retina/detachment"
      description={
        <>
          망막이 안구 내벽에서 떨어지는 <br className="pc_block" />
          대표적인 안과 응급질환
        </>
      }
    >
      {/* 정의 · 원인 · 증상 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="열공성 망막박리" images={["정상 망막", "망막박리"]}>
          망막이 안구 내벽에서 일부 또는 전부 떨어지는 질환입니다.
          <br className="pc_block" />
          오래 방치하면 실명으로 이어질 수 있어, 빠르게 수술로 망막을 다시 붙여야
          <br className="pc_block" />
          시력 회복을 기대할 수 있는 <span className="fwb">대표적인 안과 응급질환</span>입니다.
        </VerticalInfoBox>

        <InfoBox title="망막박리의 원인" imageLabel="후유리체박리 · 망막열공">
          <span className="cr fw500">
            유리체 견인 → 망막열공 → 망막 아래로 액체 유입
            <br />
            <br />
          </span>
          나이가 들면 유리체가 망막에서 떨어지는 <span className="fwb">후유리체박리</span>가 자연스럽게 생기며,
          <br className="pc_block" />
          대부분은 눈에 손상을 주지 않습니다.
          <br />
          <br />
          다만 유리체와 망막이 강하게 붙어 있는 경우 그 부위가 당겨지며 망막이 찢어질 수 있고,
          <br className="pc_block" />
          찢어진 틈으로 액화된 유리체가 들어가면 망막박리가 생깁니다.
        </InfoBox>

        <SymptomGrid
          title="망막박리 증상"
          subtitle={
            <>
              박리가 시작되기 전 <span className="fwb">비문증과 광시증</span>을 먼저 느끼는 경우가 많습니다.
            </>
          }
          items={[
            <>
              눈앞에 무언가 떠다니는
              <br />
              비문증
            </>,
            <>
              눈 안에서 번쩍거리는
              <br />
              광시증
            </>,
            <>
              검은 장막이 쳐진 듯
              <br />
              시야 일부가 가려짐
            </>,
            <>
              중심부까지 진행하면
              <br />
              급격한 시력 저하
            </>,
          ]}
        />
      </ContentBlock>

      {/* 응급 진료 안내 띠 */}
      <ImgTxtBox
        label="망막박리 안내 배경"
        badge="이런 증상이 있다면"
        lead={
          <>
            갑자기 비문증·광시증이 생기거나 시야 일부가 가려 보이면
            <br className="pc_block" />
            지체하지 말고 안과 진료를 받으세요.
          </>
        }
      />

      {/* 정밀 검사 · 수술 */}
      <ContentBlock>
        <InfoBox title="망막 정밀 검사" image={<EquipPhoto model="Optos Daytona" />}>
          망막열공과 박리는 망막 주변부에서 시작되는 경우가 많습니다.
          <br className="pc_block" />
          초광각 안저촬영으로 망막을 넓게 촬영해
          <br className="pc_block" />
          열공의 위치와 박리 범위를 확인합니다.
        </InfoBox>

        <BadgeBox heading="망막박리 수술">
          <BadgeItem
            badge={
              <>
                01 <span className="fwb">공막돌륭술</span>
              </>
            }
          >
            안구 바깥에 실리콘 스펀지나 밴드를 대어 열공 부위를 눌러주는 수술입니다.
            <br className="pc_block" />
            열공이 막히면 망막 아래 고여 있던 액체가 저절로 흡수되면서 망막이 제자리에 다시 붙습니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                02 <span className="fwb">유리체 절제술</span>
              </>
            }
            media={<EquipPhoto model="Constellation" className={styles.treatImg} />}
          >
            안구에 작은 구멍을 만들어 유리체를 제거하고 망막을 제자리에 다시 붙이는 수술입니다.
            <br className="pc_block" />
            수술 중 안구 안에 공기나 가스를 넣으며, 망막이 잘 붙도록 수술 후 <span className="fwb">엎드린 자세</span>를 유지해야 합니다.
            <br className="pc_block" />
            공기나 가스가 남아 있는 동안은 잘 보이지 않다가, 흡수되면서 시력이 돌아옵니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>
    </SubLayout>
  );
}

