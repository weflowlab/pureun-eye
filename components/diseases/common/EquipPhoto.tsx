import Image from "next/image";
import { EQUIPMENTS } from "@/lib/equipment";
import styles from "./EquipPhoto.module.css";

type Props = {
  /** lib/equipment.ts의 model 값 */
  model: string;
  className?: string;
};

/** 장비 실사진 + 캡션 (기존 홈페이지 장비 사진). 목록에 없는 모델이면 렌더링하지 않음 */
export default function EquipPhoto({ model, className }: Props) {
  const eq = EQUIPMENTS.find((e) => e.model === model);
  if (!eq) return null;
  return (
    <figure className={`${styles.equip} ${className ?? ""}`}>
      <Image src={eq.image} alt={`${eq.model} ${eq.category}`} width={536} height={428} />
      <figcaption>
        {eq.model} · {eq.category}
      </figcaption>
    </figure>
  );
}
