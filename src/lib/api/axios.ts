import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/store";
import type { RefreshTokenResponse } from "@/features/auth/type";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const orginalRequest = error.config as RetryableRequestConfig | undefined;

    if (!orginalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const isAuthendpoint =
      orginalRequest.url?.includes("/api/users/login") ||
      orginalRequest.url?.includes("/api/users/register") ||
      orginalRequest.url?.includes("/api/users/refresh");
    if (isAuthendpoint) {
      return Promise.reject(error);
    }

    const accesstoken = useAuthStore.getState().accessToken;
    if (!accesstoken) {
      return Promise.reject(error);
    }

    if (orginalRequest._retry) {
      return Promise.reject(error);
    }
    orginalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = api
          .post<RefreshTokenResponse>("/api/users/refresh")
          .then((response) => response.data.access)
          .finally(() => {
            refreshPromise = null;
          });
      }
      const accessToken = await refreshPromise;
      useAuthStore.getState().setAccessToken(accessToken);

      return api(orginalRequest);
    } catch (errr) {
      useAuthStore.getState().clearAccsessToken();
      return Promise.reject(errr);
    }
  },
);
