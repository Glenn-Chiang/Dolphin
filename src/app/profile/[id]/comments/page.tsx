import Comment from "@/components/Comment";
import { getUserComments } from "@/db/comments";

export default async function ProfileComments({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const comments = await getUserComments(userId);

  if (comments.length === 0) {
    return (
      <section className="bg-white rounded-md p-4 shadow text-slate-500">
        This user hasn&apos;t made any comments
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
}
