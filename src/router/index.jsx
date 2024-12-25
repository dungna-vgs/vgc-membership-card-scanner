import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import { ROUTE_PATH } from "@/constants";
import LoginPage from "@/components/LoginPage";

const HomePage = lazy(() => import("@/components/HomePage"));

const routeList = [
  {
    path: ROUTE_PATH.LOGIN,
    element: <PrivateRoute element={<LoginPage />} />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: <PrivateRoute element={<HomePage />} auth />,
  },
];

const RenderRouter = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
