import { getPod } from "@/actions/pods";
import Link from "next/link";
import React from "react";
import PodBanner from "./PodBanner";
import TabLink from "@/components/TabLink";
import PodPageLinks from "./PodPageLinks";

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
    return (
      <div className="bg-white rounded-md text-slate-500 p-4 shadow text-center">
        Pod not found
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 pb-4">
      <PodBanner pod={pod} />
      <PodPageLinks pod={pod} />
      {children}
    </main>
  );
}
