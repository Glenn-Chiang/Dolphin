"use client";

import { Pod } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DolphinIcon from "./DolphinIcon";

export default function PodLink({ pod }: { pod: Pod }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/pods/${pod.id}`);
  return (
    <Link
      href={`/pods/${pod.id}`}
      className={`flex gap-2 items-center p-2 rounded-md font-medium ${
        isActive ? "bg-sky-200 text-sky-600" : "hover:bg-slate-200"
      }`}
    >
      <DolphinIcon />
      {pod.name}
    </Link>
  );
}
