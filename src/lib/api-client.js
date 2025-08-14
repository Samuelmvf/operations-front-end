import axios from "axios";

import { LOGIN_ROUTE } from "@/router/routes";
import { TOKEN_KEYS } from "@/stores/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/" + import.meta.env.VITE_API_VERSION;

const httpAxios = axios.create({
  baseURL: BASE_URL || "http://localhost:8080/operations/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response?.status === 401 && LOGIN_ROUTE !== window.location.pathname) {
      handleUnauthorized();
    }

    return Promise.reject(error);
  }
);

const handleUnauthorized = () => {
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);

  window.location.href = LOGIN_ROUTE;
};

export default httpAxios;
