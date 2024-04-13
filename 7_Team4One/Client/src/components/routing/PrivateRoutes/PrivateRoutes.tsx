import useUser from "@/hooks/user";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ orgRoute = false }) => {
  const { user, admin, loading } = useUser();

  const location = useLocation();

  return loading ? (
    <div>Loading...</div>
  ) : !user ? (
    <Navigate to="/login" state={{ from: location.pathname }} />
  ) : !admin && orgRoute ? (
    <div>Forbidden</div>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
