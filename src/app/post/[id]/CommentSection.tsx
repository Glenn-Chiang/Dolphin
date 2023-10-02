"use client";

import { CommentButton, LikeButton } from "@/components/buttons";
import { Comment } from "@/types";
import { useState } from "react";

type CommentSectionProps = {
  comments: Comment[];
};

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <section className="bg-white p-4 shadow rounded-md">
      <h2>Comments</h2>
      <ul className="flex flex-col">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}

type CommentProps = {
  comment: Comment;
};

function Comment({ comment }: CommentProps) {
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
