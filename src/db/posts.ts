"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { redirect } from "next/navigation";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      pod: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
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
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
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
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

const getPost = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      pod: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });
  return post;
};

const createPost = async (formData: FormData) => {
  const title = formData.get("title");
  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }
  const content = formData.get("content");
  if (typeof content !== "string") {
    throw new Error("Invalid content");
  }
  const podId = formData.get("podId");
  if (typeof podId !== "string") {
    throw new Error("Invalid podId");
  }

  const authorId = getCurrentUser();

  await prisma.post.create({
    data: {
      title,
      content,
      podId: Number(podId),
      authorId,
    },
  });

  console.log("Post created!");
  redirect(`/profile/${authorId}`);
};

const likePost = async (postId: number) => {
  const userId = getCurrentUser();
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedBy: {
        connect: {
          id: userId, // Add user to post's likedBy field
        },
      },
    },
  });
  console.log("Post liked!");
};

export { getPosts, getPodPosts, getUserPosts, getPost, createPost, likePost };

