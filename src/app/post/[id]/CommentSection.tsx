"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import CommentComponent from "../../../components/Comment";
import { Comment } from "@/types";

type CommentSectionProps = {
  comments: Comment[];
};

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      <CommentForm />
      <section className="bg-white p-4 shadow rounded-md">
        <h2>Comments</h2>
        <ul className="flex flex-col">
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </ul>
      </section>
    </>
  );
}

function CommentForm() {
  const handleSubmitComment = () => {};
  return (
    <form className="flex flex-col gap-4 bg-white rounded-md p-4 shadow">
      <h2>Share your thoughts</h2>
      <textarea className="bg-slate-100 rounded-md p-2"/>
      <div className="flex gap-2">
        <SubmitButton text="Comment" />
        <CancelButton onClick={handleSubmitComment} />
      </div>
    </form>
  );
}
