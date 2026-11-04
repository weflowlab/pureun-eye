import NotFoundView from "@/components/common/NotFoundView";

/** 블로그 404 (없는 카테고리·글·경로): 홈페이지와 같은 404 화면을 블로그 헤더 아래에 표시 */
export default function NotFound() {
  return <NotFoundView inBlog />;
}
