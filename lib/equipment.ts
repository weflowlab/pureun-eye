/** 장비 설명 한 줄: 문자열 또는 { b } (굵게) 조각의 배열 */
export type Seg = string | { b: string };

export type Equipment = {
  /** 모델명 (기존 홈페이지 표기 기준) */
  model: string;
  /** 제조사 (국가) */
  maker: string;
  /** 장비 분류 (한글) */
  category: string;
  /** 기존 홈페이지 장비 사진 그대로 사용 (536×428, WebP 변환본) */
  image: string;
  /** 특징 — 의료 내용이므로 병원 검토 필요 */
  points: Seg[][];
};

/** 첨단 의료장비 — 기존 홈페이지(첨단의료장비 메뉴) 순서·사진 그대로 */
export const EQUIPMENTS: Equipment[] = [
  {
    model: "VisuMax",
    maker: "ZEISS (독일)",
    category: "펨토초 레이저",
    image: "/images/equipment/visumax.webp",
    points: [[{ b: "스마일라식(SMILE)" }, " 시력교정에 사용하는 펨토초 레이저"], ["정밀한 각막 수술 지원"]],
  },
  {
    model: "Centurion",
    maker: "Alcon (미국)",
    category: "백내장 수술 장비",
    image: "/images/equipment/centurion.webp",
    points: [["초음파로 혼탁해진 수정체를 제거하는 ", { b: "백내장 수술 장비" }], ["수술 중 안압을 실시간으로 조절"]],
  },
  {
    model: "Constellation",
    maker: "Alcon (미국)",
    category: "유리체 절제술 장비",
    image: "/images/equipment/constellation.webp",
    points: [[{ b: "망막·유리체 수술" }, "을 위한 통합 수술 시스템"], ["고속 절삭 및 레이저 기능 내장"]],
  },
  {
    model: "Optos Daytona",
    maker: "Optos (영국)",
    category: "초광각 안저촬영기",
    image: "/images/equipment/optos-daytona.webp",
    points: [["망막의 ", { b: "넓은 범위를 한 번에" }, " 촬영"], ["주변부 망막 질환 확인"]],
  },
  {
    model: "Zeiss OCT HD5000 Angioflex",
    maker: "ZEISS (독일)",
    category: "빛간섭단층촬영 (OCT)",
    image: "/images/equipment/zeiss-oct-hd5000.webp",
    points: [["망막 단면을 고해상도로 촬영"], [{ b: "조영제 없이" }, " 망막 혈관 영상 확인"]],
  },
  {
    model: "Ellex Ultra Q Nd-YAG laser",
    maker: "Ellex (호주)",
    category: "YAG 레이저",
    image: "/images/equipment/ellex-ultra-q.webp",
    points: [[{ b: "후발성 백내장" }, " 레이저 치료"], ["레이저 홍채절개술 등에 활용"]],
  },
  {
    model: "Heidelberg Spectralis HRA",
    maker: "Heidelberg Engineering (독일)",
    category: "안저 혈관조영",
    image: "/images/equipment/heidelberg-spectralis.webp",
    points: [["형광·인도시아닌그린 ", { b: "혈관조영 촬영" }], ["황반변성 등 망막 혈관 질환 진단"]],
  },
  {
    model: "LUMERA700",
    maker: "ZEISS (독일)",
    category: "안과 수술 현미경",
    image: "/images/equipment/lumera700.webp",
    points: [["백내장·망막 수술용 ", { b: "고배율 수술 현미경" }], ["선명하고 안정적인 수술 시야"]],
  },
];
