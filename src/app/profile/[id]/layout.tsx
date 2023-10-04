import prisma from "@/db/db";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: true,
      pods: true,
      comments: true,
    },
  });

  return user;
};

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
      <section className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
        <h1>{user.name}</h1>
        <p className="flex gap-2 text-slate-500">
          <span>Joined</span>
          <span>{user.createdAt.toLocaleDateString()}</span>
        </p>
        <p className="">{user.about}</p>
      </section>
      <nav className="flex gap-4 font-medium bg-white p-4 rounded-md shadow">
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
