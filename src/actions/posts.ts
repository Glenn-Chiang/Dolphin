"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostDetail } from "@/lib/types";
import { error } from "console";

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

// Get all posts ordered by date
const getPosts = async (): Promise<PostDetail[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: includedData,
  });
  return posts;
};

// Get all posts in pods joined by current user, ordered by date
const getHomeFeed = async (): Promise<PostDetail[]> => {
  const userId = await getCurrentUser();
  const posts = await prisma.post.findMany({
    where: {
      pod: {
        members: {
          some: {
            memberId: userId,
          },
        },
      },
    },
    include: includedData,
    orderBy: {
      createdAt: "desc",
    },
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

const createPost = async ({
  podId,
  title,
  content,
}: {
  podId: string;
  title: string;
  content: string;
}) => {
  if (!title || title.length > 255) {
    throw new Error("Invalid title");
  }
  if (!content) {
    console.log("Invalid content");
    throw new Error("Invalid content");
  }

  const authorId = await getCurrentUser();
  if (!authorId) {
    throw new Error("unauthenticated");
  }

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
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("unauthenticated");
  }

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
  await checkAuthorization(postId);

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
  await checkAuthorization(postId);

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
};

const checkAuthorization = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  // Post not found
  if (!post) {
    throw new Error("post not found");
  }
  const currentUserId = await getCurrentUser();
  if (!currentUserId) {
    throw new Error("unauthenticated"); // not signed in
  }
  if (post.authorId !== currentUserId) {
    throw new Error("unauthorized"); // not author
  }
};

export {
  getPosts,
  getHomeFeed,
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
