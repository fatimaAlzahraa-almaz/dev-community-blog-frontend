import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center h-10 w-11 bg-black/90 text-white/95 rounded font-semibold text-base sm:text-lg cursor-pointer"
    >
      DEV
    </Link>
  );
};

export default Logo;
