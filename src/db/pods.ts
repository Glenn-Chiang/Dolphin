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
            id: userId
          }
        }
      }
    },
  });
  return pods;
};

const createPod = async (formData: FormData) => {
  "use server";
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

// const joinPod = async (userId: number, podId)

export { getPods, getPod, getUserPods, createPod };
