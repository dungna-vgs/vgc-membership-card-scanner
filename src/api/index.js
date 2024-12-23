import { request } from "./request";

export const apiLogin = (payload) => request("post", "/login", payload);

export const apiGetUser = () => request("get", "/user");

export const apiSendOTP = (payload) =>
  request("post", "/membership/send-otp", payload);

export const apiVerifyOTP = (payload) =>
  request("post", "/membership/verify-otp", payload);

export const apiGetTicket = (params) =>
  request("get", "/membership/tickets", params);

export const apiCheckin = (payload) =>
  request("post", "/membership/histories", payload);
