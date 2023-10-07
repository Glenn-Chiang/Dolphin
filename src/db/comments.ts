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
  revalidatePath("/");
  // revalidatePath(`/post/${postId}`);
};

const deleteComment = async (commentId: number) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  console.log("Comment deleted");
  revalidatePath("/");
};

const editComment = async (commentId: number, content: string) => {
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
  console.log("Comment edited!");
  revalidatePath(`/posts/${comment.postId}`);
  revalidatePath(`/profile/${comment.authorId}/comments`)
};

export {
  getPostComments,
  getUserComments,
  createComment,
  deleteComment,
  editComment,
};
