import prisma from "@/db/db"

export async function POST (request: Request) {
  const {name, email} = await request.json()

  if (!name || !email) {
    return 
  }

  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return Response.json(user)
}