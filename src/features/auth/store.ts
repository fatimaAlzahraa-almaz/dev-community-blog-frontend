import { create } from "zustand";
import type { AuthStore } from "./type";

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (token) => {
    set({ accessToken: token });
  },
  clearAccsessToken: () => {
    set({ accessToken: null });
  },
  isInitialized: false,
  setInitialized: (value) => {
    set({ isInitialized: value });
  },
}));
