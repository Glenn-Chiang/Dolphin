"use client";

import { PostDetail } from "@/lib/types";
import { SubmitButton } from "@/components/buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { editPost } from "@/db/posts";
import Link from "next/link";
import DolphinIcon from "@/components/DolphinIcon";
import { useRouter } from "next/navigation";
import FormError from "@/components/FormError";

type EditFormValues = {
  content: string;
};

export default function EditPostForm({ post }: { post: PostDetail }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<EditFormValues> = async (formValues) => {
    const { content } = formValues;
    await editPost(post.id, content);
    router.push(`/post/${post.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-xl shadow flex flex-col gap-4"
    >
      <Link
        href={`/pods/${post.podId}`}
        className="text-sky-500 font-medium -m-2 p-2 flex gap-2 items-center w-max rounded-xl hover:bg-sky-200"
      >
        <DolphinIcon />
        {post.pod.name}
      </Link>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Title</label>
        <span>{post.title}</span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Your post can't be empty" })}
          defaultValue={post.content}
          className="shadow rounded-md bg-slate-100 p-2 h-40"
        />
      </div>
      {errors.content && <FormError>{errors.content.message}</FormError>}
      <div>
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
