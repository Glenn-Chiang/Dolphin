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

export {getUsers, getPodMembers}