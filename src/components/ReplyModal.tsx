"use client";

import { Comment } from "@prisma/client";
import Modal from "./Modal";
import { SubmitButton } from "./buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { createReply } from "@/actions/comments";
import FormError from "./FormError";

type ReplyModalProps = {
  close: () => void;
  comment: Comment;
};

type ReplyFormValues = {
  content: string;
};

export default function ReplyModal({ close, comment }: ReplyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyFormValues>();

  const onSubmit: SubmitHandler<ReplyFormValues> = async (formValues) => {
    const { content } = formValues;
    if (!comment.postId) return
    await createReply(comment.postId, comment.id, content);
    close();
  };

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2>Reply to </h2>
        <p>{comment.content}</p>
        <textarea
          {...register("content", { required: "Your reply cannot be blank" })}
          className="w-full"
        />
        {errors.content && <FormError>{errors.content.message}</FormError>}
        <div>
          <SubmitButton>Reply</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
