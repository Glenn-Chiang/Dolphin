"use client";

import { Comment } from "@prisma/client";
import Modal from "./Modal";
import { SubmitButton } from "./buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { editComment } from "@/db/comments";

type EditCommentModalProps = {
  close: () => void;
  comment: Comment;
};

type EditFormValues = {
  content: string;
};

export default function EditCommentModal({
  close,
  comment,
}: EditCommentModalProps) {
  const { register, handleSubmit } = useForm<EditFormValues>();

  const onSubmit: SubmitHandler<EditFormValues> = async (formValues) => {
    const { content } = formValues;
    await editComment(comment.id, content);
    close()
  };

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1>Edit your comment</h1>
        <textarea
          {...register("content", { required: "Your comment cannot be blank" })}
          className="shadow rounded-md p-2 bg-slate-100 w-full"
          defaultValue={comment.content}
        />
        <div>
          <SubmitButton text="Save" />
        </div>
      </form>
    </Modal>
  );
}
