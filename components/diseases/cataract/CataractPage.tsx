import Link from "next/link";
import { CheckList, Notice, Section } from "@/components/clinic/cataract/parts";
import clinic from "@/components/clinic/cataract/cataract.module.css";
import ContentBlock from "../common/ContentBlock";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import styles from "./cataract.module.css";

// 백내장 원인
const CAUSES: [string, string][] = [
  ["노화", "대부분 나이가 들면서 생깁니다."],
  ["자외선", "자외선에 과다하게 노출된 경우"],
  ["외상", "눈을 다친 뒤에 생기는 경우"],
  ["당뇨", "당뇨로 인해 생기는 경우"],
];

// 다른 백내장 페이지 안내
const LINKS: [string, string, string][] = [
  ["/cataract/choice", "백내장 수술 선택 방법", "수술 과정과 나에게 맞는 수술 고르기"],
  ["/cataract/premium", "프리미엄 백내장 수술", "다초점 인공수정체와 렌즈 종류"],
  ["/cataract/complications", "백내장 수술 후 합병증", "수술 후 알아두어야 할 합병증"],
];

/** 백내장 — 백내장이란 */
export default function CataractPage() {
  return (
    <SubLayout
      path="/cataract/about"
      description={
        <>
          눈 속 렌즈가 흐려지는 질환, <br className="pc_block" />
          백내장을 먼저 이해합니다.
        </>
      }
    >
      {/* 정의 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="수정체가 투명함을 잃고 혼탁해진 질환" imageLabel="백내장 수정체 혼탁">
          백내장은 눈 속 수정체가 투명함을 잃고 뿌옇게 흐려지는 질환입니다.
          <br className="pc_block" />
          흐려진 수정체가 바깥의 빛을 망막까지 제대로 통과시키지 못해
          <br className="pc_block" />
          시력이 떨어지게 됩니다.
        </InfoBox>

        {/* 원인 */}
        <Section en="CAUSE" title="백내장은 왜 생기나요" sub="보통은 나이가 들면서 생기지만, 다른 원인으로 생기기도 합니다.">
          <ul className={styles.causes}>
            {CAUSES.map(([name, desc], i) => (
              <li key={name} className={styles.cause} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.causeName}>{name}</p>
                <p className={styles.causeDesc}>{desc}</p>
              </li>
            ))}
          </ul>
        </Section>
      </ContentBlock>

      {/* 진행 단계 */}
      <ContentBlock tone="gray">
        <Section
          first
          en="PROGRESS"
          title="백내장은 보통 서서히 진행합니다"
          sub="진행 정도에 따라 경과 관찰부터 수술까지 치료 방법이 달라집니다."
        >
          <div className={clinic.compare}>
            <div className={clinic.compareCard} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
              <p className={clinic.compareTag}>EARLY</p>
              <p className={clinic.compareTitle}>초기 백내장</p>
              <p className={clinic.compareDesc}>대개 시력이 크게 떨어지지 않습니다.</p>
              <CheckList
                items={["눈이 침침하거나 눈부심을 느낄 수 있습니다.", "진행을 늦추기 위한 점안제를 쓰거나, 특별한 치료 없이 경과를 관찰합니다."]}
              />
            </div>
            <div className={`${clinic.compareCard} ${clinic.on}`} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
              <p className={clinic.compareTag}>ADVANCED</p>
              <p className={clinic.compareTitle}>중기 이후 백내장</p>
              <p className={clinic.compareDesc}>시력이 중등도로 떨어집니다.</p>
              <CheckList
                items={["그대로 두면 여러 합병증이 생길 수 있습니다.", "이 시기에는 수술 치료를 권합니다."]}
              />
            </div>
          </div>

          {/* 추가 문구: 원문에 없는 검진 안내 */}
          <Notice title="흐림·눈부심이 느껴진다면">
            백내장은 서서히 진행해 변화를 알아차리기 어려울 수 있습니다.
            <br className="pc_block" />
            시야가 침침하거나 눈부심이 계속된다면 안과 검진으로 진행 정도를 확인해 보세요.
          </Notice>
        </Section>
      </ContentBlock>

      {/* 관련 페이지 */}
      <ContentBlock>
        <Section first en="MORE" title="백내장 수술, 더 알아보기">
          <ul className={styles.links}>
            {LINKS.map(([href, title, desc], i) => (
              <li key={href} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <Link href={href} className={styles.link}>
                  <span className={styles.linkTitle}>{title}</span>
                  <span className={styles.linkDesc}>{desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}
