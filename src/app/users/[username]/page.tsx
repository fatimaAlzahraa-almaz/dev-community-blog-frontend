"use client";
import UserDetails from "@/features/users/components/UserDetails";
import { use } from "react";
import { useUser } from "@/hooks/useUser";
import { usePosts } from "@/hooks/usePosts";
import UserPostCard from "@/features/posts/components/UserPostCard";
import UserDetailsSkeleton from "@/components/ui/UserDetailsSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: UserError,
  } = useUser({
    username: username,
  });
  console.log(user);
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: PostsError,
  } = usePosts({
    author: username,
  });
  return (
    <div className="bg-background w-full flex justify-center min-h-screen relative ">
      <div className="w-full h-40 absolute bg-black/90"></div>
      <div className="w-full flex flex-col gap-4 sm:max-w-220 mt-30 pb-4">
        {isUserLoading ? (
          <UserDetailsSkeleton />
        ) : isUserError ? (
          <ErrorMessage message={getErrorMessage(UserError)} />
        ) : (
          user && <UserDetails data={user} />
        )}

        <div className="w-full flex flex-col gap-4 border-3 rounded-md px-1 sm:px-4 pb-4 pt-10 border-chart-4 relative bg-background">
          <p className="bg-chart-4 w-fit font-semibold text-background rounded-md px-4 py-2 absolute -top-3">
            Posts
          </p>
          {isPostsLoading ? (
            <div className="flex justify-center w-full min-h-[30vh] items-center">
              <p className="text-primary text-lg sm:text-xl">
                Loading posts...
              </p>
            </div>
          ) : isPostsError ? (
            <ErrorMessage message={getErrorMessage(PostsError)} />
          ) : posts && posts?.pages[0]?.results?.length > 0 ? (
            posts?.pages[0].results.map((post) => (
              <UserPostCard key={post.id} data={post} />
            ))
          ) : (
            <p className="text-primary text-center pb-5 text-lg sm:text-xl ">
              No posts published yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
