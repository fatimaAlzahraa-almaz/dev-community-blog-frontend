"use client";

import type { useFollowProps } from "@/features/users/type";
import { followUser, unfollowUser } from "@/features/users/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ username, is_following }: useFollowProps) =>
      is_following ? unfollowUser({ username }) : followUser({ username }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.username],
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
