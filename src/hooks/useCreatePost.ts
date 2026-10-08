"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { CreatePostParams } from "@/features/posts/type";
import { createPost } from "@/features/posts/api";
import { useRouter } from "next/navigation";
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ title, content, category, img }: CreatePostParams) =>
      createPost({ title, content, category, img }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/posts/${data.slug}`);
    },
  });
};
