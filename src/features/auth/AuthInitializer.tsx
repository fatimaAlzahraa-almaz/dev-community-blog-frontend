"use client";
import { useEffect } from "react";
import { useAuthStore } from "./store";
import { refreshToken } from "./api";
export const AuthInitializer = () => {
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await refreshToken();
        setAccessToken(data.access);
      } catch (err) {
        console.log(err);
      } finally {
        setInitialized(true);
      }
    };
    initializeAuth();
  }, [setAccessToken, setInitialized]);

  return null;
};
