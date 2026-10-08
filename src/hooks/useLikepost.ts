"use client";

import { addPostLike, deletePostLike } from "@/features/interactions/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { useLikePostParams } from "@/features/interactions/type";
export const useLikePost = () => {
  const qeuryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, isLiked }: useLikePostParams) =>
      isLiked ? deletePostLike({ slug }) : addPostLike({ slug }),
    onSuccess: (_, variables) => {
      qeuryClient.invalidateQueries({
        queryKey: ["post", variables.slug],
      });
      qeuryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
