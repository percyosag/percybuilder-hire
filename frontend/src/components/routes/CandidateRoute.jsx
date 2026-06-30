import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function CandidateRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = user?.roles || [];
  const isCandidate = roles.includes("ROLE_CANDIDATE");

  if (!isCandidate) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}

export default CandidateRoute;
