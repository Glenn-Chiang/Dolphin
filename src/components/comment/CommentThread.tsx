import { CommentDetail } from "@/lib/types";
import Comment from "./Comment";
import { getReplies } from "@/actions/comments";

// 1 top-level parent comment with its replies
export default async function CommentThread({
  comment,
}: {
  comment: CommentDetail;
}) {
  const replies = await getReplies(comment.id);
  return (
    <section className="p-4 bg-white rounded-md shadow ">
      <Comment comment={comment} />
      <ul className="pl-8 border-l-2">
        {replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </ul>
    </section>
  );
}
