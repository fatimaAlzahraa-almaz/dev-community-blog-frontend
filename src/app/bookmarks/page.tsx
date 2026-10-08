"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import UserPostCard from "@/features/posts/components/UserPostCard";
import { Spinner } from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthStore } from "@/features/auth/store";
import Link from "next/link";
export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitialized;
  const { data, isLoading, isError, error } = useBookmarks();
  return (
    <div className="flex justify-center bg-background min-h-[80vh] w-full">
      {!isInitialized ? (
        <div className="flex justify-center w-full min-h-[80vh] items-center ">
          <Spinner />
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-3 px-4 text-center">
          <p className="text-2xl font-semibold text-primary">Login required</p>
          <p className="text-muted-foreground">
            Please sign in to view your bookmarks.
          </p>
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Go to login
          </Link>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center w-full min-h-[80vh] items-center ">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : !data || data.results.length === 0 ? (
        <p className="text-2xl text-center my-auto">No bookmarks found</p>
      ) : (
        <div className="text-primary flex flex-col gap-4 py-4 w-full sm:max-w-220 px-1">
          <p className=" text-xl sm:text-2xl font-semibold">My Bookmarks</p>
          <div className="flex flex-col gap-2">
            {data.results.map((el) => (
              <UserPostCard key={el.id} data={el} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
