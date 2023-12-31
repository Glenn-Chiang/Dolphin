"use server";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { CommentDetail } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";

const includedData = {
  author: true,
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
};

const getPostComments = async (postId: number): Promise<CommentDetail[]> => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentCommentId: null,
    },
    include: includedData,
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
    include: includedData,
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

const getReplies = async (commentId: number) => {
  const replies = await prisma.comment.findMany({
    where: {
      parentCommentId: commentId,
    },
    include: includedData,
    orderBy: {
      createdAt: "desc",
    },
  });
  return replies;
};

const createComment = async (postId: number, content: string) => {
  const userId = await getCurrentUser();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: userId,
    },
  });
  console.log("Comment posted");
  revalidatePath("/");
  // revalidatePath(`/post/${postId}`);
};

const createReply = async (
  postId: number,
  commentId: number,
  content: string
) => {
  const userId = await getCurrentUser();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.comment.create({
    data: {
      postId,
      parentCommentId: commentId,
      content,
      authorId: userId,
    },
  });
  console.log("Reply posted");
  revalidatePath("/");
};

const likeComment = async (commentId: number) => {
  const userId = await getCurrentUser();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  // Get current user's liked posts
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      likedComments: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    console.log("User not found");
    return;
  }

  const alreadyLiked = user.likedComments.some(
    (comment) => comment.id === commentId
  );

  const comment = alreadyLiked
    ? // Unlike comment if user had already liked comment
      await prisma.comment.update({
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
      })
    : // Like comment if user has not yet liked comment
      await prisma.comment.update({
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

  revalidatePath(`/post/${comment.postId}`);
  revalidatePath(`/profile/${comment.authorId}/comments`);
};

const deleteComment = async (commentId: number) => {
  await checkAuthorization(commentId);

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  console.log("Comment deleted");
  revalidatePath("/");
};

const editComment = async (commentId: number, content: string) => {
  await checkAuthorization(commentId);

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
  revalidatePath(`/profile/${comment.authorId}/comments`);
};

const checkAuthorization = async (commentId: number) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  // Post not found
  if (!comment) {
    throw new Error("comment not found");
  }
  const currentUserId = await getCurrentUser();
  if (!currentUserId) {
    throw new Error("unauthenticated"); // not signed in
  }
  if (comment.authorId !== currentUserId) {
    throw new Error("unauthorized"); // not author
  }
};

export {
  getPostComments,
  getUserComments,
  createComment,
  deleteComment,
  editComment,
  likeComment,
  createReply,
  getReplies,
};
