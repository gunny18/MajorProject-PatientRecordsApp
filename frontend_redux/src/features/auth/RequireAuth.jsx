import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "./authSlice";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const auth = useSelector(getAuthState);
  const location = useLocation();
  console.log("auth state--->", auth);
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
