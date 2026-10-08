"use client";

import { updateCurrentUser } from "@/features/users/api";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { UseEditeProfileParams } from "@/features/users/type";
import { useRouter } from "next/navigation";
export const useEditeProfile = () => {
  const router = useRouter();
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bio,
      name,
      profile_img,
      username,
    }: UseEditeProfileParams) => updateCurrentUser({ bio, name, profile_img }),
    onSuccess: (_, variables) => {
      queryclient.invalidateQueries({
        queryKey: ["me"],
      });
      queryclient.invalidateQueries({
        queryKey: ["user", variables.username],
      });
      router.push(`/users/${variables.username}`);
    },
  });
};
