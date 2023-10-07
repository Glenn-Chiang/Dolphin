"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostDetail } from "@/types";

const includedData = {
  author: true,
  pod: true,
  likedBy: true,
  _count: {
    select: {
      comments: true,
      likedBy: true,
    },
  },
};

const getPosts = async (): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: includedData,
  });
  return posts;
};

// Get all posts in pod sorted by date created
const getNewPodPosts = async (podId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
    include: includedData,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

// Get all posts in pod sorted by like count
const getTopPodPosts = async (podId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
    include: includedData,
    orderBy: {
      likedBy: {
        _count: "desc",
      },
    },
  });
  return posts;
};

// const getYesterday = () => {
//   const date = new Date()
//   date.setDate(date.getDate() - 1)
//   return date
// }

// Get all posts in pod within the last 24h sorted by like count
const getHotPodPosts = async (podId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
    include: includedData,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        likedBy: {
          _count: "desc",
        },
      },
    ],
  });
  return posts;
};

const getNewUserPosts = async (userId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: includedData,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

const getTopUserPosts = async (userId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: includedData,
    orderBy: {
      likedBy: {
        _count: "desc",
      },
    },
  });
  return posts;
};

const getHotUserPosts = async (userId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: includedData,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        likedBy: {
          _count: "desc",
        },
      },
    ],
  });
  return posts;
};

const getPost = async (postId: number): Promise<PostDetail | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: includedData,
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
  // Get current user's liked posts
  const userId = getCurrentUser();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      likedPosts: true,
    },
  });
  
  if (!user) {
    console.log("User not found");
    return;
  }
  
  const alreadyLiked = user.likedPosts.some((post) => post.id === postId);

  if (alreadyLiked) {
    // Unlike post if user had already liked post
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    // Like post if user has not yet liked post
  } else {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  revalidatePath("/");
};

const deletePost = async (postId: number) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  console.log("Post deleted!");
  revalidatePath("/");
};

// Only content is patched
const editPost = async (postId: number, content: string) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content,
    },
  });
  console.log("Post edited!");
  revalidatePath("/");
  // redirect(`/post/${postId}`);
};

export {
  getPosts,
  getNewPodPosts,
  getTopPodPosts,
  getHotPodPosts,
  getNewUserPosts,
  getTopUserPosts,
  getHotUserPosts,
  getPost,
  createPost,
  likePost,
  deletePost,
  editPost,
};
