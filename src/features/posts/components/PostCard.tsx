import type { PostCardProps } from "../type";
import Image from "next/image";
import { User } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import CommentCard from "@/features/comments/components/CommentCard";
import { useComments } from "@/hooks/useComments";
import Interactions from "@/features/interactions/components/Interactions";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
const PostCard = ({ data }: PostCardProps) => {
  const router = useRouter();
  const { data: comments, isError, error } = useComments({ slug: data?.slug });
  const handlePostClick = () => {
    router.push(`/posts/${data?.slug}`);
  };
  const handleUserClick = () => {
    router.push(`/users/${data?.author.username}`);
  };
  const handleCommentClick = () => {
    router.push(`/posts/${data?.slug}`);
  };
  return (
    <div className="flex flex-col   border rounded-md shadow-sm bg-background w-full  h-fit ">
      {data?.img && (
        <div
          onClick={handlePostClick}
          className="w-full h-50 sm:h-60 relative rounded-t-md cursor-pointer"
        >
          <Image
            className="object-cover rounded-t-md"
            src={data?.img}
            fill
            alt={data?.title}
          />
        </div>
      )}
      <div className="flex flex-col  gap-2 px-2 py-3 sm:p-4">
        <div className="flex    items-center gap-3  w-fit ">
          <div
            className="w-10 h-10 rounded-full  flex items-center justify-center bg-accent cursor-pointer relative overflow-hidden"
            onClick={handleUserClick}
          >
            {data?.author.profile_img ? (
              <Image
                src={data?.author.profile_img}
                fill
                alt={data?.author.username}
                className="object-cover"
              />
            ) : (
              <User className=" rounded-full  text-accent-foreground" />
            )}
          </div>
          <div className="flex flex-col ">
            <p
              onClick={handleUserClick}
              className="font-semibold text-primary hover:text-foreground cursor-pointer w-fill "
            >
              {data?.author.username}
            </p>
            <p className="text-sm text-muted-foreground ">
              {formatDate(data?.posted_at)}
            </p>
          </div>
        </div>
        <h3
          onClick={handlePostClick}
          className="text-xl sm:text-3xl font-semibold text-primary cursor-pointer hover:text-chart-5 "
        >
          {data?.title}
        </h3>
        <p className="text-sm text-primary/70   bg-chart-1/17  rounded-md py-1 px-2 w-fit ">
          #{data?.category.title.toLowerCase()}
        </p>
        <Interactions data={data} />
        <div className="flex flex-col sm:gap-1">
          {isError ? (
            <ErrorMessage message={getErrorMessage(error)} />
          ) : (
            comments &&
            comments?.results.length > 0 &&
            comments?.results.map(
              (comment, index) =>
                index < 2 && (
                  <CommentCard
                    key={comment.id}
                    data={{
                      ...comment,
                      slug: data?.slug,
                    }}
                  />
                ),
            )
          )}
          {comments && comments?.results.length > 2 && (
            <p
              onClick={handleCommentClick}
              className="text-primary font-semibold hover:bg-accent w-fit p-2 rounded-md cursor-pointer text-sm sm:text-base"
            >
              see all {comments?.results.length} comments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
