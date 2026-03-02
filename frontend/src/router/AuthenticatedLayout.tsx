import { Outlet } from "react-router";
import { AppHeader } from "../components/organisms/AppHeader/AppHeader";

// TodoRouterの遷移ではAuthenticatedLayoutはアンマウントされない
// ページ固有入力（編集フォーム値など）を置くと残るので避ける
export const AuthenticatedLayout = () => (
  <>
    <AppHeader />
    {/* TodoRouter 内で現在URLにマッチした子 Route の element を表示 */}
    <Outlet />
  </>
);
