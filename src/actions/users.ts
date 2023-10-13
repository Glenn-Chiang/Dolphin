"use server";
import { getCurrentUser, useCurrentUser } from "@/lib/auth";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

const includedData = {
  followers: {
    select: {
      followerId: true,
    },
  },
  _count: {
    select: {
      posts: true,
      comments: true,
      pods: true,
      following: true,
    },
  },
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: includedData
  });
  return users;
};

const getPodMembers = async (podId: number) => {
  const members = await prisma.user.findMany({
    where: {
      pods: {
        some: {
          podId: podId,
        },
      },
    },
    include: includedData,
  });
  return members;
};

const getFollowedUsers = async (userId: number) => {
  const users = await prisma.user.findMany({
    where: {
      followers: {
        some: {
          followerId: userId,
        },
      },
    },
    include: includedData,
  });
  return users;
};

const getFollowers = async (userId: number) => {
  const followers = await prisma.user.findMany({
    where: {
      following: {
        some: {
          followingId: userId,
        },
      },
    },
    include: includedData,
  });
  return followers;
};

const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: includedData,
  });

  return user;
};

const updateProfile = async (
  name: string,
  about: string,
  avatarSource: string
) => {
  const currentUserId = await getCurrentUser();
  if (!currentUserId) {
    throw new Error("unauthenticated"); // not signed in
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  if (user.id !== currentUserId) {
    throw new Error("unauthorized"); // not own profile
  }

  await prisma.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      name,
      about,
      avatarSource,
    },
  });
  console.log("Profile updated:", about);
  revalidatePath(`/profile/${currentUserId}`);
};

export {
  getUsers,
  getPodMembers,
  getUser,
  updateProfile,
  getFollowers,
  getFollowedUsers,
};
