import { Prisma } from "@prisma/client";

// Post with author name and pod name
const postDetail = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true,
    pod: true
  }
})

// Comment with author name
const commentDetail = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    author: true
  }
})

export type PostDetail = Prisma.PostGetPayload<typeof postDetail>
export type CommentDetail = Prisma.CommentGetPayload<typeof commentDetail>