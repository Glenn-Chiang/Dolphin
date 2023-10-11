"use client";

import TabLink from "@/components/TabLink";
import { PodDetail } from "@/db/types";
import { usePathname } from "next/navigation";

export default function PodPageLinks({ pod }: { pod: PodDetail }) {
  const path = usePathname();
  return (
    <nav className="flex gap-4 font-medium bg-white rounded-md shadow p-2">
      <TabLink activePath={path} href={`/pods/${pod.id}`} count={pod._count.posts}>
        Posts
      </TabLink>
      <TabLink activePath={path} href={`/pods/${pod.id}/members`} count={pod._count.members}>
        Members
      </TabLink>
    </nav>
  );
}
