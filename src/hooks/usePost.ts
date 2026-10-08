"use client";
import { getPost } from "@/features/posts/api";
import { useQuery } from "@tanstack/react-query";
import type { GetPostParams } from "@/features/posts/type";
import { useAuthStore } from "@/features/auth/store";
export const usePost=({slug}:GetPostParams)=>{
    const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );
   return useQuery({
    queryKey:['post',slug],
    queryFn:()=>getPost({slug}),
    enabled:isInitialized && !!slug
    
   })
}