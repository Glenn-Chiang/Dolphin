"use client";

import { PostDetail } from "@/types";
import { SubmitButton } from "@/components/buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { editPost } from "@/db/posts";

type EditFormValues = {
  content: string;
};

export default function EditPostForm({ post }: { post: PostDetail }) {
  const { register, handleSubmit } = useForm<EditFormValues>();

  const onSubmit: SubmitHandler<EditFormValues> = async (formValues) => {
    const {content} = formValues
    await editPost(post.id, content)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4 flex flex-col gap-4">
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
          {...register("content", { required: "Content is required" })}
          defaultValue={post.content}
          className="shadow rounded-md bg-slate-100 p-2 h-40"
        />
      </div>
      <div>
        <SubmitButton text="Save" />
      </div>
    </form>
  );
}
