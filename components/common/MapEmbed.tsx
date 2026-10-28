"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SITE } from "@/lib/site";
import styles from "./MapEmbed.module.css";

/**
 * 병원 위치 지도.
 * - NEXT_PUBLIC_KAKAO_MAP_KEY(카카오 JavaScript 키, 도메인 등록 필요)가 있으면 카카오맵 + 마커
 * - 없으면 키 없이 쓰는 구글 지도 임베드
 */
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

type Props = {
  className?: string;
  height?: number;
  aspectRatio?: string;
};

export default function MapEmbed({ className, height, aspectRatio }: Props) {
  const style: CSSProperties = { height, aspectRatio };
  return (
    <div className={`${styles.map} ${className ?? ""}`} style={style}>
      {KAKAO_KEY ? <KakaoMap appKey={KAKAO_KEY} /> : <GoogleMap />}
    </div>
  );
}

// 키 없이 쓰는 구글 지도 (도로명 주소로 위치 표시)
function GoogleMap() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.roadAddress)}&hl=ko&z=17&output=embed`;
  return <iframe src={src} title={`${SITE.name} 위치 지도`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
}

// 카카오맵 SDK 최소 타입
type LatLng = object;
type KakaoMaps = {
  load: (cb: () => void) => void;
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (el: HTMLElement, opts: { center: LatLng; level: number }) => object;
  Marker: new (opts: { map: object; position: LatLng }) => object;
  InfoWindow: new (opts: { content: string }) => { open: (map: object, marker: object) => void };
  services: {
    Status: { OK: string };
    Geocoder: new () => { addressSearch: (addr: string, cb: (res: { x: string; y: string }[], status: string) => void) => void };
  };
};
const SDK_ID = "kakao-map-sdk";

// 카카오맵: SDK 1회 로드 → 주소를 좌표로 변환 → 지도·마커·병원명 표시
function KakaoMap({ appKey }: { appKey: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draw = () => {
      const maps = (window as unknown as { kakao: { maps: KakaoMaps } }).kakao.maps;
      maps.load(() => {
        new maps.services.Geocoder().addressSearch(SITE.roadAddress, (res, status) => {
          if (status !== maps.services.Status.OK || !ref.current) return;
          const pos = new maps.LatLng(Number(res[0].y), Number(res[0].x));
          const map = new maps.Map(ref.current, { center: pos, level: 3 });
          const marker = new maps.Marker({ map, position: pos });
          new maps.InfoWindow({ content: `<div style="padding:6px 12px;font-size:13px;white-space:nowrap">${SITE.name}</div>` }).open(map, marker);
        });
      });
    };

    const existing = document.getElementById(SDK_ID);
    if (existing) {
      if ("kakao" in window) draw();
      else existing.addEventListener("load", draw, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = SDK_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.addEventListener("load", draw, { once: true });
    document.head.appendChild(script);
  }, [appKey]);

  return <div ref={ref} className={styles.kakao} />;
}
