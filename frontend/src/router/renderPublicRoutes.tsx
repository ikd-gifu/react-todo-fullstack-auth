import { Route } from "react-router";
import { BASE_URL } from "../constants/navigation";
import { LoginPage, SignUpPage } from "../pages";

export const renderPublicRoutes = () => (
  <>
    <Route path={`${BASE_URL}/login`} element={<LoginPage />} />
    <Route path={`${BASE_URL}/signup`} element={<SignUpPage />} />
  </>
);
