"use client";

const PostDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 max-w-220 bg-background rounded-md border p-1 shadow-sm animate-pulse">
      <div className="flex flex-col gap-4 p-3 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-muted shrink-0" />

          <div className="flex flex-col gap-2">
            <div className="h-4 sm:h-5 w-24 sm:w-32 rounded-md bg-muted" />
            <div className="h-3 sm:h-4 w-20 sm:w-28 rounded-md bg-muted" />
          </div>
        </div>

        <div className="w-full h-45 sm:h-60 md:h-75 rounded-md bg-muted" />

        <div className="flex flex-col gap-2">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-11/12 rounded-md bg-muted" />
          <div className="h-4 w-4/5 rounded-md bg-muted" />
          <div className="h-4 w-2/3 rounded-md bg-muted" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-4">
            <div className="h-8 w-16 rounded-md bg-muted" />
            <div className="h-8 w-16 rounded-md bg-muted" />
          </div>

          <div className="h-8 w-8 rounded-md bg-muted" />
        </div>
      </div>

      <div className="h-7 sm:h-8 w-48 sm:w-56 rounded-md bg-muted p-2 sm:p-4 mx-2" />

      <div className="flex flex-col gap-3 p-2 sm:p-4">
        <div className="h-24 sm:h-28 w-full rounded-md bg-muted" />

        <div className="flex justify-end">
          <div className="h-9 sm:h-10 w-24 sm:w-28 rounded-md bg-muted" />
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 pb-8 p-2 sm:p-3">
        <div className="flex gap-3 border-b pb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted shrink-0" />

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-28 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-3/4 rounded-md bg-muted" />
          </div>
        </div>

        <div className="flex gap-3 border-b pb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted shrink-0" />

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-24 rounded-md bg-muted" />
            <div className="h-4 w-11/12 rounded-md bg-muted" />
            <div className="h-4 w-1/2 rounded-md bg-muted" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted shrink-0" />

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-32 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-2/3 rounded-md bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
