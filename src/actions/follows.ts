"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

const follow = async (followingId: number) => {
  // followingId: id of user whom you want to follow
  const followerId = await getCurrentUser();

  if (!followerId) {
    throw new Error('unauthenticated')
  }

  await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
  console.log("Followed");
  revalidatePath(`/profile/${followerId}`);
  revalidatePath(`/profile/${followingId}`);
};

const unfollow = async (followingId: number) => {
  const followerId = await getCurrentUser();

  if (!followerId) {
    throw new Error("unauthenticated");
  }
  
  await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  console.log("Unfollowed");
  revalidatePath(`/profile/${followerId}`);
  revalidatePath(`/profile/${followingId}`);
};

export { follow, unfollow };
