import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStateValue } from "./Component/store";

const RequireAuth = () => {
  const [{ token }] = useStateValue();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/loginn" state={{ from: location }} replace />
  );
};

export default RequireAuth;
