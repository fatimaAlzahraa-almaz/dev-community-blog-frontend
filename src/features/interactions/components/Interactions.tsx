import type { InteractionsProps } from "../type";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Bookmark } from "lucide-react";
import { useLikePost } from "@/hooks/useLikepost";
import { useBookmarkPost } from "@/hooks/useBookmarkPost";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { getErrorMessage } from "@/lib/getErrorMessage";
const Interactions = ({ data }: InteractionsProps) => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const likePostMutation = useLikePost();
  const bookmarkPostMutation = useBookmarkPost();
  const handleLikeClick = () => {
    !isLoggedIn
      ? router.push("/login")
      : likePostMutation.mutate({
          slug: data?.slug,
          isLiked: data?.is_liked,
        });
  };
  const handleBookmarkClick = () => {
    !isLoggedIn
      ? router.push("/login")
      : bookmarkPostMutation.mutate({
          slug: data?.slug,
          isBookmarked: data?.is_bookmarked,
        });
  };
  const handleCommentClick = () => {
    router.push(`/posts/${data?.slug}`);
  };
  return (
    <div className=" w-full text-secondary-foreground flex justify-between items-center flex-wrap ">
      <div className="flex gap-1 sm:gap-6 text-primary">
        <button
          disabled={likePostMutation.isPending}
          onClick={handleLikeClick}
          className="flex gap-1 items-center hover:bg-accent/90 p-1 sm:p-2 rounded cursor-pointer "
        >
          <Heart
            className={
              data?.is_liked ? `w-5 h-5 fill-red-400 text-red-400` : `w-5 h-5  `
            }
          />
          <p className="text-sm sm:text-normal">{data?.likes_count} likes</p>
        </button>
        <button
          onClick={handleCommentClick}
          className="flex gap-1 items-center hover:bg-accent/90 p-1 sm:p-2 rounded cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <p className="text-sm sm:text-normal">
            {data?.comments_count} comments
          </p>
        </button>
      </div>
      <button
        disabled={bookmarkPostMutation.isPending}
        onClick={handleBookmarkClick}
        className="cursor-pointer hover:bg-chart-1/17 hover:text-chart-5 p-1 sm:p-2 rounded"
      >
        <Bookmark
          className={
            data?.is_bookmarked
              ? `w-5 h-5 fill-blue-900 text-blue-900`
              : `w-5 h-5  `
          }
        />
      </button>
      {likePostMutation.isError && (
        <p className="text-red-500 font-normal ">
          {getErrorMessage(likePostMutation.error)}
        </p>
      )}
      {bookmarkPostMutation.isError && (
        <p className="text-red-500 font-normal ">
          {getErrorMessage(bookmarkPostMutation.error)}
        </p>
      )}
    </div>
  );
};

export default Interactions;
