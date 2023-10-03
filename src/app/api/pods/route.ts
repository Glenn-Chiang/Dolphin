import prisma from "@/db";

// Get all pods
export async function GET() {
  const pods = await prisma.pod.findMany()
  return Response.json(pods)
}

// Create new pod
export async function POST(req: Request) {
  const formData = await req.formData()
  const podname = formData.get('podname') as string
  const about = formData.get('about') as string

  const pod = await prisma.pod.create({
    data: {
      name: podname,
      about: about,
      creatorId: 1, // TODO!!!
    }
  })
  return Response.json(pod)
}
