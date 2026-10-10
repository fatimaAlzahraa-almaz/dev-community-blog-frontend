"use client";
import { use } from "react";
import CommentCard from "@/features/comments/components/CommentCard";
import { useComments } from "@/hooks/useComments";
import { usePost } from "@/hooks/usePost";
import PostDetails from "@/features/posts/components/PostDetails";
import CreateComment from "@/features/comments/components/CreateComment";
import UserCard from "@/features/users/components/UserCard";
import UserCardSkeleton from "@/components/ui/UserCardSkeleton";
import PostDetailsSkeleton from "@/components/ui/PostDetailsSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useUser } from "@/hooks/useUser";
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: comments } = useComments({ slug: slug });
  const {
    data: post,
    isLoading: isPostLoading,
    isError,
    error,
  } = usePost({ slug: slug });
  const authorUsername = post?.author?.username ?? "";
  const { data: user, isLoading: isUserLoading } = useUser({
    username: authorUsername,
  });

  return (
    <div className="w-full bg-background  flex justify-center min-h-screen ">
      <div className="w-full   lg:max-w-330 flex flex-col lg:flex-row items-center lg:justify-center lg:items-start gap-2 lg:gap-4  sm:p-2 md:p-4 ">
        {isPostLoading ? (
          <PostDetailsSkeleton />
        ) : isError ? (
          <ErrorMessage message={getErrorMessage(error)} />
        ) : (
          <div className=" w-full flex flex-col gap-2  max-w-220   bg-background rounded-md border p-1 shadow-sm">
            {post && <PostDetails data={post} />}
            <p className="text-primary text-lg font-bold p-2 sm:p-4">{`Top Comments (${post?.comments_count ?? 0})`}</p>
            <CreateComment slug={slug} />
            {comments && (
              <div className="flex flex-col w-full sm:gap-2 pb-8 sm:p-3">
                {comments?.results.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    data={{
                      ...comment,
                      slug: slug,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {isPostLoading ? (
          <UserCardSkeleton />
        ) : isUserLoading ? (
          <UserCardSkeleton />
        ) : (
          user && <UserCard data={user} />
        )}
      </div>
    </div>
  );
}
