import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./VerticalInfoBox.module.css";

type Props = {
  title: string;
  children: ReactNode;
  /** 이미지 아래 캡션 목록 */
  images?: ReactNode[];
  /** 5열 소형 이미지(증상 카드) 모드 */
  small?: boolean;
  /** images 대신 직접 넣을 하단 영역 */
  bottom?: ReactNode;
};

/** 세로형 정보 박스: 중앙 텍스트 + 하단 이미지(시술 전/후 등) */
export default function VerticalInfoBox({ title, children, images = [], small, bottom }: Props) {
  return (
    <div className={styles.box} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1000">
      <div className={styles.textSide}>
        <p className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {title}
        </p>
        <p className={styles.content} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {children}
        </p>
      </div>
      {bottom}
      {/* 하단 이미지 + 캡션 */}
      {images.length > 0 && (
        <div className={`${styles.imageSide} ${small ? styles.imageSideSmall : ""}`}>
          {images.map((label, i) => (
            <div
              key={i}
              className={`${styles.imageItem} ${small ? styles.imageItemSmall : ""}`}
              suppressHydrationWarning data-aos={i === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={small ? i * 100 : undefined}
              data-aos-duration="1500"
            >
              <div className={styles.img}>
                <Placeholder label={`${title} ${i + 1}`} aspectRatio={small ? "1 / 1" : "4 / 3"} />
              </div>
              <p className={styles.imageLabel}>{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
