import prisma from "@/db/db";

// Get all posts in pod, including author name
export async function GET({ params }: { params: { id: string } }) {
  const podId = Number(params.id);
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
    include: {
      posts: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return Response.json(pod);
}
