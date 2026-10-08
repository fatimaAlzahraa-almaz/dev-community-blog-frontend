import type { PostDetailsProps } from "../type";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatDate";
import Interactions from "@/features/interactions/components/Interactions";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useDeletePost } from "@/hooks/useDeletePost";
import { getErrorMessage } from "@/lib/getErrorMessage";
const PostDetails = ({ data }: PostDetailsProps) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const deletePostMutation = useDeletePost();
  const isCurrentUser = data?.author.username === currentUser?.username;
  const handleUserClick = () => {
    router.push(`/users/${data?.author.username}`);
  };
  const handleEditeClick = () => {
    router.push(`/posts/${data?.slug}/edit`);
  };
  const handleDeleteClick = () => {
    deletePostMutation.mutate({ slug: data?.slug });
  };
  return (
    <div className="flex flex-col  rounded-t-md border-b w-full ">
      {data?.img && (
        <div className="w-full h-50 sm:h-70 relative  ">
          <Image
            className="object-cover rounded-t-md"
            src={data?.img}
            fill
            alt={data?.title}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 sm:gap-4 px-1 py-3 sm:p-6">
        <div className="flex   gap-2 items-center  sm:gap-3  w-full ">
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
              className="font-semibold text-primary  cursor-pointer w-fill hover:text-chart-5"
            >
              {data?.author.username}
            </p>
            <p className="text-sm text-muted-foreground ">
              {formatDate(data?.posted_at)}
            </p>
          </div>
          {isCurrentUser && (
            <div className="ml-auto  rounded-md">
              {" "}
              <button
                onClick={handleEditeClick}
                className="bg-chart-1/20 hover:bg-chart-1/40 rounded-tl-md rounded-bl-md p-1 sm:px-3 sm:py-2 cursor-pointer  "
              >
                Edit
              </button>
              <button
                disabled={deletePostMutation.isPending}
                onClick={handleDeleteClick}
                className="bg-red-200/30 hover:bg-red-200/60 rounded-tr-md rounded-br-md p-1 sm:px-3 sm:py-2 cursor-pointer text-red-600  "
              >
                {deletePostMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
        {deletePostMutation.isError && (
          <p className="text-red-600 text-sm">
            {getErrorMessage(deletePostMutation.error)}
          </p>
        )}
        <h3 className="text-2xl sm:text-5xl font-bold text-primary pt-2 ">
          {data?.title}
        </h3>
        <p className=" text-primary/70 cursor-pointer  bg-accent/80 hover:bg-accent p-1 sm:py-1 sm:px-2 w-fit  rounded-md text-sm">
          #{data?.category.title.toLowerCase()}
        </p>
        <p className=" sm:text-2xl sm:leading-8  text-primary whitespace-pre-wrap">
          {data?.content}
        </p>
        <Interactions data={data} />
      </div>
    </div>
  );
};

export default PostDetails;
