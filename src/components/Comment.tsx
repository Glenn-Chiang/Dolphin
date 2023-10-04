'use client'

import { useState } from "react";
import { LikeButton } from "./buttons";
import { CommentDetail } from "@/types";

type CommentProps = {
  comment: CommentDetail;
};

export default function Comment({ comment }: CommentProps) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleReplyClick = () => {};

  return (
    <article className="py-4">
      <p>{comment.author.name}</p>
      <p>{comment.content}</p>
      <div className="flex gap-2">
        <LikeButton onClick={handleLikeClick} liked={liked} />
        <CommentButton onClick={handleReplyClick} />
      </div>
    </article>
  );
}
