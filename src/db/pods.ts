"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { redirect } from "next/navigation";

const getPods = async () => {
  const pods = await prisma.pod.findMany();
  return pods;
};

const getPod = async (podId: number) => {
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
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
}

export { getPods, getPod, getUserPods, createPod, joinPod, leavePod };
