import type { ReactNode } from "react";
import s from "./home.module.css";

type Tone = "white" | "tint";

/** 메인 공통 섹션: 위아래 여백 + 배경 톤 (흰색 · 연회청색 교대) */
export function HomeSection({ tone = "white", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return <section className={`${s.section} ${s[tone]} ${className ?? ""}`}>{children}</section>;
}

/** 1210px 컨테이너 (모바일 90%) */
export function Inner({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`${s.inner} ${className ?? ""}`}>{children}</div>;
}

type HeadProps = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  /** 우측 버튼·화살표 (모바일은 아래로) */
  action?: ReactNode;
  /** action 묶음에 덧붙일 클래스 (예: 폰에서 숨김) */
  actionClassName?: string;
};

/** 섹션 머리: 금색 영문 라벨 + 제목 + 설명 */
export function HomeHead({ eyebrow, title, sub, align = "left", action, actionClassName }: HeadProps) {
  return (
    <div className={`${s.head} ${align === "center" ? s.center : ""}`}>
      <div>
        <p className={s.eyebrow} suppressHydrationWarning data-aos="fade-up">
          {eyebrow}
        </p>
        <h2 className={s.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay="50">
          {title}
        </h2>
        {sub && (
          <p className={s.sub} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            {sub}
          </p>
        )}
      </div>
      {action && <div className={`${s.action} ${actionClassName ?? ""}`}>{action}</div>}
    </div>
  );
}

/** 화살표 아이콘 (슬라이더 이전/다음) */
export const Chevron = ({ dir = "left" }: { dir?: "left" | "right" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}
  >
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
