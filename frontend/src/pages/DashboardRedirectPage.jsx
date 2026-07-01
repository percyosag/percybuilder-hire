import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function DashboardRedirectPage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = user?.roles || [];

  if (roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/admin/contacts" replace />;
  }

  if (roles.includes("ROLE_EMPLOYER")) {
    return <Navigate to="/employer/dashboard" replace />;
  }

  if (roles.includes("ROLE_CANDIDATE")) {
    return <Navigate to="/candidate/profile" replace />;
  }

  return <Navigate to="/account" replace />;
}

export default DashboardRedirectPage;
