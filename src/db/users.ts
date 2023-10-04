import prisma from "./db";

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


const updateProfile = async (userId: number, about: string) => {
  
}

export {getUsers, getPodMembers, getUser, updateProfile}