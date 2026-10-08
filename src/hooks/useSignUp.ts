"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signup } from "@/features/auth/api";

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) => signup(data),
    onSuccess: () => {
      router.push("/login");
    },
  });
}
