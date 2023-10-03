import { Prisma } from "@prisma/client";

// Post with author name
const postWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true
  }
})

export type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>
