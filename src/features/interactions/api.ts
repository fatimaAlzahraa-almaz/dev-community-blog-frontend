import { api } from "@/lib/api/axios";
import { InteractionParams, InteractionResponse } from "./type";
import { MultiplePosts } from "../posts/type";

export const addPostLike = async ({
  slug,
}: InteractionParams): Promise<InteractionResponse> => {
  const response = await api.post(`/api/posts/${slug}/like`);
  return response.data;
};

export const addPostBookmark = async ({
  slug,
}: InteractionParams): Promise<InteractionResponse> => {
  const response = await api.post(`/api/posts/${slug}/bookmark`);
  return response.data;
};

export const deletePostLike = async ({
  slug,
}: InteractionParams): Promise<void> => {
  await api.delete(`/api/posts/${slug}/like`);
};

export const deletePostBookmark = async ({
  slug,
}: InteractionParams): Promise<void> => {
  await api.delete(`/api/posts/${slug}/bookmark`);
};

export const getBookmarks = async (): Promise<MultiplePosts> => {
  const response = await api.get("/api/bookmarks");
  return response.data;
};
