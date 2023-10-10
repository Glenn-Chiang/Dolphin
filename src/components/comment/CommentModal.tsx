import React from "react";
import { CancelButton, SubmitButton } from "../buttons";
import Modal from "../Modal";
import { createComment } from "@/db/comments";
import { SubmitHandler, useForm } from "react-hook-form";
import { Post } from "@prisma/client";
import FormError from "../FormError";

type CommentModalProps = {
  close: () => void;
  post: Post;
};

type CommentFormValues = {
  content: string;
};

export default function CommentModal({ close, post }: CommentModalProps) {
  const { register, handleSubmit, formState: {errors} } = useForm<CommentFormValues>();

  const onSubmit: SubmitHandler<CommentFormValues> = (formValues) => {
    const { content } = formValues;
    createComment(post.id, content);
    close();
  };

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1>Share your thoughts</h1>
        <textarea
          autoFocus
          className="bg-slate-100 shadow rounded-md p-2"
          {...register("content", {
            required: "Your comment can't be empty",
          })}
          defaultValue={""}
        />
        {errors.content && <FormError>{errors.content.message}</FormError>}
        <div className="flex gap-2">
          <SubmitButton text="Post" />
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
}
