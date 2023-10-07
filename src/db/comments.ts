"use server";
import { getCurrentUser } from "@/auth";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const getPostComments = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

const getUserComments = async (userId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

const createComment = async (postId: number, content: string) => {
  const comments = await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: getCurrentUser(),
    },
  });
  console.log("Comment posted");
  revalidatePath("/");
  // revalidatePath(`/post/${postId}`);
};

const deleteComment = async (commentId: number) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  console.log("Comment deleted");
  revalidatePath("/");
};

const editComment = async (commentId: number, content: string) => {
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
  console.log("Comment edited!");
  revalidatePath(`/posts/${comment.postId}`);
  revalidatePath(`/profile/${comment.authorId}/comments`)
};

const likeComment = async (commentId: number) => {
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
  
  const alreadyLiked = user.likedPosts.some((post) => post.id === commentId);
  
  if (alreadyLiked) {
    // Unlike post if user had already liked post
    await prisma.post.update({
      where: {
        id: commentId,
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
        id: commentId,
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


export {
  getPostComments,
  getUserComments,
  createComment,
  deleteComment,
  editComment,
};
