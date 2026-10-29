import { Playfair_Display } from "next/font/google";

/**
 * Playfair Display 진짜 이탤릭 (--font-italic).
 * globals.css는 정체만 불러와 font-style: italic이 기울임 흉내가 되므로, 크게 쓰는 영문 이탤릭은 이걸 쓴다.
 * 쓰는 곳 상위 요소에 className={playfairItalic.variable}
 */
export const playfairItalic = Playfair_Display({ weight: "400", style: "italic", subsets: ["latin"], variable: "--font-italic", display: "swap" });
