"use client";

import { createComment } from "@/features/comments/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useCreateCommentProps } from "@/features/comments/type";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, content }: useCreateCommentProps) =>
      createComment({ content, slug }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.slug],
      });
    },
  });
};
