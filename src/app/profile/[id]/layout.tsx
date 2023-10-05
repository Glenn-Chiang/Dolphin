import { getUser } from "@/db/users";
import Link from "next/link";
import React from "react";
import Banner from "./Banner";

export default async function Profile({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const userId = Number(params.id);
  const user = await getUser(userId);

  if (!user) {
    return <section>User not found</section>;
  }
  return (
    <main className="flex flex-col gap-4">
      <Banner user={user}/>      
      <nav className="flex gap-4 font-medium bg-white p-2 rounded-md shadow">
        <TabLink href={`/profile/${userId}`}>Posts</TabLink>
        <TabLink href={`/profile/${userId}/comments`}>Comments</TabLink>
        <TabLink href={`/profile/${userId}/pods`}>Pods</TabLink>
      </nav>
      {children}
    </main>
  );
}

function TabLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="hover:bg-slate-200 p-2 rounded-full">
      <h2>{children}</h2>
    </Link>
  );
}
