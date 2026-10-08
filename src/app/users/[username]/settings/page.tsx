"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useEditeProfile } from "@/hooks/useEditeProfile";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Spinner } from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
const page = () => {
  const { data, isLoading, isError, error } = useCurrentUser();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const editeProfileMutation = useEditeProfile();
  useEffect(() => {
    if (data) {
      setName(data?.name);
      setBio(data?.bio);
    }
  }, [data]);
  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editeProfileMutation.mutate({
      name: name,
      bio: bio,
      profile_img: img ?? undefined,
      username: data?.username ?? "",
    });
  };
  return (
    <div className="flex sm:items-center justify-center min-h-[85vh] w-full bg-background">
      {isLoading ? (
        <div className="flex justify-center w-full min-h-[80vh] items-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : (
        <div className="text-primary flex flex-col gap-4 sm:border rounded-md px-4 py-6 sm:py-10  bg-background sm:shadow-sm w-full sm:max-w-140 sm:mx-2">
          <p className="text-2xl font-bold">Edite profile</p>
          <form
            onSubmit={handleSubmitClick}
            className="flex flex-col gap-2 w-full font-semibold text-primary"
          >
            <label htmlFor="img">Profile Image</label>
            <input
              id="image"
              className="border  p-2 h-12 rounded  font-normal file:bg-chart-4 file:text-background file:border-0 file:rounded file:px-4 file:py-1 file:cursor-pointer file:hover:bg-chart-5"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="name">Name</label>
            <input
              className="border h-10 rounded p-2 font-normal "
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="bio">Bio</label>
            <textarea
              className="border min-h-25 resize-none rounded p-2 font-normal "
              rows={3}
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            {editeProfileMutation.isError && (
              <p className="text-red-400 font-normal w-full">
                {getErrorMessage(editeProfileMutation.error)}
              </p>
            )}
            <button
              disabled={editeProfileMutation.isPending}
              className={
                editeProfileMutation.isPending
                  ? " bg-chart-4 text-background h-10 rounded mt-4 "
                  : "cursor-pointer bg-chart-4 text-background h-10 rounded mt-4 hover:bg-chart-5"
              }
              type="submit"
            >
              {editeProfileMutation.isPending ? "Saving..." : "Save Change"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
