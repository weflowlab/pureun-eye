"use client";

import { useState, type ReactNode } from "react";
import ReservationModal from "@/components/layout/ReservationModal";

/** 상담 신청 모달 열기 버튼 (퀵메뉴와 같은 모달 사용) */
export default function ConsultButton({ className, children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <ReservationModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
