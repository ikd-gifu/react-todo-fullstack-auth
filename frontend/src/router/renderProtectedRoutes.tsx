import { Route } from "react-router";
import { PATHS } from "../constants/navigation";
import { ProtectedRoute } from "./AuthRouter";
import { TodoPage, TodoDetailPage, TodoCreatePage, TodoEditPage } from "../pages";

export const renderProtectedRoutes = () => (
  <Route element={<ProtectedRoute />}>
    <Route path={PATHS.TOP} element={<TodoPage />} />
    <Route path={PATHS.DETAIL} element={<TodoDetailPage />} />
    <Route path={PATHS.CREATE} element={<TodoCreatePage />} />
    <Route path={PATHS.EDIT} element={<TodoEditPage />} />
  </Route>
);
