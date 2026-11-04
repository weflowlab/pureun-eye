import Link from "next/link";
import styles from "./NotFoundView.module.css";

/** 404 화면 본문: 라벨 · 큰 404 · 안내 · 테두리 버튼 2개 (홈페이지 바로가기 / 웹블로그 바로가기).
 *  홈페이지 안 404(app/(site)/not-found), 블로그 404(app/(site)/blog/not-found), 어느 레이아웃에도 안 잡히는 주소의 404(app/global-not-found)가 같이 쓴다.
 *  inBlog: 블로그 레이아웃은 헤더가 고정이 아니라 위 여백을 작게 */
export default function NotFoundView({ inBlog = false }: { inBlog?: boolean }) {
  return (
    <div className={`${styles.wrap} ${inBlog ? styles.inBlog : ""}`}>
      <p className={styles.eyebrow}>404 NOT FOUND</p>
      <p className={styles.code} aria-hidden>
        404
      </p>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.desc}>주소가 바뀌었거나 삭제된 페이지예요. 아래 버튼으로 다시 시작해 보세요.</p>
      <div className={styles.btns}>
        <Link href="/" className={styles.btn}>
          {/* 집 */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5 10v10h5v-6h4v6h5V10" />
          </svg>
          홈페이지 바로가기
        </Link>
        <Link href="/blog" className={styles.btn}>
          {/* 글쓰기 (메인 블로그 섹션 버튼과 같은 아이콘) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
          웹블로그 바로가기
        </Link>
      </div>
    </div>
  );
}
