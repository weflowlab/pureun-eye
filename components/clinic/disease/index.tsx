import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import DiseaseTemplate from "./DiseaseTemplate";
import type { Disease } from "./types";
import { floaters } from "./data/floaters";
import { detachment } from "./data/detachment";
import { vascular } from "./data/vascular";
import { uveitis } from "./data/uveitis";
import { diabetic } from "./data/diabetic";
import { macular } from "./data/macular";
import { cataract } from "./data/cataract";
import { iol } from "./data/iol";

const ALL: Disease[] = [floaters, detachment, vascular, uveitis, diabetic, macular, cataract, iol];

/** 망막·백내장 질환 페이지 (pages.tsx PAGES에 병합) */
export const DISEASE_PAGES: Record<string, ComponentType<SubPageProps>> = Object.fromEntries(
  ALL.map((d) => {
    const Page = () => <DiseaseTemplate d={d} />;
    Page.displayName = `DiseasePage(${d.path})`;
    return [d.path, Page];
  }),
);
