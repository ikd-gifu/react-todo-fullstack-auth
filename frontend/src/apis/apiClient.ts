// バックエンドとの通信設定のみ
// 状態を持たない関数
import axios, { isAxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const TOKEN_KEY = "auth_token";

// 設定済みクライアント」を作る部分
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
  "Content-Type": "application/json",
  },
});

// JWT自動付与
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  // ヘッダーに付与
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { isAxiosError };
export default apiClient;
