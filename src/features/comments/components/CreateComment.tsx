"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useAuthStore } from "@/features/auth/store";
import { getErrorMessage } from "@/lib/getErrorMessage";
const CreateComment = ({ slug }: { slug: string }) => {
  const { data } = useCurrentUser();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const [comment, setComment] = useState("");
  const commentMutation = useCreateComment();
  const handleSubmitClick = () => {
    commentMutation.mutate({ slug: slug, content: comment });
    setComment("");
  };

  return (
    <div className="w-full flex gap-2 p-2 sm:p-5 ">
      <div className="w-8 h-8 rounded-full  flex items-center justify-center bg-accent cursor-pointer relative overflow-hidden">
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
      <div className="flex flex-col w-full gap-3 ">
        <textarea
          disabled={!isLoggedIn}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={3}
          className="border border-primary/25 focus:outline-chart-5 w-full p-2 rounded-md resize-none"
          placeholder="Add to the discussion"
        ></textarea>
        {commentMutation.isError && (
          <p className="text-red-500 font-normal">
            {getErrorMessage(commentMutation.error)}
          </p>
        )}
        <button
          disabled={!isLoggedIn || commentMutation.isPending || !comment}
          onClick={handleSubmitClick}
          className={
            isLoggedIn
              ? "bg-chart-4 text-primary-foreground font-semibold rounded-md px-4 py-2 cursor-pointer hover:bg-chart-5 w-fit"
              : "bg-chart-5 text-primary-foreground font-semibold rounded-md px-4 py-2 cursor-not-allowed  w-fit"
          }
        >
          {commentMutation.isPending ? "Posting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
