import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_KEYS, API_URL, HTTP_STATUS_CODE } from "@/constants";
import useAuthenticated from "@/hooks/useAuthenticated";

const axiosInstance = axios.create({
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || ""}`,
      Accept: "application/json",
    };
    config.headers = Object.assign(config.headers || {}, headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      status: HTTP_STATUS_CODE.OK,
      data: response?.data,
    };
  },
  async (error) => {
    const status = error?.status;
    const errorMessage = error?.message;

    if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
      await useAuthenticated.getState().setAuthenticated(false);
    }

    return {
      status,
      message: errorMessage,
    };
  }
);

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = (method, url, data, config) => {
  url = API_URL + url;

  if (method === "put") {
    return axiosInstance.put(url, data, config);
  }

  if (method === "patch") {
    return axiosInstance.patch(url, data, config);
  }

  if (method === "delete") {
    return axiosInstance.delete(url, {
      data,
      ...config,
    });
  }

  if (method === "post") {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
