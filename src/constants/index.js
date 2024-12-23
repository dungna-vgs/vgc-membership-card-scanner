export const API_URL = import.meta.env.VITE_API_URL;

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  FULFILLED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const ROUTE_PATH = {
  HOME: "/",
  LOGIN: "/login",
};
