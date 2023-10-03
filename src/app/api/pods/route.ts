import prisma from "@/db";

// Get all pods
export async function GET() {
  const pods = await prisma.pod.findMany()
  return Response.json(pods)
}

// Create new pod
export async function POST(req: Request) {
  const {name, about, creatorId} = await req.json()

  const pod = await prisma.pod.create({
    data: {
      name,
      about,
      creatorId: Number(creatorId), 
    }
  })
  return Response.json(pod)
}
