import { getPod } from "@/db/pods";
import Link from "next/link";
import React from "react";
import PodCard from "./PodCard";

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
      <PodCard pod={pod} />
      <section className="bg-white rounded-md shadow p-4 ">
        <nav className="flex gap-4 font-medium">
          <Link href={`/pods/${podId}`}>Posts</Link>
          <Link href={`/pods/${podId}/members`}>Members</Link>
        </nav>
      </section>
      {children}
    </main>
  );
}
