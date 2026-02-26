// 認証API層
import apiClient, { isAxiosError } from "./apiClient";
import { UserType } from "../types/User";
import { TodoResponseType } from "../types/TodoResponse";

// ログインレスポンスの型定義
type LoginResponse = {
  user: UserType;
  token: string;
};

type SignUpResponse = {
  user: UserType;
  token: string;
};

type CheckAuthResponse = {
  user: UserType;
};

/**
 * ログイン処理
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    const res: TodoResponseType<LoginResponse> = {
      code: response.status,
      data: response.data,
    };
    return res;
  } catch (error) {
    const res: TodoResponseType = {
      code: 500,
      message: error as string,
    };
    if (isAxiosError(error) && error.response?.data) {
      res.code = error.response.status;
      res.message = error.response.data.message;
    } else {
      res.code = 500;
      res.message = "予期しないエラーが発生しました";
    }
    return res;
  }
};

/**
 * 新規登録処理
 */
export const signUp = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await apiClient.post<SignUpResponse>("/signup", {
      name,
      email,
      password,
      password_confirmation,
    });
    const res: TodoResponseType<SignUpResponse> = {
      code: response.status,
      data: response.data,
    };
    return res;
  } catch (error) {
    const res: TodoResponseType = {
      code: 500,
      message: error as string,
    };
    if (isAxiosError(error) && error.response?.data) {
      res.code = error.response.status;
      res.message = error.response.data.message;
    } else {
      res.code = 500;
      res.message = "予期しないエラーが発生しました";
    }
    return res;
  }
};

/**
 * 認証チェック処理
 */
export const checkAuthentication = async () => {
  try {
    const response = await apiClient.get<CheckAuthResponse>("/auth/check");
    const res: TodoResponseType<CheckAuthResponse> = {
      code: response.status,
      data: response.data,
    };
    return res;
  } catch (error) {
    const res: TodoResponseType = {
      code: 500,
      message: error as string,
    };
    // response / response.data が undefinedになるか存在チェック
    if (isAxiosError(error) && error.response?.data) {
      res.code = error.response.status;
      res.message = error.response.data.message;
    } else {
      res.code = 500;
      res.message = "予期しないエラーが発生しました";
    }
    return res;
  }
};
