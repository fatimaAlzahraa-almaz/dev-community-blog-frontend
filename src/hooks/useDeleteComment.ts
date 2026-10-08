"use client";

import { deleteComment } from "@/features/comments/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", variables.slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.slug],
      });
    },
  });
};
