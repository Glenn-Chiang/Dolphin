'use client'

import { CancelButton, SubmitButton } from "@/components/buttons";

export default function CommentForm() {
  const handleSubmitComment = () => {};
  return (
    <form className="flex flex-col gap-4 bg-white rounded-md p-4 shadow">
      <h2>Share your thoughts</h2>
      <textarea className="bg-slate-100 rounded-md p-2" />
      <div className="flex gap-2">
        <SubmitButton text="Comment" />
        <CancelButton onClick={handleSubmitComment} />
      </div>
    </form>
  );
}
