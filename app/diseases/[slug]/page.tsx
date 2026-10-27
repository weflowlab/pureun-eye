import { Suspense, type ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import { DISEASES, SITE, type DiseaseSlug } from "@/lib/site";
import CataractPage from "@/components/diseases/cataract/CataractPage";
import ChildPage from "@/components/diseases/child/ChildPage";
import CircularPage from "@/components/diseases/circular/CircularPage";
import DetachmentPage from "@/components/diseases/detachment/DetachmentPage";
import DiabeticPage from "@/components/diseases/diabetic/DiabeticPage";
import GrowthPage from "@/components/diseases/growth/GrowthPage";
import MacularPage from "@/components/diseases/macular/MacularPage";
import MembranePage from "@/components/diseases/membrane/MembranePage";
import ObstructionPage from "@/components/diseases/obstruction/ObstructionPage";
import VitreousPage from "@/components/diseases/vitreous/VitreousPage";
import XerophthalmiaPage from "@/components/diseases/xerophthalmia/XerophthalmiaPage";

// 슬러그 → 페이지 컴포넌트
const PAGES: Record<DiseaseSlug, ComponentType> = {
  diabetic: DiabeticPage,
  macular: MacularPage,
  obstruction: ObstructionPage,
  membrane: MembranePage,
  vitreous: VitreousPage,
  circular: CircularPage,
  growth: GrowthPage,
  detachment: DetachmentPage,
  cataract: CataractPage,
  child: ChildPage,
  xerophthalmia: XerophthalmiaPage,
};

// 동적 세그먼트 params (Promise)
type Props = { params: Promise<{ slug: string }> };

const findDisease = (slug: string) => DISEASES.find((d) => d.slug === slug);

// 11개 질환 페이지 정적 생성
export function generateStaticParams() {
  return DISEASES.map(({ slug }) => ({ slug }));
}

// 탭 제목: "질환명 | 병원명"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const disease = findDisease(slug);
  if (!disease) return {};
  return {
    title: `${disease.name} | ${SITE.name}`,
    description: `${SITE.name} ${disease.name} 진료 안내`,
  };
}

/** 질환 상세 페이지 (/diseases/[slug]) — params 읽기는 Suspense 안에서 (즉시 내비게이션) */
export default function DiseasePage({ params }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <DiseaseContent params={params} />
    </Suspense>
  );
}

// 슬러그에 맞는 질환 페이지 렌더
async function DiseaseContent({ params }: Props) {
  const { slug } = await params;
  const disease = findDisease(slug);
  if (!disease) notFound();

  const Page = PAGES[disease.slug];
  return <Page />;
}
