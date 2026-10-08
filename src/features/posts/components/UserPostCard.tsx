import type { PostCardProps } from "../type";
import Image from "next/image";
import { User } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import Interactions from "@/features/interactions/components/Interactions";
import Link from "next/link";
const UserPostCard = ({ data }: PostCardProps) => {
  return (
    <div className="flex flex-col   border rounded-md shadow-sm bg-background">
      <div className="flex flex-col  gap-2 px-2 py-3 sm:p-4">
        <div className="flex    items-center gap-2 sm:gap-3  w-fit ">
          <Link
            href={`/users/${data?.author.username}`}
            aria-label={`Open ${data?.author.username} profile`}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-accent cursor-pointer relative overflow-hidden"
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
          </Link>
          <div className="flex flex-col ">
            <Link
              href={`/users/${data?.author.username}`}
              className="font-semibold text-primary hover:text-foreground w-fill "
            >
              {data?.author.username}
            </Link>
            <p className="text-sm text-muted-foreground ">
              {formatDate(data?.posted_at)}
            </p>
          </div>
        </div>
        <Link
          href={`/posts/${data?.slug}`}
          className="text-xl sm:text-3xl font-semibold text-primary hover:text-chart-5 "
        >
          {data?.title}
        </Link>
        <p className="text-sm bg-chart-1/17  rounded-md p-1 sm:py-1 sm:px-2 w-fit">
          #{data?.category.title.toLowerCase()}
        </p>
        <Interactions data={data} />
      </div>
    </div>
  );
};

export default UserPostCard;
