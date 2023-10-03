import prisma from "@/db";
import PodCard from "./PodCard";
import Link from "next/link";
import React from "react";

const getPod = async (podId: number) => {
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
    include: {
      posts: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return pod;
};
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
    <main className="flex flex-col gap-4">
      <PodCard pod={pod} />
      <section className="bg-white rounded-md shadow p-4 ">
        <nav className="flex gap-4 font-medium">
          <Link href={`/pods/${podId}`}>Posts</Link>
        </nav>
        <div className="py-4">{children}</div>
      </section>
    </main>
  );
}
