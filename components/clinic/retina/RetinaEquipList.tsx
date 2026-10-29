import Image from "next/image";
import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "./SectionHead";
import { EQUIPMENTS } from "@/lib/equipment";
import styles from "./retina.module.css";

type RetinaEquip = {
  model: string;
  maker: string;
  category: string;
  /** lib/equipment.ts의 model과 같으면 실제 사진 사용 (없으면 플레이스홀더) */
  photoModel?: string;
  desc: string[];
};

// 장비 그룹 (기존 홈페이지 C2000 기준, 의료 내용은 병원 검토 필요)
const GROUPS: { title: string; items: RetinaEquip[] }[] = [
  {
    title: "정밀 검사 장비",
    items: [
      {
        model: "Optos Daytona",
        maker: "Optos (영국)",
        category: "초광각 안저촬영",
        photoModel: "Optos Daytona",
        desc: ["일반 안저사진(약 45°)보다 넓은 최대 200° 범위를 한 번에 촬영합니다.", "산동(동공 확장) 없이도 주변부 망막 이상을 확인하는 데 도움이 됩니다."],
      },
      {
        model: "Zeiss VISUCAM FAG",
        maker: "ZEISS (독일)",
        category: "안저카메라 · 형광안저조영",
        desc: [
          "45° 범위의 안저 촬영으로 망막·녹내장 등 안과 질환 진단에 쓰이는 기본 장비입니다.",
          "형광안저조영검사로 당뇨망막병증, 황반변성 등을 진단합니다.",
        ],
      },
      {
        model: "Heidelberg Spectralis HRA",
        maker: "Heidelberg Engineering (독일)",
        category: "공초점 레이저 혈관조영",
        photoModel: "Heidelberg Spectralis HRA",
        desc: [
          "공초점 레이저 스캐닝(Confocal laser scanning) 기술로 일반 촬영으로 보기 어려운 맥락막 혈관을 확인합니다.",
          "삼출성 황반변성, 특발성 맥락막신생혈관, 백점증후군(White dot syndrome) 등의 진단에 활용합니다.",
        ],
      },
      {
        model: "Zeiss OCT HD5000 Angioflex",
        maker: "ZEISS (독일)",
        category: "빛간섭단층촬영 (OCT 혈관조영)",
        photoModel: "Zeiss OCT HD5000 Angioflex",
        desc: ["망막 중심부 8×8mm 범위의 망막·맥락막 혈관 이상을 짧은 시간에 촬영합니다.", "형광물질 등 조영제 주사 없이 혈관 영상을 얻을 수 있습니다."],
      },
    ],
  },
  {
    title: "레이저 치료 장비",
    items: [
      {
        model: "Ellex Ultra Q Nd-YAG laser",
        maker: "Ellex (호주)",
        category: "Nd-YAG 레이저",
        photoModel: "Ellex Ultra Q Nd-YAG laser",
        desc: [
          "눈의 앞부분뿐 아니라 뒷부분(유리체)까지 Nd-YAG 레이저 치료가 가능하도록 설계된 장비입니다.",
          "바이스링(Weiss ring)이 있는 비문증 환자의 레이저 치료에 활용합니다.",
        ],
      },
      {
        model: "Zeiss Visulas 532s",
        maker: "ZEISS (독일)",
        category: "아르곤 레이저",
        desc: ["532nm 단일 파장으로 망막 광응고술을 시행합니다.", "망막열공, 망막박리, 당뇨망막병증 치료와 급성 폐쇄각 녹내장의 홍채절개술에 사용합니다."],
      },
    ],
  },
  {
    title: "망막 수술 장비",
    items: [
      {
        model: "Alcon Constellation",
        maker: "Alcon (미국)",
        category: "유리체절제술 장비",
        photoModel: "Constellation",
        desc: ["23G·25G·27G 유리체절제술과 최대 7,500cpm 고속 절제를 지원합니다.", "안구 내 레이저 치료, 유리체 내 가스 주입 등을 한 장비로 시행합니다."],
      },
      {
        model: "Zeiss LUMERA 700",
        maker: "ZEISS (독일)",
        category: "안과 수술 현미경",
        photoModel: "LUMERA700",
        desc: [
          "유리체절제술 등 망막 수술에 사용하는 고배율 수술 현미경입니다.",
          "자동 초점 심도 조절(Depth of Focus), 세극등(Slit lamp) 기능으로 안정적인 수술 시야를 제공합니다.",
        ],
      },
    ],
  },
];

// 실제 사진 경로 조회 (lib/equipment.ts)
const photoOf = (model?: string) => EQUIPMENTS.find((e) => e.model === model)?.image;

/** 망막클리닉 보임 장비 목록 (보임 소개 페이지 하단) */
export default function RetinaEquipList() {
  return (
    <ContentBlock tone="gray">
      <SectionHead
        first
        title="망막클리닉 보임 장비"
        sub="2013년 망막 수술 장비(Constellation)·초광각 검사 장비(Optos), 2015년 비문증 치료 레이저(Ellex Ultra Q)를 도입했습니다."
      />
      <div className={styles.secBody}>
        {GROUPS.map((g) => (
          <div key={g.title} className={styles.equipGroup}>
            <p className={styles.equipGroupTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              {g.title}
            </p>
            <div>
              {g.items.map((eq) => {
                const src = photoOf(eq.photoModel);
                return (
                  <div key={eq.model} className={styles.equipItem}>
                    <div className={styles.equipImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                      {src ? (
                        <Image src={src} alt={`${eq.model} ${eq.category}`} width={536} height={428} />
                      ) : (
                        <Placeholder label={eq.model} aspectRatio="536 / 428" />
                      )}
                    </div>
                    <div suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                      <p className={styles.equipMaker}>{eq.maker}</p>
                      <p className={styles.equipModel}>{eq.model}</p>
                      <p className={styles.equipCat}>{eq.category}</p>
                      <ul className={styles.equipDesc}>
                        {eq.desc.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ContentBlock>
  );
}
