import { getPod } from "@/db/pods";
import Link from "next/link";
import React from "react";
import PodBanner from "./PodBanner";
import TabLink from "@/components/TabLink";

export default async function PodPage({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const podId = Number(params.id);
  const pod = await getPod(podId);

  if (!pod) {
    return <section>Pod not found</section>;
  }

  return (
    <main className="flex flex-col gap-4 pb-4">
      <PodBanner pod={pod} />
      <nav className="flex gap-4 font-medium bg-white rounded-md shadow p-2">
        <TabLink href={`/pods/${podId}`}>Posts</TabLink>
        <TabLink href={`/pods/${podId}/members`}>Members</TabLink>
      </nav>
      {children}
    </main>
  );
}
