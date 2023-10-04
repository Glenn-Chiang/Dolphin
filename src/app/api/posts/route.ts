import prisma from "@/db/db";

// Get all posts
export async function GET() {
  const posts = await prisma.post.findMany();
  return Response.json(posts);
}

// Create new post in pod. Every post must be associated with exactly one pod.
export async function POST(req: Request) {
  const { title, content, podId, authorId } = await req.json();
  const post = await prisma.post.create({
    data: {
      title,
      content,
      podId,
      authorId,
    },
  });
  return Response.json(post);
}
