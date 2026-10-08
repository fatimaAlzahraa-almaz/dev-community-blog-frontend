"use client";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useCategories } from "@/hooks/useCategories";
import { getErrorMessage } from "@/lib/getErrorMessage";
const publishSchema = z.object({
  img: z.instanceof(File).nullable().optional(),
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  category: z
    .number({ message: "Category is required" })
    .min(1, "Category is required"),
});

type publishFormType = z.infer<typeof publishSchema>;

export default function Page() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const createPostMutation = useCreatePost();
  const { data } = useCategories();

  const onSubmit: SubmitHandler<publishFormType> = (data: publishFormType) => {
    createPostMutation.mutate(data);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files?.[0] || null;
    setValue("img", file, { shouldDirty: true });

    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("img", null, { shouldDirty: true });
    setImgUrl(null);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<publishFormType>({
    resolver: zodResolver(publishSchema),
  });

  return (
    <div className="bg-custom w-full min-h-[80vh] flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-background px-2 py-4 sm:p-6 rounded-md w-full sm:max-w-220 sm:my-5"
      >
        {imgUrl && (
          <div className="w-30 h-20 relative overflow-hidden">
            <Image
              className="object-cover"
              alt={"post image"}
              fill
              src={imgUrl}
            />
          </div>
        )}
        <input
          id="img"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {errors.img && (
          <p className="text-red-500 font-normal">{errors.img.message}</p>
        )}

        {!imgUrl && (
          <label
            htmlFor="img"
            className="border px-3 py-2 rounded-md cursor-pointer hover:bg-accent w-fit"
          >
            Add Cover Image
          </label>
        )}
        {imgUrl && (
          <button
            type="button"
            onClick={handleRemoveClick}
            className=" px-3 py-2 hover:bg-accent rounded-md cursor-pointer text-red-600 border w-fit"
          >
            Remove Image
          </button>
        )}

        <textarea
          {...register("title")}
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
          rows={1}
          className="resize-none text-2xl  sm:text-4xl font-bold overflow-hidden outline-none  "
          placeholder="New post title here..."
        ></textarea>
        {errors.title && (
          <p className="text-red-500 font-normal">{errors.title.message}</p>
        )}
        <select
          {...register("category", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className="bg-custom p-2 rounded-md text-primary w-fit"
        >
          <option value="">Select Category</option>
          {data &&
            data.results.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className="text-red-500 font-normal">{errors.category.message}</p>
        )}
        <textarea
          {...register("content")}
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
          rows={1}
          className="resize-none  font-mono py-2   overflow-hidden outline-none sm:text-lg min-h-[40vh] "
          placeholder="Write your post content here..."
        ></textarea>
        {errors.content && (
          <p className="text-red-500 font-normal">{errors.content.message}</p>
        )}
        {createPostMutation.isError && (
          <p className="text-red-500 font-normal">
            {getErrorMessage(createPostMutation.error)}
          </p>
        )}
        <button
          disabled={createPostMutation.isPending}
          className={
            createPostMutation.isPending
              ? "bg-chart-4  w-fit text-background rounded-md px-3 py-2 "
              : "bg-chart-4 cursor-pointer w-fit text-background rounded-md px-3 py-2 hover:bg-chart-5"
          }
          type="submit"
        >
          {createPostMutation.isPending ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
