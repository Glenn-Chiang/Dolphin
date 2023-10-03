import PodPreview from "@/components/PodPreview";
import prisma from "@/db";

const getUserPods = async (userId: number) => {
  const pods = await prisma.pod.findMany({
    where: {
      id: userId,
    },
  });
  return pods;
};

export default async function ProfilePods({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const pods = await getUserPods(userId);

  if (pods.length === 0) {
    return <section>This user hasn&apos;t joined any pods</section>;
  }

  return (
    <section>
      {pods.map((pod) => (
        <PodPreview key={pod.id} pod={pod} />
      ))}
    </section>
  );
}
