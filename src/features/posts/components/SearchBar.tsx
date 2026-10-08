"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/posts/search?q=${searchQuery}`);
    setSearchQuery("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex  border rounded gap-2 w-[45vw] bg-secondary/5  "
    >
      <button
        type="submit"
        className="text-accent-foreground cursor-pointer px-1 py-1.5 sm:p-2 hover:bg-chart-1/17"
      >
        <Search />
      </button>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="w-full border-none outline-none text-accent-foreground "
        type="text"
        placeholder="Search..."
      ></input>
    </form>
  );
};

export default SearchBar;
