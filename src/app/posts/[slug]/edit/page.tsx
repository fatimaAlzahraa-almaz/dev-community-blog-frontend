"use client";

import { use, useEffect, useRef } from "react";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { useCategories } from "@/hooks/useCategories";
import { usePost } from "@/hooks/usePost";
import { Spinner } from "@/components/ui/Spinner";
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

type EditFormProps = {
  slug: string;
  post: {
    title: string;
    content: string;
    img: string | null;
    category: {
      id: number;
    };
  };
};

function EditForm({ slug, post }: EditFormProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(post.img ?? null);
  const [removeImg, setRemoveImg] = useState<boolean>(false);
  const updatePostMutation = useUpdatePost();
  const { data: categories } = useCategories();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<publishFormType>({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      category: post.category.id,
      img: null,
    },
  });

  const titleField = register("title");
  const contentField = register("content");

  useEffect(() => {
    const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
      if (!textarea) return;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    resizeTextarea(titleRef.current);
    resizeTextarea(contentRef.current);
  }, [post.title, post.content]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("img", file, { shouldDirty: true });

    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("img", null, { shouldDirty: true });
    setImgUrl(null);
    setRemoveImg(true);
  };

  const onSubmit: SubmitHandler<publishFormType> = (data) => {
    updatePostMutation.mutate({
      title: data.title,
      content: data.content,
      category: data.category,
      img: data.img,
      slug,
      remove_img: removeImg,
    });
  };

  return (
    <div className="bg-custom w-full min-h-[80vh]  flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-background px-2 py-4 sm:p-6 rounded-md w-full sm:max-w-220 sm:my-5"
      >
        {imgUrl && (
          <div className="w-30 h-20 relative overflow-hidden">
            <Image
              className="object-cover"
              alt="post image"
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
          {...titleField}
          ref={(element) => {
            titleField.ref(element);
            titleRef.current = element;
          }}
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
          rows={1}
          className="resize-none text-2xl  sm:text-4xl font-bold overflow-hidden outline-none "
          placeholder="New post title here..."
        />
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
          {categories &&
            categories.results.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className="text-red-500 font-normal">{errors.category.message}</p>
        )}

        <textarea
          {...contentField}
          ref={(element) => {
            contentField.ref(element);
            contentRef.current = element;
          }}
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
          rows={1}
          className="resize-none  font-mono py-2   overflow-hidden outline-none sm:text-lg min-h-[40vh] "
          placeholder="Write your post content here..."
        />
        {errors.content && (
          <p className="text-red-500 font-normal">{errors.content.message}</p>
        )}
        {updatePostMutation.isError && (
          <p className="text-red-500 font-normal">
            {getErrorMessage(updatePostMutation.error)}
          </p>
        )}

        <button
          disabled={updatePostMutation.isPending}
          className={
            updatePostMutation.isPending
              ? "bg-chart-4  w-fit text-background rounded-md px-3 py-2 "
              : "bg-chart-4 cursor-pointer w-fit text-background rounded-md px-3 py-2 hover:bg-chart-5"
          }
          type="submit"
        >
          {updatePostMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: post } = usePost({ slug });

  if (!post) {
    return (
      <div className="bg-custom w-full min-h-[80vh] flex items-center justify-center text-primary">
        <Spinner />
      </div>
    );
  }

  return <EditForm slug={slug} post={post} />;
}
