// バックエンドとの通信設定のみ
// 状態を持たない関数
import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const getToken = () => localStorage.getItem("authentication");

// 設定済みクライアント」を作る部分
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const setAxiosAuthentication = (token: string) => {
  localStorage.setItem("authentication", token);
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};
export const removeAxiosAuthentication = () => {
  localStorage.removeItem("authentication");
  delete apiClient.defaults.headers.Authorization;
};

export const isAxiosError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error);

export default apiClient;
