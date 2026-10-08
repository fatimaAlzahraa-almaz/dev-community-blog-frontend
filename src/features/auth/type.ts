export type LoginResponse = {
  access: string;
};

export type RefreshTokenResponse = {
  access: string;
};

export type RegisterResponse = {
  username: string;
  name: string;
  email: string;
};

export type LogoutResponse = {
  detail: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
};

export type AuthStore = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccsessToken: () => void;
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
};
