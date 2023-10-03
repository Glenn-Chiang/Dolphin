import prisma from "@/db";
import PodCard from "./PodCard";

const getPod = async (podId: number) => {
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
  return pod
}
export default async function PodPage({params}: {params: {id: string}}) {
  const postId = Number(params.id)
  const pod = await getPod(postId)

  if (!pod) {
    return <section>Pod not found</section>
  }

  return (
    <main className="flex flex-col gap-4">
      <PodCard pod={pod}/>
      <section></section>
    </main>
  );
}