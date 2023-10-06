import React from "react";
import SortMenu from "@/components/SortMenu";

type PodPostsLayoutProps = {
  params: { id: string };
  children: React.ReactNode;
};

export default function PodPostsLayout({
  params,
  children,
}: PodPostsLayoutProps) {
  const podId = Number(params.id);

  return (
    <section className="flex flex-col gap-4">
      <SortMenu context="pods" id={podId} />
      {children}
    </section>
  );
}
