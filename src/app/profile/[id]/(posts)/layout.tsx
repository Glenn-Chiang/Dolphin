import React from "react";
import SortMenu from "@/components/SortLinks";

type ProfilePostsLayout = {
  params: { id: string };
  children: React.ReactNode;
};

export default function ProfilePostsLayout({
  params,
  children,
}: ProfilePostsLayout) {
  const userId = Number(params.id);

  return (
    <section className="flex flex-col gap-4">
      <SortMenu context="profile" id={userId} />
      {children}
    </section>
  );
}
