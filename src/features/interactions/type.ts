import type { Post } from "../posts/type";

export type InteractionParams = {
  slug: string;
};

export type InteractionResponse = {
  detail: string;
};

export type useLikePostParams = {
  slug: string;
  isLiked: boolean;
};

export type useBookmarkPostParams = {
  slug: string;
  isBookmarked: boolean;
};

export type InteractionsProps = {
  data: Post;
};
