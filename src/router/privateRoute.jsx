import { Navigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants";
import useAuthenticated from "@/hooks/useAuthenticated";

const PrivateRoute = ({ element, auth }) => {
  const { authenticated } = useAuthenticated();

  if (!auth) return element;

  return authenticated ? element : <Navigate to={ROUTE_PATH.LOGIN} />;
};

export default PrivateRoute;
