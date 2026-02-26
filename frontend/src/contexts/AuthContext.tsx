// 認証の本体　Context定義・配布
import { ReactNode, createContext, FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserType } from "../types/User";

type AuthContextProps = {
  children: ReactNode;
};

// 共有する値を定義
type AuthContextType = {
  user: UserType | null;
  isAuth: boolean;
  signIn: (user: UserType, token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
  signIn: () => {},
  signOut: () => {},
});

export { AuthContext };

// useAuth() の戻り値を受け取り<AuthContext.Provider> で配布
export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const { user, isAuth, signIn, signOut } = useAuth();
  
  return (
    <AuthContext.Provider value={{ user, isAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
