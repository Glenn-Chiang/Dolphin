import PodPreview from "@/components/PodPreview";
import { getUserPods } from "@/db/pods";

export default async function ProfilePods({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const pods = await getUserPods(userId);

  if (pods.length === 0) {
    return <section className="bg-white rounded-md text-slate-500 p-4 shadow">This user hasn&apos;t joined any pods</section>;
  }

  return (
    <section>
      {pods.map((pod) => (
        <PodPreview key={pod.id} pod={pod} />
      ))}
    </section>
  );
}
