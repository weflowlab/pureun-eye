import { getPopups } from "@/lib/popups";
import PopupModal from "./PopupModal";

/** 메인 팝업 (서버): 관리자에서 켠 팝업을 읽어 클라이언트 팝업에 넘긴다. 없으면 아무것도 그리지 않는다 */
export default async function PopupModalServer() {
  const popups = await getPopups();
  if (popups.length === 0) return null;
  return <PopupModal popups={popups} />;
}
