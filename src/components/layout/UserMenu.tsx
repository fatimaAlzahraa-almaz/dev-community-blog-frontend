"use client";
import React from "react";
import { useRouter } from "next/navigation";
type UserMenuProps = {
  IsMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | undefined;
};
import { useAuthStore } from "@/features/auth/store";
import { useTheme } from "next-themes";
import { logout } from "@/features/auth/api";
import { useQueryClient } from "@tanstack/react-query";
const UserMenu = ({ setIsMenuOpen, IsMenuOpen, username }: UserMenuProps) => {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccsessToken);
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  const isLogin = isInitialized && accessToken !== null;
  const router = useRouter();
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    router.push(`/users/${username}`);
    setIsMenuOpen(false);
  };

  const handleCreatePostClick = () => {
    router.push("/posts/new");
    setIsMenuOpen(false);
  };

  const handleBookmarksClick = () => {
    router.push("/bookmarks");
    setIsMenuOpen(false);
  };

  const handleSettingsClick = () => {
    router.push(`/users/${username}/settings`);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    router.push("/login");
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    router.push("/signup");
    setIsMenuOpen(false);
  };
  const handleLogoutClick = async () => {
    try {
      await logout();
    } finally {
      queryClient.removeQueries({
        queryKey: ["me", accessToken],
      });
      clearAccessToken();
      setIsMenuOpen(false);
      router.push("/login");
    }
  };

  return (
    <>
      {IsMenuOpen && (
        <>
          <div
            onClick={() => setIsMenuOpen(false)}
            className="w-full h-screen  absolute z-50  top-0 right-0"
          ></div>
          <div className="absolute border p-2 rounded text-primary/70 shadow-sm   sm:w-60 z-51 top-16  sm:right-0 w-[95%] mt-2 bg-background">
            {isLogin && (
              <ul className="flex flex-col   rounded">
                <li
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleProfileClick}
                >
                  {username}
                </li>
                <li className="border-b-2 my-2"></li>
                <li
                  className="p-2  hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleCreatePostClick}
                >
                  Create Post
                </li>
                <li
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleBookmarksClick}
                >
                  Bookmarks
                </li>
                <li
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleSettingsClick}
                >
                  Settings
                </li>
                <li
                  onClick={handleThemeToggle}
                  className="p-2  hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                >
                  {theme == "light" ? "Dark Theme" : "Light Theme"}
                </li>
                <li className="border-b-2 my-2"></li>
                <li
                  onClick={handleLogoutClick}
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                >
                  Log Out
                </li>
              </ul>
            )}

            {!isLogin && (
              <ul className="flex flex-col  rounded sm:hidden">
                <li
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleLoginClick}
                >
                  Log In
                </li>
                <li
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                  onClick={handleSignupClick}
                >
                  Create account
                </li>
                <li className="border-b-2 my-2"></li>
                <li
                  onClick={handleThemeToggle}
                  className="p-2   hover:bg-chart-1/15 hover:text-chart-5 hover:underline cursor-pointer rounded"
                >
                  {theme == "light" ? "Dark Theme" : "Light Theme"}
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserMenu;
