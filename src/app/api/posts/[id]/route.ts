import prisma from "@/db/db";

// Get post by id
export async function GET({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: true,
    },
  });
  return Response.json(post);
}

// Delete post by id
export async function DELETE({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return new Response(null, { status: 204 });
}
