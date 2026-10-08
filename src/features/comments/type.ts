export type PaginationResponse<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
};

export type Comment = {
  id: number;
  content: string;
  author: {
    username: string;
    profile_img: null | string;
  };
  created_at: string;
  parent: number | null;
};

export type MultipleComments = PaginationResponse<Comment>;

export type GetCommentsParams = {
  slug: string;
};

export type CreateCommentParams = {
  content: string;
  slug: string;
};

export type CommentMutationResponse = {
  id: number;
  content: string;
  parent: null | number;
  created_at: string;
};

export type UpdateCommentparams = {
  slug: string;
  content: string;
  commentId: number;
};
export type DeleteCommentParams = {
  slug: string;
  commentId: number;
};
export type DeletComment = {
  id: number;
  content: string;
  author: {
    username: string;
    profile_img: null | string;
  };
  created_at: string;
  parent: number | null;
  slug: string;
};
export type CommentCardParams = {
  data: DeletComment;
};
export type useCreateCommentProps = {
  slug: string;
  content: string;
};
