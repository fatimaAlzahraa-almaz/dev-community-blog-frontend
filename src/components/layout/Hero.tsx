import url from "../../../public/blog.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PencilLine } from "lucide-react";
import { useAuthStore } from "@/features/auth/store";
const Hero = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const handleGetStartedClick = () => {
    router.push("/login");
  };
  const handleCreatPostClick = () => {
    router.push("/posts/new");
  };
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center px-2 sm:px-4 py-6 border-b-2">
      <div className="flex flex-col   gap-4 sm:gap-6 w-full sm:w-1/2">
        <div className="flex flex-col ">
          <p className="text-4xl sm:text-5xl font-bold text-primary">
            Write to think.
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-primary/70">
            Publish to connect.
          </p>
        </div>
        <p className="sm:text-lg">
          The blogging platform for developers and engineers. Start a blog for
          free, sharpen your ideas in public, and build a readership that stays
          yours.
        </p>
        {isLoggedIn ? (
          <button
            onClick={handleCreatPostClick}
            className=" text-sm font-semibold sm:text-lg text-white/96 bg-black/90 p-2 sm:py-3 sm:px-4 rounded-md cursor-pointer w-fit border border-white/60 flex gap-1 items-center"
          >
            Create Post
            <PencilLine className="w-4 text-white/96" />
          </button>
        ) : (
          <button
            onClick={handleGetStartedClick}
            className="text-sm font-semibold sm:text-lg text-white/96 bg-black/90 p-2 sm:py-3 sm:px-4 rounded-md cursor-pointer w-fit border border-white/60 flex gap-1 items-center"
          >
            Get started <PencilLine className=" w-3 sm:w-4 text-white/96" />
          </button>
        )}
      </div>
      <div className="w-full  sm:w-1/2   relative h-60 sm:h-90   ">
        <Image src={url} alt="icon" fill />
      </div>
    </div>
  );
};

export default Hero;
