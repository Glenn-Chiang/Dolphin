import prisma from "@/db/db"

export async function POST (request: Request) {
  const {name, password} = await request.json()
  const user = await prisma.user.create({
    data: {
      name,
    }
  })

}