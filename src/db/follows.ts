"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { revalidatePath } from 'next/cache';

const follow = async (followingId: number) => { // followingId: id of user whom you want to follow
  const followerId = getCurrentUser()
  await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
  console.log('Followed')
  revalidatePath(`/profile/${followerId}`)
  revalidatePath(`/profile/${followingId}`)
};

export { follow };
