import { CommentCardParams } from "../type";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { getErrorMessage } from "@/lib/getErrorMessage";
const CommentCard = ({ data }: CommentCardParams) => {
  const router = useRouter();
  const deleteCommentMutation = useDeleteComment();
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = data?.author.username === currentUser?.username;
  const handleUserClick = () => {
    router.push(`/users/${data?.author.username}`);
  };
  const handleDeleteClick = () => {
    deleteCommentMutation.mutate({ commentId: data?.id, slug: data?.slug });
  };
  return (
    <div className="flex gap-1 sm:gap-2 w-full p-1 sm:p-2 ">
      <div
        onClick={handleUserClick}
        className="h-8 w-8 flex items-center justify-center bg-accent rounded-full overflow-hidden cursor-pointer shrink-0 relative"
      >
        {data?.author.profile_img ? (
          <Image
            className=" object-cover"
            src={data?.author.profile_img}
            alt={data?.author.username}
            fill
          />
        ) : (
          <User className="rounded-full  " />
        )}
      </div>
      <div className="text-primary flex flex-col px-1 sm:px-3 pt-1 pb-3 rounded-md    border border-primary/10   w-full">
        <div className="flex gap-2 items-center  ">
          <p
            onClick={handleUserClick}
            className="font-medium   hover:bg-primary/10 cursor-pointer p-1 rounded"
          >
            {data?.author.username}
          </p>
          <p className="text-xs text-accent-foreground pt-0.5">
            {formatDate(data?.created_at)}
          </p>
          {isCurrentUser && (
            <button
              disabled={deleteCommentMutation.isPending}
              onClick={handleDeleteClick}
              className=" rounded-md text-red-600 border px-2 py-1 cursor-pointer hover:bg-accent ml-auto"
            >
              {deleteCommentMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
        <p className="text-primary px-1">{data?.content}</p>
        {deleteCommentMutation.isError && (
          <p className="text-red-500 font-normal p-1">
            {getErrorMessage(deleteCommentMutation.error)}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
