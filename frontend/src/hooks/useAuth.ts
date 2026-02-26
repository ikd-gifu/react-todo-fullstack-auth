// 認証ロジック本体
// 認証に関する状態管理と副作用処理
import { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { PATHS, NAV_ITEMS } from "../constants/navigation";
import { checkAuthentication } from "../apis/auth";
import { UserType } from "../types/User";
import apiClient, { TOKEN_KEY } from "../apis/apiClient";

export const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // ログイン処理（トークンとユーザー情報をセット）
  const signIn = useCallback(
    (user: UserType, token: string) => {
      setUser(user);
      setIsAuth(true);
      // localStorageにトークンを保存
      localStorage.setItem(TOKEN_KEY, token);
      // axiosのデフォルトヘッダーにトークンを設定
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate(NAV_ITEMS.TOP);
    },
    [navigate]
  );

  // ログアウト処理
  const signOut = useCallback(() => {
    setUser(null);
    setIsAuth(false);
    // localStorageからトークンを削除
    localStorage.removeItem(TOKEN_KEY);
    // axiosのデフォルトヘッダーからトークンを削除
    delete apiClient.defaults.headers.common["Authorization"];
    navigate(NAV_ITEMS.LOGIN);
  }, [navigate]);

  // 認証前のページかどうかをチェック
  const isExitBeforeAuthPage = useCallback(
    () =>
      pathname === PATHS.SIGNUP || pathname === PATHS.LOGIN,
    [pathname]
  );

  // 認証状態のチェックとルーティング
  const authRouting = useCallback(async () => {
    // 1) トークンがなければAPIを叩かない
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setIsAuth(false);
      if (!isExitBeforeAuthPage()) navigate(PATHS.LOGIN);
      return;
    }

    // 2) トークンありの場合のみ認証チェック
    const response = await checkAuthentication();
    const auth = response?.code === 200 && !!response.data;

    if (auth && response.data) {
      setUser(response.data.user);
      setIsAuth(true);
      if (isExitBeforeAuthPage()) navigate(NAV_ITEMS.TOP);
      return;
    }

    // 3) 401等で失敗したらトークン破棄
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuth(false);
    if (!isExitBeforeAuthPage()) navigate(PATHS.LOGIN);
  }, [isExitBeforeAuthPage, navigate]);

  useEffect(() => {
    authRouting();
  }, [authRouting]);

  return {
    user,
    isAuth,
    signIn,
    signOut,
  };
};
