import type { ReactNode } from "react";
import Banner from "./Banner";
import styles from "./DiseaseLayout.module.css";

type Props = {
  title: string;
  description: ReactNode;
  compactTitle?: boolean;
  children: ReactNode;
};

/** 질환 페이지 공통 골격: 상단 배너 + 본문 */
export default function DiseaseLayout({ title, description, compactTitle, children }: Props) {
  return (
    <div className={styles.layout}>
      <Banner title={title} description={description} compact={compactTitle} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
