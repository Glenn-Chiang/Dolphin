import { Prisma } from "@prisma/client";

// Post with author name and pod name
const postDetail = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true,
    pod: true,
    likedBy: true,
    _count: {
      select: {
        comments: true,
        likedBy: true,
      },
    },
  },
});

// Comment with author name, likedBy userIds and reply count
const commentDetail = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    author: {
      select: {
        name: true,
      },
    },
    likedBy: {
      select: {
        id: true,
      },
    },
    _count: {
      select: {
        replies: true,
      },
    },
  },
});

// Pod with members
const podDetail = Prisma.validator<Prisma.PodDefaultArgs>()({
  include: {
    members: {
      select: {
        memberId: true,
      },
    },
  },
});

// User with follower and following count
const userDetail = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    followers: {
      select: {
        followerId: true
      }
    },
    _count: {
      select: {
        following: true,
      },
    },
  },
});

export type PostDetail = Prisma.PostGetPayload<typeof postDetail>;
export type CommentDetail = Prisma.CommentGetPayload<typeof commentDetail>;
export type PodDetail = Prisma.PodGetPayload<typeof podDetail>;
export type UserDetail = Prisma.UserGetPayload<typeof userDetail>;
