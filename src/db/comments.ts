import { getCurrentUser } from "@/auth";
import prisma from "./db";

const getPostComments = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
  });
  return comments
};

const getUserComments = async (userId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    },
  });
  return comments
};

const createComment = async (postId: number, content: string) => {
  const comments = await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: getCurrentUser()
    }
  })
  console.log('Comment posted')
  return comments
}

export { getPostComments, getUserComments, createComment };
