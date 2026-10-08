"use client";
import { getPosts } from "@/features/posts/api";
import type { GetPostsParams } from "@/features/posts/type";
import { useAuthStore } from "@/features/auth/store";
import { useInfiniteQuery } from "@tanstack/react-query";
export const usePosts = (params:GetPostsParams={}) => {
  const isInitialized=useAuthStore(state=>state.isInitialized);
  return useInfiniteQuery({
    queryKey: ["posts",params],

      queryFn: ({ pageParam }) =>
      getPosts({
        ...params,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return undefined;
      }

      const url = new URL(lastPage.next);

      return Number(url.searchParams.get("page"));
    },
     enabled:isInitialized
  });
};