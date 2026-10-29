import Link from "next/link";
import type { ReactNode } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import { HOURS, SITE } from "@/lib/site";
import styles from "./community.module.css";

type Faq = { q: string; a: ReactNode; link?: { href: string; label: string } };

// 자주묻는질문 — 기존 원고·작성된 진료 페이지 내용 기반 (병원 검토 필요)
const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "진료 · 예약",
    items: [
      {
        q: "진료시간이 어떻게 되나요?",
        a: (
          <>
            {HOURS.weekday.label} {HOURS.weekday.time}, {HOURS.saturday.label} {HOURS.saturday.time}입니다.
          </>
        ),
        link: { href: "/about/location", label: "오시는 길 · 진료시간" },
      },
      {
        q: "전화로 접수할 수 있나요?",
        a: <>전화 접수는 받지 않습니다. 대기자가 많을 경우 접수가 조기 마감될 수 있으니 여유 있게 내원해 주세요.</>,
      },
      {
        q: "원하는 원장님께 진료받을 수 있나요?",
        a: <>의료진소개에서 원장님별 진료 요일과 시간을 확인하실 수 있습니다. 일부 원장님은 예약 진료만 가능합니다.</>,
        link: { href: "/about/doctors", label: "의료진소개" },
      },
      {
        q: "주차할 수 있나요?",
        a: <>병원 건물 뒤편에 대형 주차장이 있습니다.</>,
        link: { href: "/about/location", label: "오시는 길" },
      },
      {
        q: "상담은 어떻게 신청하나요?",
        a: (
          <>
            온라인 상담, 카카오톡 상담, 전화(대표 {SITE.tel} / 라식상담 {SITE.lasikTel})로 문의하실 수 있습니다.
          </>
        ),
        link: { href: "/contact/online", label: "온라인 상담" },
      },
    ],
  },
  {
    title: "시력교정",
    items: [
      {
        q: "수술 전 검사는 어떤 것을 하나요?",
        a: <>시력·굴절, 각막, 안구 구조, 망막·시신경 등 33가지 검사를 진행합니다. 망막 검사는 망막클리닉 보임에서 함께 확인합니다.</>,
        link: { href: "/vision/pre-care", label: "수술 전 진료 시스템" },
      },
      {
        q: "라식 · 라섹 · 스마일 중 어떤 수술이 맞나요?",
        a: <>각막 두께, 시력, 생활 환경에 따라 적합한 수술이 다릅니다. 검사 결과를 바탕으로 의료진과 상의해 결정합니다.</>,
        link: { href: "/vision/fact-check", label: "FACT CHECK" },
      },
      {
        q: "검사 당일 수술도 가능한가요?",
        a: <>안전을 위해 검사와 수술은 같은 날 진행하지 않습니다.</>,
        link: { href: "/vision/post-care", label: "수술 후의 관리 시스템" },
      },
    ],
  },
  {
    title: "백내장",
    items: [
      {
        q: "백내장은 언제 수술해야 하나요?",
        a: <>초기에는 경과를 관찰하기도 하지만, 시력이 떨어져 일상생활이 불편해지면 수술 치료를 권합니다.</>,
        link: { href: "/cataract/about", label: "백내장" },
      },
      {
        q: "다초점 인공수정체는 누구나 할 수 있나요?",
        a: <>눈 상태와 생활 방식에 따라 권하지 않는 경우도 있습니다. 정밀 검사 후 의료진과 상의해 결정합니다.</>,
        link: { href: "/cataract/about", label: "인공수정체 선택" },
      },
    ],
  },
  {
    title: "망막",
    items: [
      {
        q: "당뇨가 있으면 눈 검사를 받아야 하나요?",
        a: <>눈에 불편함이 없더라도 정기적으로 안저검사를 받아 망막 상태를 확인하는 것이 좋습니다.</>,
        link: { href: "/retina/diabetic", label: "당뇨망막병증" },
      },
      {
        q: "날파리 같은 것이 보이는데 치료해야 하나요?",
        a: <>비문증은 경과를 지켜보는 경우가 많지만, 갑자기 많아지거나 번쩍임이 함께 보이면 바로 검사를 받으세요.</>,
        link: { href: "/retina/floaters", label: "비문증" },
      },
    ],
  },
];

/** 자주묻는질문: 분류별 아코디언 (details/summary — JS 없이 동작) */
export default function FaqPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        {FAQ_GROUPS.map((g, gi) => (
          <div key={g.title}>
            <SectionHead title={g.title} first={gi === 0} />
            <div className={styles.faqList}>
              {g.items.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>
                    <span className={styles.faqMark}>Q</span>
                    {item.q}
                  </summary>
                  <div className={styles.faqA}>
                    <span className={styles.faqMark}>A</span>
                    <div>
                      <p>{item.a}</p>
                      {item.link && (
                        <Link href={item.link.href} className={styles.faqLink}>
                          {item.link.label} 자세히 보기 →
                        </Link>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </ContentBlock>
    </SubLayout>
  );
}
