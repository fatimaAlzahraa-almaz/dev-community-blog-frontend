"use client";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/features/posts/components/PostCard";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
const page = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? undefined;
  const { data, isLoading, isError, error } = usePosts({ search: q });
  return (
    <div className="flex w-full justify-center bg-background min-h-[80vh]">
      {isLoading ? (
        <div className="flex justify-center w-full min-h-[80vh] items-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : data?.pages[0].results.length === 0 ? (
        <p className="text-2xl text-center my-auto">
          No results found for <span className="font-semibold">{q}</span>
        </p>
      ) : (
        <div className="flex flex-col w-full sm:max-w-220 gap-4 py-4">
          <p className=" text-xl sm:text-2xl font-semibold p-2">{`${data?.pages[0].results.length ?? ""} Search Results`}</p>
          <div className="flex flex-col w-full gap-2">
            {data?.pages.map((page) =>
              page?.results.map((post) => {
                return <PostCard key={post.id} data={post} />;
              }),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
