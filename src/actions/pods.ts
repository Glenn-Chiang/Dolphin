"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const includedData = {
  members: {
    select: {
      memberId: true,
    },
  },
  _count: {
    select: {
      members: true,
      posts: true,
    },
  },
};

// Get all pods
const getPods = async () => {
  const pods = await prisma.pod.findMany({
    include: includedData,
  });
  return pods;
};

// Get all pods with name matching query string
const getMatchedPods = async (query: string) => {
  const pods = await prisma.pod.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    include: includedData,
  });
  return pods;
};

const getPod = async (podId: number) => {
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
    include: includedData,
  });
  return pod;
};

const getUserPods = async (userId: number) => {
  const pods = await prisma.pod.findMany({
    where: {
      members: {
        some: {
          member: {
            id: userId,
          },
        },
      },
    },
    include: includedData,
  });
  return pods;
};

const createPod = async ({ name, about }: { name: string; about: string }) => {
  if (!name || name.length > 25) {
    throw new Error("Invalid name");
  }
  if (about.length > 500) {
    throw new Error("Invalid about");
  }

  const creatorId = await getCurrentUser();
  if (!creatorId) {
    throw new Error("unauthenticated");
  }

  await prisma.pod.create({
    data: {
      name,
      about,
      creatorId,
      members: {
        create: [
          {
            member: {
              connect: {
                id: creatorId,
              },
            },
          },
        ],
      },
    },
  });

  console.log("Pod created!");
  redirect(`/profile/${creatorId}/pods`);
};

const editPod = async (podId: number, about: string, iconSource: string) => {
  await prisma.pod.update({
    where: {
      id: podId,
    },
    data: {
      about,
      iconSource,
    },
  });
};

const joinPod = async (podId: number) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.podMember.create({
    data: {
      podId,
      memberId: userId,
    },
  });
  console.log("Joined pod!");
  revalidatePath("/pods");
  revalidatePath(`/profile/${userId}/pods`);
};

const leavePod = async (podId: number) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.podMember.delete({
    where: {
      memberId_podId: {
        memberId: userId,
        podId,
      },
    },
  });
  console.log("Left pod!");
  revalidatePath("/pods");
  revalidatePath(`/profile/${userId}/pods`);
};

export {
  getPods,
  getMatchedPods,
  getPod,
  getUserPods,
  createPod,
  joinPod,
  leavePod,
  editPod
};
