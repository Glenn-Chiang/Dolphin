import prisma from "@/db";

import Comment from "@/components/Comment";

const getUserComments = async (userId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
  });
  return comments;
};

export default async function ProfileComments({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const comments = await getUserComments(userId);

  if (comments.length === 0) {
    return <section>This user hasn&apos;t made any comments</section>;
  }

  return (
    <section>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
}
