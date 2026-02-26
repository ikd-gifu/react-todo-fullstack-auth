import { Navigate, Outlet } from "react-router";
import { BASE_URL } from "../constants/navigation";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to={`${BASE_URL}/login`} replace />;

  return <Outlet />;
};
