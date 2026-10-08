import { useFollow } from "@/hooks/useFollow";
import { useUser } from "@/hooks/useUser";
import type { UserCardParams } from "../type";
import Image from "next/image";
import { User } from "lucide-react";
import { formatJoinedDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/features/auth/store";
import { getErrorMessage } from "@/lib/getErrorMessage";
const UserCard = ({ username }: UserCardParams) => {
  const { data } = useUser({ username });
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const followMutation = useFollow();
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = data?.username === currentUser?.username;

  const handleUserClick = () => {
    router.push(`/users/${username}`);
  };
  const handleFollowClick = () => {
    !isLoggedIn
      ? router.push("/login")
      : data &&
        followMutation.mutate({
          username: username,
          is_following: data?.is_following,
        });
  };
  const handleEditProfileClick = () => {
    router.push(`/users/${username}/settings`);
  };
  return (
    <div className="flex flex-col  border rounded-md  p-4 gap-3 text-primary w-full max-w-220 lg:max-w-90 py-4  h-fit bg-background shadow-sm">
      <div className="flex gap-2 items-center ">
        <div
          onClick={handleUserClick}
          className="w-10 h-10 rounded-full  flex items-center justify-center relative bg-accent cursor-pointer overflow-hidden"
        >
          {data?.profile_img ? (
            <Image
              src={data?.profile_img}
              fill
              alt={data?.username}
              className="object-cover"
            />
          ) : (
            <User className=" rounded-full  text-accent-foreground" />
          )}
        </div>

        <p
          onClick={handleUserClick}
          className="font-semibold text-lg cursor-pointer hover:text-chart-5"
        >
          {data?.name}
        </p>
      </div>
      {isCurrentUser ? (
        <button
          onClick={handleEditProfileClick}
          className="w-full bg-chart-4 rounded-md hover:bg-chart-5 text-background font-semibold py-1.5 cursor-pointer"
        >
          Edit Profile
        </button>
      ) : (
        <button
          disabled={followMutation.isPending}
          onClick={handleFollowClick}
          className="w-full bg-chart-4 rounded-md hover:bg-chart-5 text-background font-semibold py-1.5 cursor-pointer"
        >
          {data?.is_following ? "unFollow" : "Follow"}
        </button>
      )}
      {followMutation.isError && (
        <p className="text-red-600 text-sm">
          {getErrorMessage(followMutation.error)}
        </p>
      )}
      <div className="flex flex-col gap-3">
        <p>{data?.bio}</p>
        <p className="flex flex-col">
          <span className="font-semibold">JOINED</span>
          {data && formatJoinedDate(data?.date_joined)}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
