// 블로그 모바일 하단 고정 바: 바로 전화 / 상담 신청하기 (md 미만에서만). 홈페이지 상담 신청 페이지로 이동한다.
// 바 높이(56px)만큼 본문 아래 여백은 app/blog.css (body:has(.blog-root)) 가 준다.
import Link from "next/link";
import { IconClipboardText, IconPhone } from "@tabler/icons-react";
import { SITE } from "@/lib/site";

export function BlogMobileBar() {
  const tel = `tel:${SITE.tel.replace(/[^0-9+]/g, "")}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 bg-primary pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={tel} className="flex h-14 items-center justify-center gap-2 bg-primary text-base font-bold text-white active:bg-brand-secondary">
        <IconPhone className="size-5 animate-wiggle motion-reduce:animate-none" />
        바로 전화
      </a>
      <Link href="/contact/online" className="flex h-14 items-center justify-center gap-2 bg-[#edc47c] text-base font-bold text-[#152c6b] active:bg-[#e4b764]">
        <IconClipboardText className="size-5 -translate-y-px animate-wiggle motion-reduce:animate-none" style={{ animationDelay: "1s" }} />
        상담 신청하기
      </Link>
    </div>
  );
}
