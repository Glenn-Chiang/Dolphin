'use client'

import { useState } from "react";
import { Comment } from "@/types";
import { LikeButton, CommentButton } from "@/components/buttons";

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
