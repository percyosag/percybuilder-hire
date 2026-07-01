import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function EmployerRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = user?.roles || [];
  const isEmployer = roles.includes("ROLE_EMPLOYER");

  if (!isEmployer) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default EmployerRoute;
