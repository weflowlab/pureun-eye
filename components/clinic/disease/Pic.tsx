import Image from "next/image";
import Placeholder from "@/components/common/Placeholder";
import { picFor } from "./images";
import styles from "./disease.module.css";

/** 이미지 자리: images.ts에 등록된 라벨이면 실제 이미지, 아니면 플레이스홀더 */
export default function Pic({ label, aspectRatio }: { label: string; aspectRatio: string }) {
  const pic = picFor(label);
  if (!pic) return <Placeholder label={label} aspectRatio={aspectRatio} stock={false} />;
  return (
    <div className={`${styles.pic} ${pic.contain ? styles.contain : ""}`} style={{ aspectRatio }} suppressHydrationWarning data-aos="reveal">
      <Image src={pic.src} alt={label.replace(/ 이미지$/, "")} fill sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
}
