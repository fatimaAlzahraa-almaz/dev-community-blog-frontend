"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/features/interactions/api";
import { useAuthStore } from "@/features/auth/store";

export const useBookmarks = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken);

  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
    enabled: isInitialized && isLoggedIn,
  });
};
