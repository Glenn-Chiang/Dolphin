"use server";

import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostDetail } from "@/types";

const getPosts = async (): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
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
  return posts;
};

const sortOptions = {
  'new': {
    createdAt: 'desc'
  },
  'top': {
    likedBy: 'desc'
  }
}

const getPodPosts = async (podId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

const getUserPosts = async (userId: number): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

const getPost = async (postId: number): Promise<PostDetail | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
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

  revalidatePath('/')
};

export { getPosts, getPodPosts, getUserPosts, getPost, createPost, likePost };
