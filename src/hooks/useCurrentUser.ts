"use client";
import { getCurrentUser } from "@/features/users/api";
import { useAuthStore } from "@/features/auth/store";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  return useQuery({
    queryKey: ["me", accessToken],
    queryFn: getCurrentUser,
    enabled: !!accessToken && isInitialized,
    
  });
};
