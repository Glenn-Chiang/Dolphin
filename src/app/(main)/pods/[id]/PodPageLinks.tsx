"use client";

import TabLink from "@/components/TabLink";
import { PodDetail } from "@/lib/types";
import { faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

export default function PodPageLinks({ pod }: { pod: PodDetail }) {
  const path = usePathname();
  return (
    <nav className="flex gap-4 font-medium bg-white rounded-md shadow p-2">
      <TabLink
        activePath={path}
        href={`/pods/${pod.id}`}
      >
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </TabLink>
      <TabLink
        activePath={path}
        href={`/pods/${pod.id}/members`}
      >
        <FontAwesomeIcon icon={faUsers} />
        Members
      </TabLink>
    </nav>
  );
}
