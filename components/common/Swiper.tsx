"use client";

import dynamic from "next/dynamic";

/**
 * Swiper 클라이언트 전용 래퍼.
 * Swiper(autoplay 등)는 렌더 중 Date를 읽어 cacheComponents 프리렌더가 실패하므로 SSR을 끈다.
 * 사용법은 swiper/react와 동일: import { Swiper, SwiperSlide } from "@/components/common/Swiper";
 */
export const Swiper = dynamic(() => import("swiper/react").then((m) => m.Swiper), { ssr: false });
export { SwiperSlide } from "swiper/react";
