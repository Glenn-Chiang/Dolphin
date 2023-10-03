'use client'

import { useState } from "react";
import { LikeButton, CancelButton } from "./buttons";
import { Comment } from "@prisma/client";

type CommentProps = {
  comment: Comment;
};

export default function Comment({ comment }: CommentProps) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleReplyClick = () => {};

  return (
    <article className="py-4">
      <p>{comment.content}</p>
      <div className="flex gap-2">
        <LikeButton onClick={handleLikeClick} liked={liked} />
        <CommentButton onClick={handleReplyClick} />
      </div>
    </article>
  );
}
