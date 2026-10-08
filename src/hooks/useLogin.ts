"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/store";

export function useLogin() {
  const router = useRouter();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  return useMutation({
    mutationFn:  login,
    onSuccess: (data) => {
      setAccessToken(data.access);
      router.push("/");
    },
  });
}
