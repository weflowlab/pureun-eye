import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import RetinaEquipList from "./RetinaEquipList";
import SectionHead from "./SectionHead";
import { DOCTORS } from "@/lib/doctors";
import styles from "./retina.module.css";

// 연혁 (기존 홈페이지 C1000·C2000 기준)
const HISTORY = [
  { year: "2001", month: "12", title: "푸른안과 개원", desc: "개원과 함께 망막 수술 진료를 시작했습니다." },
  { year: "2002", month: "05", title: "광역학치료 시행", desc: "황반변성 치료법인 광역학치료를 도입했습니다." },
  { year: "2013", month: "07", title: "망막 전문 클리닉 운영", desc: "망막 전문의 3인 체제로 망막 전문 클리닉을 운영하고, 수술·검사 장비를 새로 갖추었습니다." },
  { year: "2015", month: "03", title: "망막클리닉 BOIM 확장 오픈", desc: "4층으로 공간을 넓히고 4인 의료진 체제의 BOIM 클리닉을 열었습니다." },
];

// 주요 치료 질환 (망막클리닉 하위 탭)
const FOCUS = [
  { title: "비문증", desc: "갑자기 늘어난 비문증은 망막열공의 신호일 수 있어 망막 주변부까지 확인합니다.", href: "/retina/floaters" },
  { title: "망막박리", desc: "망막이 떨어지는 응급 질환으로, 빠른 진단과 수술이 시력을 지킵니다.", href: "/retina/detachment" },
  { title: "망막혈관질환", desc: "망막 혈관이 막혀 생긴 부종과 출혈을 주사·레이저로 치료합니다.", href: "/retina/vascular" },
  { title: "포도막염", desc: "눈 속 염증을 빠르게 가라앉히고 재발과 합병증을 관리합니다.", href: "/retina/uveitis" },
  { title: "당뇨망막병증", desc: "당뇨로 손상된 망막 혈관을 단계별로 치료하고 정기적으로 관리합니다.", href: "/retina/diabetic" },
  { title: "황반변성", desc: "중심 시력을 담당하는 황반을 정밀 검사와 꾸준한 치료로 지켜갑니다.", href: "/retina/macular" },
];

// 망막클리닉 의료진 (lib/doctors.ts 공통 데이터, 사진은 추후 교체)
const RETINA_DOCTORS = DOCTORS.filter((d) => d.clinic === "retina");

/** 망막클리닉 보임 소개 페이지 */
export default function BoimPage() {
  return (
    <SubLayout
      path="/retina/boim"
      description={
        <>
          잘 보이는 것은 더 좋은 삶의 질을 의미합니다. <br className="pc_block" />
          망막 질환, BOIM이 함께합니다.
        </>
      }
    >
      {/* 클리닉 소개 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="망막클리닉 BOIM" bottom={<BoimImage />}>
          <span className="cr fw500">
            망막 질환으로 불편을 겪는 환자분들께 BOIM이 든든한 버팀목이 되겠습니다.
          </span>
          <br />
          <br />
          푸른안과는 2001년 개원 이래 전북 지역 망막 환자 진료에 힘써 왔습니다.
          <br className="pc_block" />
          BOIM은 매년 400례 이상의 망막 수술을 시행하며, 치료 시기를 놓치면 시력을 잃을 수 있는
          <br className="pc_block" />
          중증 망막 질환을 가까운 곳에서 진료받으실 수 있도록 노력하고 있습니다.
        </VerticalInfoBox>

        {/* 연혁 타임라인 */}
        <SectionHead title="BOIM이 걸어온 길" sub="개원 때부터 이어온 망막 진료의 발자취입니다." />
        <div className={`${styles.secBody} ${styles.timeline}`}>
          {HISTORY.map((h, i) => (
            <div key={h.year} className={styles.tlItem} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.tlYear}>
                {h.year}
                <span className={styles.tlMonth}>.{h.month}</span>
              </p>
              <p className={styles.tlTitle}>{h.title}</p>
              <p className={styles.tlDesc}>{h.desc}</p>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 안내 띠 */}
      <ImgTxtBox
        label="망막클리닉 BOIM 배경"
        badge="망막클리닉 BOIM"
        lead={
          <>
            실명으로 이어질 수 있는 망막 질환,
            <br className="pc_block" />
            조기 진단과 적절한 치료가 시력을 지킵니다.
          </>
        }
      />

      {/* 주요 치료 질환 */}
      <ContentBlock tone="gray">
        <SectionHead first title="주요 치료 질환" sub="치료하지 않으면 시력을 잃을 수 있는 중증 망막 질환을 진료합니다." />
        <div className={`${styles.secBody} ${styles.cardGrid}`}>
          {FOCUS.map((f, i) => (
            <Link key={f.title} href={f.href} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.cardTitle}>{f.title}</p>
              <p className={styles.cardDesc}>{f.desc}</p>
              <p className={styles.cardMore}>자세히 보기 →</p>
            </Link>
          ))}
        </div>
      </ContentBlock>

      {/* 의료진 */}
      <ContentBlock>
        <SectionHead first title="망막클리닉 의료진" sub="망막 전문 의료진이 진단부터 수술, 경과 관찰까지 함께합니다." />
        <div className={`${styles.secBody} ${styles.doctorGrid}`}>
          {RETINA_DOCTORS.map((d, i) => (
            <div key={d.slug} className={styles.doctor} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <div className={styles.doctorPhoto}>
                <Placeholder label={`${d.name} ${d.title}`} aspectRatio="3 / 4" />
              </div>
              <p className={styles.doctorRole}>{d.title}</p>
              <p className={styles.doctorName}>{d.name}</p>
              <p className={styles.doctorFields}>{d.specialties.join(", ")}</p>
              {d.reservationOnly && <p className={styles.doctorNote}>예약 진료만 가능</p>}
              <Link href={`/about/doctors#${d.slug}`} className={styles.doctorLink}>
                자세히 보기
              </Link>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 장비 (검사 · 레이저 · 수술) */}
      <RetinaEquipList />
    </SubLayout>
  );
}

/** 소개 박스 하단 클리닉 전경 이미지 */
function BoimImage() {
  return (
    <div className={styles.introImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <Placeholder label="망막클리닉 BOIM 전경" aspectRatio="16 / 7" />
    </div>
  );
}
