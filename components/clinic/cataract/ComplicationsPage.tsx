import ContentBlock from "@/components/diseases/common/ContentBlock";
import { BadgeBox, BadgeItem } from "@/components/diseases/common/BadgeBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SubLayout from "@/components/sub/SubLayout";
import { EquipCard, Notice, Section } from "./parts";
import styles from "./cataract.module.css";

// 수술 후 발생할 수 있는 합병증
const COMPLICATIONS = ["안구내염", "동공 편위", "녹내장(안압 상승)", "망막박리", "각막부종", "낭포황반부종", "전방출혈", "유리체출혈", "후낭혼탁(후발성 백내장)"];

/** 백내장 — 백내장 수술 후 합병증 */
export default function ComplicationsPage() {
  return (
    <SubLayout
      path="/cataract/complications"
      description={
        <>
          드물지만 생길 수 있는 합병증, <br className="pc_block" />
          미리 알고 정기 검진으로 살핍니다.
        </>
      }
    >
      {/* 합병증 개요 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="백내장 수술 후 합병증" bottom={<Tags />}>
          백내장 수술은 안전성이 높은 수술이지만,
          <br className="pc_block" />
          수술 후 아래와 같은 합병증이 드물게 생길 수 있습니다.
        </VerticalInfoBox>

        {/* 주요 합병증 */}
        <BadgeBox heading="꼭 알아두어야 할 합병증">
          <BadgeItem badge="안구내염 (눈속염)">
            세균 감염으로 생기며 심한 시력 저하를 일으킬 수 있습니다.
            <br className="pc_block" />
            발생 빈도는 1,000건당 약 2~4건으로 드문 편이지만, 수술 후 안약 사용과 위생 수칙을 꼭 지켜야 합니다.
          </BadgeItem>
          <BadgeItem badge="후낭혼탁 (후발성 백내장)">
            인공수정체를 받치는 뒤쪽 막(후낭)이 뿌옇게 흐려지는 현상입니다.
            <br className="pc_block" />
            소아에게 흔하고, 성인은 수술 후 3~5년이 지나면 약 30~50%에서 나타날 수 있습니다.
          </BadgeItem>
          <BadgeItem badge="야간 빛 번짐 · 달무리">
            인공수정체 종류에 따라 수술 후 밤에 빛 번짐이나 달무리가 보일 수 있습니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 후발성 백내장 치료 */}
      <ContentBlock tone="gray">
        <Section
          first
          en="YAG LASER"
          title="후발성 백내장은 레이저로 치료합니다"
          sub={
            <>
              시력이 떨어지거나 안저 검사가 어려울 때, 한 눈으로 봐도 겹쳐 보일 때(단안 복시)는
              <br className="pc_block" />
              YAG 레이저로 흐려진 후낭에 작은 구멍을 내어 시야를 맑게 하는 치료를 시행합니다.
            </>
          }
        >
          <div className={styles.equipSingle}>
            <EquipCard model="Ellex Ultra Q Nd-YAG laser">
              흐려진 후낭을 치료하는 YAG 레이저 장비입니다.
            </EquipCard>
          </div>
          <Notice title="정기 검진이 가장 좋은 예방입니다">
            수술 후 갑자기 눈이 아프거나 충혈이 심해지고 시력이 떨어진다면 예약일과 관계없이 바로 내원해 주세요.
          </Notice>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}

/** 합병증 이름 태그 목록 */
function Tags() {
  return (
    <ul className={styles.tags} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      {COMPLICATIONS.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
