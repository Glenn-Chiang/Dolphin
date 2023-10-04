"use server";
import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getPodMembers = async (podId: number) => {
  const members = await prisma.user.findMany({
    where: {
      pods: {
        some: {
          podId,
        },
      },
    },
  });
  return members;
};

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

const updateProfile = async (about: string) => {
  const userId = getCurrentUser();
  console.log(about)
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      about: about
    }
  });
  console.log("About updated:", about);
  revalidatePath(`/profile/${userId}`);
};

export { getUsers, getPodMembers, getUser, updateProfile };