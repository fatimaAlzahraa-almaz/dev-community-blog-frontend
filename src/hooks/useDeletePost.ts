"use client";

import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/features/posts/api";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const queryclient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["posts"],
      });
      router.push("/");
    },
  });
};
