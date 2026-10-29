import type { ReactNode } from "react";

type Item = { title: string; desc?: ReactNode };

/**
 * 질환 페이지 원고 — 모든 섹션은 선택. 있는 섹션만 아래 순서로 그려짐:
 * 소개 → 정의 → 원인 → 증상 → 진단 → 치료 → 비교표 → 추가 섹션 → 증례 → 신뢰 포인트 → FAQ
 */
export type Disease = {
  path: string;
  /** 망막·백내장 클리닉 구분 (신뢰 포인트 문구) */
  clinic: "retina" | "cataract";
  /** 상단 배너 설명 */
  description: ReactNode;
  intro: { title: ReactNode; body: ReactNode; image: string };
  definition?: {
    title: string;
    body: ReactNode;
    figures?: { label: string; title: string; desc?: ReactNode }[];
  };
  causes?: { title: string; sub?: ReactNode; items: Item[] };
  symptoms?: { title: string; sub?: ReactNode; items: Item[] };
  /** 단계 흐름 (기본 라벨 DIAGNOSIS — 수술 과정 등에 쓰면 eyebrow 지정) */
  diagnosis?: {
    eyebrow?: string;
    title: string;
    sub?: ReactNode;
    steps: Item[];
  };
  treatment?: {
    title: string;
    sub?: ReactNode;
    items: (Item & { image?: string })[];
    note?: ReactNode;
  };
  compare?: {
    title: string;
    sub?: ReactNode;
    head: string[];
    rows: string[][];
  };
  /** 예방법·자가진단처럼 페이지마다 다른 섹션 */
  extras?: {
    eyebrow: string;
    title: string;
    sub?: ReactNode;
    body?: ReactNode;
    image?: string;
    items?: Item[];
  }[];
  /** 증례 사진 자리 (환자 동의를 받은 실제 사진으로 교체) */
  cases?: { title: string; sub?: ReactNode; images: string[] };
  faq: { q: string; a: ReactNode }[];
};
