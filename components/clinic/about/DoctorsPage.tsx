import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import DoctorList from "./DoctorList";

/** 병원소개 — 의료진소개 (기존 홈페이지 A2100 기준) */
export default function DoctorsPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        <SectionHead
          first
          title="푸른안과 잘되는 이유"
          sub={
            <>
              많은 수술을 하기보다는 <br className="mo_block" />
              수술 후의 관리까지 고려하여 안전한 수술을 합니다.
            </>
          }
        />
        <DoctorList />
      </ContentBlock>
    </SubLayout>
  );
}
