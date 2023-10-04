import prisma from "./db";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      pod: true,
    },
  });
  return posts;
};

const getPodPosts = async (podId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
    include: {
      author: true,
      pod: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

const getUserPosts = async (userId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
      pod: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export { getPosts, getPodPosts, getUserPosts };
