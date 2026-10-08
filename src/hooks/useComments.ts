"use client";

import { getComments } from "@/features/comments/api";
import { useQuery } from "@tanstack/react-query";
import type { GetCommentsParams } from "@/features/comments/type";

export const useComments = ({ slug }: GetCommentsParams) => {
  return useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments({ slug }),
    staleTime: 5 * 60 * 1000,
  });
};
