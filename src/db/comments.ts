"use server";
import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const getPostComments = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

const getUserComments = async (userId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

const createComment = async (postId: number, content: string) => {
  const comments = await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: getCurrentUser(),
    },
  });
  console.log("Comment posted");
  revalidatePath('/')
  // revalidatePath(`/post/${postId}`);
};

export { getPostComments, getUserComments, createComment };
