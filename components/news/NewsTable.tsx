import Link from "next/link";
import type { NewsPost } from "@/lib/news";
import styles from "./news.module.css";

type Props = {
  posts: NewsPost[];
  /** 첫 행의 게시글 번호 (전체 개수 기준 역순) */
  startNumber: number;
  /** 게시판 경로 (예: "/community/notice") — 상세 링크 = basePath/id */
  basePath: string;
};

/** 게시판 테이블 (번호/제목/등록일/조회수) — 공지사항·고객후기 공용 */
export default function NewsTable({ posts, startNumber, basePath }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.thNum}>번호</th>
          <th className={styles.thTitle}>제목</th>
          <th className={styles.thDate}>등록일</th>
          <th className={styles.thViews}>조회수</th>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 ? (
          <tr>
            <td colSpan={4} className={styles.empty}>
              등록된 게시글이 없습니다.
            </td>
          </tr>
        ) : (
          posts.map((post, i) => (
            <tr key={post.id} className={styles.row}>
              <td className={styles.tdNum}>{startNumber - i}</td>
              <td className={styles.tdTitle}>
                <Link href={`${basePath}/${post.id}`}>{post.title}</Link>
              </td>
              <td className={styles.tdDate}>{post.date}</td>
              <td className={styles.tdViews}>{post.views}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
