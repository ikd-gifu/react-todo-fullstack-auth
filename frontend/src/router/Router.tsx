// React Router v7を利用しているが、<BrowserRouter> + <Routes> パターン（宣言的ルーティング）で実装
// バックエンド連携のタイミングで createBrowserRouter に移行？
// 大規模に移行する場合は分割するのが望ましい
// index.ts - エクスポート用
// Router.tsx - <BrowserRouter>のラッパー
// TodoRouter.tsx - <Routes>と<Route>の定義
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { PATHS } from '../constants/navigation.js';
import { AuthProvider } from "../contexts/AuthContext";
import { renderPublicRoutes } from "./renderPublicRoutes";
import { renderProtectedRoutes } from "./renderProtectedRoutes";

/**
 * アプリケーション全体のルーティング設定
 */
const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {renderPublicRoutes()}
          {renderProtectedRoutes()}
          <Route path="*" element={<Navigate to={PATHS.LOGIN} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
