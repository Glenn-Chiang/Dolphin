"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

const getPods = async () => {
  const pods = await prisma.pod.findMany({
    include: {
      members: {
        select: {
          memberId: true
        }
      }
    }
  });
  return pods;
};

const getPod = async (podId: number) => {
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
    include: {
      members: {
        select: {
          memberId: true
        }
      }
    }
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
    include: {
      members: {
        select: {
          memberId: true,
        },
      },
    },
  });
  return pods;
};

const createPod = async (formData: FormData) => {
  const name = formData.get("name");
  const about = formData.get("about");

  if (typeof name !== "string") {
    throw new Error("Invalid name");
  }
  if (typeof about !== "string") {
    throw new Error("Invalid about");
  }

  await prisma.pod.create({
    data: {
      name,
      about,
      creatorId: 1, // TODO: Get current user
    },
  });
  console.log("Pod created!");

  redirect("/pods");
};

const joinPod = async (podId: number) => {
  const userId = getCurrentUser()
  await prisma.podMember.create({
    data: {
      podId,
      memberId: userId,
    },
  });
  console.log('Joined pod!')
  revalidatePath('/pods')
  revalidatePath(`/users/${userId}/pods`)
};

const leavePod = async (podId: number) => {
  const userId = getCurrentUser()
  await prisma.podMember.delete({
    where: {
      memberId_podId: {
        memberId: userId,
        podId
      }
    }
  })
  console.log('Left pod!')
  revalidatePath('/pods')
  revalidatePath(`/profile/${userId}/pods`)
}

export { getPods, getPod, getUserPods, createPod, joinPod, leavePod };
