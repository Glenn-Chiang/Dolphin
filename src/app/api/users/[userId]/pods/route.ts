import { getUserPods } from "@/actions/pods"

export async function GET(request: Request, {params}: {params: {userId: string}}) {
  const userId = Number(params.userId)
  const pods = await getUserPods(userId)
  return Response.json(pods)  
}