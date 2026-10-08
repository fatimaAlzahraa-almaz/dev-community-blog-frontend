"use client";

const UserCardSkeleton = () => {
  return (
    <div
      className="
        flex h-fit w-full max-w-220 flex-col gap-3
        rounded-md border bg-background
        p-4 py-4 text-primary shadow-sm
        
        lg:max-w-90
      "
    >
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />

        <div className="h-5 w-28 rounded-md bg-muted sm:w-36" />
      </div>

      <div className="h-9 w-full rounded-md bg-muted" />

      <div className="flex flex-col gap-3">
        <div className="h-5 w-3/4 rounded-md bg-muted" />
        <div className="h-5 w-1/2 rounded-md bg-muted" />

        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 rounded-md bg-muted" />
          <div className="h-5 w-32 rounded-md bg-muted sm:w-40" />
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
