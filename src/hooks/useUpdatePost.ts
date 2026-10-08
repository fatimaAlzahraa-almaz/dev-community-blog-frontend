"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/features/posts/api";
import { useRouter } from "next/navigation";

export const useUpdatePost = () => {
  const queryclient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      queryclient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryclient.invalidateQueries({
        queryKey: ["post", variables.slug],
      });
      router.push(`/posts/${variables.slug}`);
    },
  });
};
