import { CommentDetail } from "@/types";
import CommentComponent from "../../../components/Comment";
import CommentForm from "./CommentForm";

export default function CommentSection({ comments }: {comments: CommentDetail[]}) {
  return (
    <>
      <CommentForm />
      <h2 className="p-2">Comments</h2>
      {comments.length ? (
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <section className="text-slate-500 py-4 bg-white p-4 shadow rounded-md">
          This post doesn&apos;t have any comments
        </section>
      )}
    </>
  );
}
