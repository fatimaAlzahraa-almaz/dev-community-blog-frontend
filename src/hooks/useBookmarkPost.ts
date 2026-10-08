"use client";

import {
  addPostBookmark,
  deletePostBookmark,
} from "@/features/interactions/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { useBookmarkPostParams } from "@/features/interactions/type";
export const useBookmarkPost = () => {
  const qeuryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, isBookmarked }: useBookmarkPostParams) =>
      isBookmarked ? deletePostBookmark({ slug }) : addPostBookmark({ slug }),
    onSuccess: (_, variables) => {
      qeuryClient.invalidateQueries({
        queryKey: ["post", variables.slug],
      });
      qeuryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      qeuryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
};
