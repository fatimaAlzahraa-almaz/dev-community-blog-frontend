import type {
  LoginParams,
  LoginResponse,
  LogoutResponse,
  RegisterParams,
  RegisterResponse,
  RefreshTokenResponse,
} from "./type";
import { api } from "@/lib/api/axios";

export const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/api/users/login", {
    email,
    password,
  });
  return response.data;
};

export const signup = async ({
  name,
  username,
  email,
  password,
  password_confirm,
}: RegisterParams): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/api/users/register", {
    name,
    username,
    email,
    password,
    password_confirm,
  });

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>("/api/users/logout");
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>("/api/users/refresh");
  return response.data;
};
