import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./InfoBox.module.css";

type Props = {
  title: string;
  children: ReactNode;
  /** 이미지 라벨 (image 미지정 시 플레이스홀더 사용) */
  imageLabel?: string;
  /** 슬라이더 등 커스텀 이미지 영역 */
  image?: ReactNode;
  reverse?: boolean;
};

/** 둥근 테두리 가로형 박스: 좌 텍스트 / 우 이미지 */
export default function InfoBox({ title, children, imageLabel, image, reverse }: Props) {
  return (
    <div className={`${styles.box} ${reverse ? styles.reverse : ""}`} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1000">
      <div>
        <h3 className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {title}
        </h3>
        <p className={styles.content} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
          {children}
        </p>
      </div>
      {/* 우측 이미지 */}
      <div className={styles.imageSide} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
        {image ?? (
          <div className={styles.imageWrap}>
            <Placeholder label={imageLabel ?? title} aspectRatio="1 / 1" />
          </div>
        )}
      </div>
    </div>
  );
}
