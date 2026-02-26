// Context利用用のラッパー
// useContext(AuthContext) を1行で呼べるようにした専用フック
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => useContext(AuthContext);
