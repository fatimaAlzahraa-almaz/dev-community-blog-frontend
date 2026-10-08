"use client";

import { getUser } from "@/features/users/api";
import { useQuery } from "@tanstack/react-query";
import { useUserProps } from "@/features/users/type";

export const useUser = ({ username }: useUserProps) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser({ username }),
    enabled: !!username,
  });
};
