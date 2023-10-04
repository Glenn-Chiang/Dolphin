"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import { createComment } from "@/db/comments";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type CommentFormValues = {
  content: string;
};

export default function CommentForm() {
  const params = useParams();
  const postId = Number(params.id);

  const { register, handleSubmit, reset } = useForm<CommentFormValues>();

  const onSubmit: SubmitHandler<CommentFormValues> = (formValues) => {
    const { content } = formValues;
    createComment(postId, content);
    reset();
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white rounded-md p-4 shadow"
    >
      <h2>Share your thoughts</h2>
      <textarea
        {...register("content", {
          required: "You cannot post a blank comment",
        })}
        defaultValue={""}
        className="bg-slate-100 rounded-md p-2"
      />
      <div className="flex gap-2">
        <SubmitButton text="Comment" />
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
