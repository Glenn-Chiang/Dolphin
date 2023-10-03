import prisma from "@/db";

// Get all posts
export async function GET() {
  const posts = await prisma.post.findMany()
  return Response.json(posts)
}

// Get 