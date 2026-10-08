import { api } from "@/lib/api/axios";
import {
  CreateCommentParams,
  CommentMutationResponse,
  GetCommentsParams,
  MultipleComments,
  UpdateCommentparams,
  DeleteCommentParams,
} from "./type";

export const getComments = async ({
  slug,
}: GetCommentsParams): Promise<MultipleComments> => {
  const response = await api.get<MultipleComments>(
    `/api/posts/${slug}/comments`,
  );
  return response.data;
};

export const createComment = async ({
  content,
  slug,
}: CreateCommentParams): Promise<CommentMutationResponse> => {
  const response = await api.post<CommentMutationResponse>(
    `/api/posts/${slug}/comments`,
    { content },
  );
  return response.data;
};

export const updateComment = async ({
  slug,
  content,
  commentId,
}: UpdateCommentparams): Promise<CommentMutationResponse> => {
  const response = await api.patch<CommentMutationResponse>(
    `/api/posts/${slug}/comments/${commentId}`,
    { content },
  );
  return response.data;
};

export const deleteComment = async ({
  slug,
  commentId,
}: DeleteCommentParams): Promise<void> => {
  await api.delete(`/api/posts/${slug}/comments/${commentId}`);
};
