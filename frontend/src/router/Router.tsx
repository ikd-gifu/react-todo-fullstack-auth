// Router.tsx
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { AuthRouter } from "./AuthRouter";
import { TodoRouter } from "./TodoRouter";

// useAuth のガードでsignIn/signOut判定、遷移させる
const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <AuthRouter />
      <TodoRouter />
    </AuthProvider>
  </BrowserRouter>
);
export default Router;
