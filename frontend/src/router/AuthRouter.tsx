// AuthRouter.tsx
import { Routes, Route } from "react-router";
import { PATHS } from "../constants/navigation";
import { LoginPage } from "../pages";

export const AuthRouter = () => (
  <Routes>
    <Route path={PATHS.LOGIN} element={<LoginPage />} />
    {/* Routes 構成で未一致時に出る警告を回避 */}
    <Route path="*" element={null} />
  </Routes>
);
