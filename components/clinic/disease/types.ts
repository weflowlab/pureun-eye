import type { ReactNode } from "react";

type Item = { title: string; desc?: ReactNode };

/**
 * 질환 페이지 원고 — 모든 섹션은 선택. 있는 섹션만 아래 순서로 그려짐:
 * 소개 → 정의 → 증상 → 원인 → 진단 → 수술 과정 → 치료 → 비교표 → 추가 섹션 → 증례 → 신뢰 포인트 → FAQ
 * 제목·질문의 *별표* 부분은 강조 (제목은 굵게, FAQ 질문은 하늘색)
 */
export type Disease = {
  path: string;
  /** 망막·백내장 클리닉 구분 (신뢰 포인트 문구) */
  clinic: "retina" | "cataract";
  /** 상단 배너 설명 */
  description: ReactNode;
  /** 소개: 왼쪽 두 줄 제목(둘째 줄 강조) · 오른쪽 문단 · 아래 비교 이미지 2장 */
  intro: { line1: string; line2: string; paragraphs: ReactNode[]; images: [string, string] };
  definition?: { title: string; body: ReactNode; figures?: { label: string; title: string; desc?: ReactNode }[] };
  symptoms?: { title: string; sub?: ReactNode; items: Item[] };
  causes?: { title: string; sub?: ReactNode; items: Item[] };
  /** 진단 단계 — 파란 배경 위에 카드가 차례로 쌓임 */
  diagnosis?: { title: string; sub?: ReactNode; steps: Item[] };
  /** 수술 과정 — 왼쪽 사진 고정, 오른쪽 단계가 스크롤에 따라 켜짐 */
  process?: { title: string; sub?: ReactNode; steps: Item[] };
  treatment?: { title: string; sub?: ReactNode; items: (Item & { image?: string })[]; note?: ReactNode };
  /** 비교표 — highlight: 강조할 열 번호(1부터, 머리 열 제외) */
  compare?: { title: string; sub?: ReactNode; head: string[]; rows: string[][]; highlight?: number };
  /** 예방법·자가진단처럼 페이지마다 다른 섹션 */
  extras?: { title: string; sub?: ReactNode; body?: ReactNode; image?: string; items?: Item[] }[];
  /** 증례 사진 자리 (환자 동의를 받은 실제 사진으로 교체) */
  cases?: { title: string; sub?: ReactNode; images: string[] };
  faq: { q: string; a: ReactNode }[];
};
