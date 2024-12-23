import { COOKIE_KEYS } from "@/constants";
import Cookies from "js-cookie";
import { create } from "zustand";

const useAuthenticated = create((set) => ({
  authenticated: !!Cookies.get(COOKIE_KEYS.ACCESS_TOKEN),
  setAuthenticated: (authenticated) => set({ authenticated }),
}));

export default useAuthenticated;
