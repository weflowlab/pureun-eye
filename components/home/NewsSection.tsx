import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { getNewsList } from "@/lib/news";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./NewsSection.module.css";

// 공지사항 최신 3건
const NEWS = getNewsList().slice(0, 3);

/** 푸른안과 소식(공지사항): 공통 머리(전체보기) + 최신 3건 카드 */
export default function NewsSection() {
  // 전체보기: PC는 머리 우측, 폰은 카드 아래 가운데
  const moreBtn = (
    <Link href="/community/notice" className={`${home.btn} ${home.btnGhost}`}>
      공지사항 전체보기 <span aria-hidden="true">→</span>
    </Link>
  );

  return (
    <HomeSection tone="tint">
      <Inner>
        <HomeHead
          eyebrow="NEWS"
          title={
            <>
              {SITE.name} <b>새소식</b>
            </>
          }
          sub="진료 일정과 병원 소식을 안내해 드립니다."
          action={moreBtn}
          actionClassName={home.pcOnly}
        />

        <ul className={styles.list}>
          {NEWS.map((n, i) => (
            <li key={n.id} suppressHydrationWarning data-aos="fade-up" data-aos-delay={String(100 * i)}>
              <Link href={`/community/notice/${n.id}`} className={`${home.card} ${home.cardLift} ${styles.item}`}>
                <div className={styles.thumb}>
                  <Placeholder label={n.title} />
                </div>
                <div className={styles.body}>
                  <p className={styles.date}>{n.date}</p>
                  <p className={styles.title}>{n.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className={home.moOnly}>{moreBtn}</div>
      </Inner>
    </HomeSection>
  );
}
