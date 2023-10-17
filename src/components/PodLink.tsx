"use client";

import { Pod } from "@prisma/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import DolphinIcon from "./DolphinIcon";
import PodIcon from "./PodIcon";

export default function PodLink({ pod }: { pod: Pod }) {
  const pathname = usePathname();
  const params = useParams()
  const isActive = pathname.startsWith('/pods') && params.id && Number(params.id) === pod.id;
  return (
    <Link
      href={`/pods/${pod.id}`}
      className={`flex gap-2 items-center p-2 rounded-md font-medium ${
        isActive ? "bg-sky-200 text-sky-600" : "hover:bg-slate-200"
      }`}
    >
      <PodIcon src={pod.iconSource}/>
      {pod.name}
    </Link>
  );
}
