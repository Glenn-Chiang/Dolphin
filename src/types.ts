import { Prisma } from "@prisma/client";

// Post with author name
const postDetail = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true,
    pod: true
  }
})

export type PostDetail = Prisma.PostGetPayload<typeof postDetail>
