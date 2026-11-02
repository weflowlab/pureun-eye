import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { VALUES } from "@/components/common/philosophy";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./PhilosophySection.module.css";

// "\n"을 줄바꿈으로
const lines = (text: string) =>
  text.split("\n").map((line, j, arr) => (
    <span key={j}>
      {line}
      {j < arr.length - 1 && <br />}
    </span>
  ));

/** 진료이념 소개: 슬로건 + 병원 전경 + 진료이념 4가지 카드 */
export default function PhilosophySection() {
  return (
    <HomeSection tone="tint">
      <Inner>
        <HomeHead
          eyebrow="PHILOSOPHY"
          align="center"
          title="“See more, Do more”"
          sub={
            <>
              {SITE.name}는 {SITE.since}년 개원 이래 <b>‘안전함’</b>을 추구해 왔습니다.{" "}
              <br />
              많은 수술보다, 수술 후의 관리까지 고려한 <br className={home.moBr} />
              안전한 수술을 합니다.
            </>
          }
        />

        <div className={styles.clinicImg} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
          <Placeholder label="병원 전경 이미지" aspectRatio="1210 / 520" />
        </div>

        {/* 진료이념 4가지 (0.1초 간격 순차 등장) */}
        <ul className={styles.values}>
          {VALUES.map((v, i) => (
            <li key={v.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={String(100 * i)}>
              <div className={`${home.card} ${home.cardLift} ${styles.value}`}>
                <span className={styles.icon}>{v.icon}</span>
                <p className={styles.valueTitle}>{v.title}</p>
                <p className={styles.valueDesc}>
                  {/* PC와 폰의 줄바꿈 위치가 다를 수 있어 두 벌을 두고 화면 폭으로 고름 */}
                  <span className={styles.pcTxt}>{lines(v.short)}</span>
                  <span className={styles.moTxt}>{lines(v.shortMo ?? v.short)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.more} suppressHydrationWarning data-aos="fade-up">
          <Link href="/about/intro" className={`${home.btn} ${home.btnGhost}`}>
            {SITE.name} 자세히 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Inner>
    </HomeSection>
  );
}
