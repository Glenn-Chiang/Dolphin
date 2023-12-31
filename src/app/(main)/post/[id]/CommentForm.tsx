"use client";

import FormError from "@/components/FormError";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { createComment } from "@/actions/comments";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

type CommentFormValues = {
  content: string;
};

export default function CommentForm() {
  const params = useParams();
  const postId = Number(params.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>();

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<CommentFormValues> = async (formValues) => {
    setIsPending(true);
    const { content } = formValues;
    await createComment(postId, content);
    setIsPending(false)
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
          required: "Your comment can't be empty",
        })}
        defaultValue={""}
        className="bg-slate-100 rounded-md p-2"
      />
      {errors.content && <FormError>{errors.content.message}</FormError>}
      <div className="flex gap-2">
        <SubmitButton isPending={isPending}>Comment</SubmitButton>
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
