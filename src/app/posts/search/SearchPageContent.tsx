"use client";

import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/features/posts/components/PostCard";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? undefined;

  const { data, isLoading, isError, error } = usePosts({
    search: q,
  });

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex min-h-[80vh] w-full justify-center bg-background">
      {isLoading ? (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : posts.length === 0 ? (
        <p className="my-auto text-center text-2xl">
          No results found for{" "}
          <span className="font-semibold">{q}</span>
        </p>
      ) : (
        <div className="flex w-full flex-col gap-4 py-4 sm:max-w-220">
          <p className="p-2 text-xl font-semibold sm:text-2xl">
            {data?.pages[0]?.count ?? posts.length} Search Results
          </p>

          <div className="flex w-full flex-col gap-2">
            {posts.map((post) => (
              <PostCard key={post.id} data={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}