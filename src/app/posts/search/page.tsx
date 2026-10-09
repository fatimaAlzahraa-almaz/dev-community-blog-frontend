import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";
import { Spinner } from "@/components/ui/Spinner";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] w-full items-center justify-center bg-background">
          <Spinner />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}