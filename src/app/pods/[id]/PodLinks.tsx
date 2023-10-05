"use client";

import TabLink from "@/components/TabLink";
import { usePathname } from 'next/navigation';

export default function PodLinks({ podId }: { podId: number }) {
  const path = usePathname()
  return (
    <nav className="flex gap-4 font-medium bg-white rounded-md shadow p-2">
      <TabLink activePath={path} href={`/pods/${podId}`}>Posts</TabLink>
      <TabLink activePath={path} href={`/pods/${podId}/members`}>Members</TabLink>
    </nav>
  );
}
