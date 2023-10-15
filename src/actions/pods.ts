"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { error } from "console";

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

const getMyPods = async () => {
  const pods = await prisma.pod.findMany({
    where: {
      members: {
        some: {
          memberId: 1
        }
      }
    }
  })
  return pods
}

const createPod = async ({
  name,
  about,
  iconSource,
}: {
  name: string;
  about: string;
  iconSource: string;
}) => {
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
      iconSource,
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
  await checkAuthorization(podId)

  await prisma.pod.update({
    where: {
      id: podId,
    },
    data: {
      about,
      iconSource,
    },
  });
  revalidatePath(`/pods/${podId}`);
};

const deletePod = async (podId: number) => {
  await checkAuthorization(podId)

  const pod = await prisma.pod.delete({
    where: {
      id: podId
    }
  })

  console.log('Pod deleted!')
  revalidatePath('/')
  redirect(`/profile/${pod.creatorId}/pods`)
};

const checkAuthorization = async (podId: number) => {
  const pod = await prisma.pod.findUnique({
    where: {
      id: podId,
    },
    select: {
      creatorId: true,
    },
  });
  const currentUserId = await getCurrentUser()
  if (!currentUserId) {
    throw new Error('unauthenticated')
  }
  if (currentUserId !== pod?.creatorId) { // Only pod creator is authorized to edit/delete pod
    throw new Error('unauthorized')
  }
}

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
  getMyPods,
  createPod,
  joinPod,
  leavePod,
  editPod,
  deletePod
};
