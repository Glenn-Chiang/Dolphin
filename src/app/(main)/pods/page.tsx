import { getPods } from "@/actions/pods";
import PodCard from "@/components/PodCard";

export default async function Pods() {
  const pods = await getPods();
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="p-2">Explore Pods</h1>
      </div>
      {/* <Searchbar placeholder="Search for a pod..." /> */}
      <ul className="py-4 flex flex-col gap-4">
        {pods.map((pod) => (
          <PodCard key={pod.id} pod={pod} />
        ))}
      </ul>
    </main>
  );
}

function Searchbar({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="bg-transparent border-b-2 focus:outline-none shadow-none w-full"
      placeholder={placeholder}
    />
  );
}
