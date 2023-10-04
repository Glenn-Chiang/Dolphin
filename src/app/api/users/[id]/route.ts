import prisma from "@/db/db";

// Get user by id
export async function GET({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return Response.json(user);
}
