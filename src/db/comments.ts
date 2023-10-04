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

export { getPostComments, getUserComments };
