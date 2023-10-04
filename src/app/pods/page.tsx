import PodPreview from "@/components/PodPreview";
import prisma from "@/db/db";
import { Pod } from "@prisma/client";
import Link from "next/link";

const getPods = async () => {
  const pods = await prisma.pod.findMany();
  return pods;
};

// Page displaying all 'pods' (communities) on the platform
export default async function Pods() {
  const pods = await getPods();
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="pb-4">Explore Pods</h1>
        <CreatePodButton />
      </div>
      <Searchbar placeholder="Search for a pod..." />
      <ul className="py-4 flex flex-col gap-4">
        {pods.map((pod) => (
          <PodPreview key={pod.id} pod={pod} />
        ))}
      </ul>
    </main>
  );
}

function CreatePodButton() {
  return (
    <Link
      href={"/create-pod"}
      className="bg-white p-2 rounded-md shadow text-sky-500 font-medium hover:bg-sky-500 hover:text-white"
    >
      Start a Pod!
    </Link>
  );
}

function Searchbar({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="bg-transparent border-b-2 focus:outline-none p-2 w-full"
      placeholder={placeholder}
    />
  );
}
