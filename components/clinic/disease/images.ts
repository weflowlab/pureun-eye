/**
 * 질환 페이지 이미지 자리 라벨 → 실제 이미지 (없으면 플레이스홀더 유지)
 * - 시야 이미지(public/images/vision): Pexels 466685 도시 풍경·stock night-driving에 증상별 효과를 입혀 만든 설명용 그림
 * - 장비 사진(public/images/equipment): 기존 홈페이지 장비 사진 — 흰 배경이라 잘리지 않게 contain
 */
type Pic = { src: string; contain?: boolean };

const v = (name: string): Pic => ({ src: `/images/vision/${name}.webp` });
const eq = (name: string): Pic => ({ src: `/images/equipment/${name}.webp`, contain: true });

const MAP: Record<string, Pic> = {
  // 소개: 정상 / 질환 시야 비교
  "정상 시야": v("normal"),
  "백내장 시야": v("cataract"),
  "비문증 시야": v("floaters"),
  "망막박리 시야": v("curtain"),
  "망막혈관폐쇄 시야": v("occlusion"),
  "당뇨망막병증 시야": v("blots"),
  "황반변성 시야": v("scotoma"),
  "포도막염 시야": v("floaters-blur"),
  "인공수정체 탈구 시야": v("double-blur"),

  // 증상 카드 (라벨: "{증상} 이미지")
  "시야 흐림 이미지": v("blur"),
  "다시 흐려진 시야 이미지": v("blur"),
  "잦은 안경 도수 변화 이미지": v("blur"),
  "시력 저하 이미지": v("blur-strong"),
  "갑작스러운 시력 저하 이미지": v("blur-strong"),
  "눈부심 · 빛 번짐 이미지": v("glare"),
  "눈부심 이미지": v("glare"),
  "야간 시력 저하 이미지": v("night-dim"),
  "겹쳐 보임 이미지": v("double"),
  "색 감각 변화 이미지": v("yellow"),
  "대비 감소 이미지": v("low-contrast"),
  "색 · 대비 감소 이미지": v("color-contrast"),
  "비문증 이미지": v("floaters"),
  "비문증 증가 이미지": v("floaters"),
  "비문증이 갑자기 증가 이미지": v("floaters"),
  "시력 저하 · 비문증 이미지": v("floaters-blur"),
  "광시증 이미지": v("flash"),
  "번쩍이는 빛 (광시증) 이미지": v("flash"),
  "커튼 같은 그림자 이미지": v("curtain"),
  "시야 가림 이미지": v("curtain"),
  "시야 일부 가림 이미지": v("occlusion"),
  "변형시 이미지": v("wavy"),
  "중심 시야 흐림 이미지": v("center-blur"),
  "중심 암점 이미지": v("scotoma"),
  "렌즈 가장자리가 보임 이미지": v("lens-edge"),

  // 암슬러 격자
  "암슬러 격자": { src: "/images/vision/amsler.webp", contain: true },
  "시력 · 암슬러 격자 검사": { src: "/images/vision/amsler.webp", contain: true },

  // 검사 장면 (임시 스톡) · 장비
  "세극등 검사": { src: "/images/stock/exam-slitlamp.webp" },
  "초광각 촬영 · OCT": eq("optos-daytona"),
  "초광각 안저촬영": eq("optos-daytona"),
  OCT: eq("zeiss-oct-hd5000"),
  "OCT · OCT 혈관조영": eq("zeiss-oct-hd5000"),
  형광안저혈관조영: eq("heidelberg-spectralis"),
  "형광 · ICG 혈관조영": eq("heidelberg-spectralis"),
  "수정체 제거와 렌즈 삽입": eq("centurion"),
  유리체절제술: eq("constellation"),
  "Nd-YAG 레이저 치료": eq("ellex-ultra-q"),
};

export const picFor = (label: string): Pic | undefined => MAP[label];
