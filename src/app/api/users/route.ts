import prisma from "@/db";

// Get all users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// Create new user
export async function POST(req: Request) {
  const { name } = await req.json();

  if (typeof name !== "string") {
    return new Response("Invalid name", { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name,
    },
  });

  return Response.json(user);
}
