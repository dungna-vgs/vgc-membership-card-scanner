import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/constants";
import useAuthenticated from "@/hooks/useAuthenticated";
import useAdmin from "@/hooks/useAdmin";

const logoutUser = () => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
  useAuthenticated.getState().setAuthenticated(false);
  useAdmin.getState().setAdmin(null);
};

export default logoutUser;
