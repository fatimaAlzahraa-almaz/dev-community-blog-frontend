import { Cake } from "lucide-react";

const UserDetailsSkeleton = () => {
  return (
    <div
      className="
        relative flex w-full flex-col items-start gap-3
        rounded-md border bg-background
        px-3 pb-10 pt-25
        text-primary
 
        sm:items-center sm:px-4
      "
    >
      <div
        className="
          absolute -top-20 left-1
          flex h-40 w-40 items-center justify-center
          rounded-full bg-muted
          sm:left-1/2 sm:-translate-x-1/2
        "
      >
        <div className="h-37 w-37 rounded-full bg-muted-foreground/20" />
      </div>

      <div className="h-8 w-40 rounded-md bg-muted sm:h-9 sm:w-48" />

      <div className="h-5 w-56 rounded-md bg-muted sm:w-72" />

      <div className="flex gap-5">
        <div className="h-5 w-24 rounded-md bg-muted" />
        <div className="h-5 w-24 rounded-md bg-muted" />
      </div>

      <div className="flex items-center gap-2">
        <Cake className="h-5 w-5 text-muted-foreground/40 sm:h-6 sm:w-6" />
        <div className="h-5 w-36 rounded-md bg-muted" />
      </div>

      <div
        className="
          absolute right-2 top-6
          h-9 w-24 rounded-md bg-muted
          sm:right-6 sm:h-10 sm:w-32
        "
      />
    </div>
  );
};

export default UserDetailsSkeleton;
