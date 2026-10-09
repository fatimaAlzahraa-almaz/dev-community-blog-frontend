"use client";
import SearchBar from "../../features/posts/components/SearchBar";
import { Moon, Sun, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import UserMenu from "./UserMenu";
import Link from "next/link";
import Logo from "./Logo";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/features/auth/store";
import { getImageUrl } from "@/lib/utils";
const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data } = useCurrentUser();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const avatarSrc = getImageUrl(data?.profile_img);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleAvatarClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-background text-foreground flex justify-between h-16 px-1 sm:px-4 items-center border-b-2 relative text-sm sm:text-base">
      <ul className="flex gap-2 sm:ap-4 items-center ">
        <li>
          <Logo />
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
      {!isLoggedIn && (
        <ul className="flex  gap-2 sm:gap-3 items-center  ">
          <li className="hidden sm:flex">
            <Link
              href="/login"
              className=" text-accent-foreground cursor-pointer hover:text-chart-4 hover:bg-chart-1/17 px-1 py-2 sm:p-2 rounded hover:underline"
            >
              Login
            </Link>
          </li>
          <li className="hidden sm:flex">
            <Link
              href="/signup"
              className=" text-chart-4 font-medium border border-chart-4 rounded px-1 py-2 sm:p-2 cursor-pointer hover:bg-chart-4 hover:text-background hover:underline"
            >
              Create account
            </Link>
          </li>
          <li
            onClick={handleThemeToggle}
            className=" bg-accent border p-2 rounded-full cursor-pointer hidden sm:flex"
          >
            {mounted ? (
              theme == "light" ? (
                <Moon className=" text-accent-foreground/90  " />
              ) : (
                <Sun className=" text-accent-foreground/90  " />
              )
            ) : (
              <span className="inline-block h-6 w-6" aria-hidden="true" />
            )}
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <ul className="hidden sm:flex  gap-3 items-center ">
          <li>
            <Link
              href="/posts/new"
              className="text-chart-4 font-medium border border-chart-4 rounded py-2 px-3 cursor-pointer hover:bg-chart-4 hover:text-background hover:underline"
            >
              Create Post
            </Link>
          </li>
          <li
            onClick={handleAvatarClick}
            className="w-10 h-10 bg-accent  rounded-full border cursor-pointer flex items-center justify-center overflow-hidden text-accent-foreground relative"
          >
            {isLoggedIn && avatarSrc ? (
              <Image
                className="object-cover"
                src={avatarSrc}
                alt="profile img"
                fill
              />
            ) : (
              <User />
            )}
          </li>
          <li
            onClick={handleThemeToggle}
            className="bg-accent p-2 rounded-full cursor-pointer hidden sm:flex"
          >
            {mounted ? (
              theme == "light" ? (
                <Moon className=" text-accent-foreground/90  " />
              ) : (
                <Sun className=" text-accent-foreground/90  " />
              )
            ) : (
              <span className="inline-block h-6 w-6" aria-hidden="true" />
            )}
          </li>
        </ul>
      )}
      <ul className="flex sm:hidden   items-center ">
        <li
          onClick={handleAvatarClick}
          className=" w-10 h-10 bg-accent rounded-full border cursor-pointer flex items-center justify-center overflow-hidden text-accent-foreground relative"
        >
          {isLoggedIn && avatarSrc ? (
            <Image
              className="object-cover"
              src={avatarSrc}
              alt="profile img"
              fill
            />
          ) : (
            <User />
          )}
        </li>
      </ul>
      <UserMenu
        IsMenuOpen={isUserMenuOpen}
        setIsMenuOpen={setIsUserMenuOpen}
        username={data?.username}
      />
    </nav>
  );
};

export default Navbar;
