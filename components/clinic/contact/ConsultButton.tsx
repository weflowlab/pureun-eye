import Link from "next/link";
import type { ReactNode } from "react";

/** 상담 신청 버튼: 상담 신청 페이지(/contact/online)로 이동 (푸터 상담 띠·자주묻는질문 하단. 퀵메뉴와 같은 동작) */
export default function ConsultButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Link href="/contact/online" className={className}>
      {children}
    </Link>
  );
}
