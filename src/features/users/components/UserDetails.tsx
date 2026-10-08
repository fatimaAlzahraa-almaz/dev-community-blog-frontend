"use client";
import type { UserDetailsParams } from "../type";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatJoinedDate } from "@/lib/formatDate";
import { Cake } from "lucide-react";
import { useFollow } from "@/hooks/useFollow";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/features/auth/store";
import { getErrorMessage } from "@/lib/getErrorMessage";
const UserDetails = ({ data }: UserDetailsParams) => {
  const followMutation = useFollow();
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = data?.username === currentUser?.username;
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const router = useRouter();
  const handleFollowClick = () => {
    !isLoggedIn
      ? router.push("/login")
      : followMutation.mutate({
          username: data?.username,
          is_following: data?.is_following,
        });
  };
  const handleEditeClick = () => {
    router.push(`/users/${data?.username}/settings`);
  };
  return (
    <div className="flex w-full flex-col text-primary  sm:items-center gap-3 border rounded-md px-3 sm:px-4 pb-10 pt-25 relative bg-background ">
      <div className="absolute -top-20 left-1 sm:left-1/2 sm:-translate-x-1/2 w-40 h-40 rounded-full bg-black/90 flex items-center justify-center ">
        <div className="w-37 h-37 rounded-full  flex items-center justify-center      relative overflow-hidden">
          {data?.profile_img ? (
            <Image
              src={data?.profile_img}
              fill
              alt={data?.username}
              className="object-cover"
            />
          ) : (
            <User className=" rounded-full bg-accent text-accent-foreground/80 w-36 h-36 " />
          )}
        </div>
      </div>
      <p className="font-bold text-2xl sm:text-3xl">{data?.name}</p>
      <p className="sm:text-lg">
        {data?.bio ? `${data?.bio}` : "404 bio not found"}
      </p>
      <div className="flex  gap-5">
        <p>{` ${data?.followers_count} followers`}</p>
        <p>{` ${data?.following_count} following`}</p>
      </div>
      <div className="flex items-center gap-2 text-primary/70 flex-wrap">
        <Cake className="w-5 sm:w-6" />
        <p>{`joined on ${formatJoinedDate(data?.date_joined)}`}</p>
        {followMutation.isError && (
          <p className="text-red-600 text-sm">
            {getErrorMessage(followMutation.error)}
          </p>
        )}
      </div>
      {isCurrentUser ? (
        <button
          onClick={handleEditeClick}
          className="bg-chart-4 text-background  p-1.5 sm:px-4 sm:py-2 rounded-md font-semibold cursor-pointer hover:bg-chart-5 absolute right-2 top-6 sm:right-6"
        >
          Edite profile
        </button>
      ) : (
        <button
          disabled={followMutation.isPending}
          onClick={handleFollowClick}
          className="bg-chart-4 text-background p-1.5 sm:px-4 sm:py-2 rounded-md font-semibold cursor-pointer hover:bg-chart-5 absolute right-2 top-6 sm:right-6"
        >
          {data?.is_following ? "unFollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserDetails;
