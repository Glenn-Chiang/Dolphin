import PodLink from "@/components/PodLink";
import { CreatePodButton, CreatePostButton } from "@/components/buttons";
import { Pod } from "@prisma/client";
import Link from "next/link";

export default function Sidebar({ pods }: { pods: Pod[] }) {
  return (
    <section
      className={`w-4/5 bg-slate-100 sm:w-1/4 sm:bg-white fixed flex flex-col justify-between pt-20 left-0 top-0 h-screen z-10 p-4 shadow`}
    >
      <div className="flex flex-col gap-2 h-4/5">
        <h2 className="">Your Pods</h2>
        <nav className="flex flex-col -mx-2 overflow-y-scroll">
          {pods.map((pod) => (
            <PodLink key={pod.id} pod={pod} />
          ))}
        </nav>
        <Link
          href={"/pods"}
          className="text-sky-500 font-medium hover:text-sky-400 py-2"
        >
          Explore all pods
        </Link>
      </div>
      <div className="flex gap-2 py-4 justify-center flex-col md:flex-row text-center">
        <CreatePostButton />
        <CreatePodButton />
      </div>
    </section>
  );
}
