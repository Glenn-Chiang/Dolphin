'use client'

import { Comment } from "@/types";
import { useState } from "react";

type CommentSectionProps = {
  comments: Comment[];
};

export default function CommentSection({ comments }: CommentSectionProps) {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
      setLiked((prev) => !prev);
      return;
    };

  return (
    <section className="bg-white p-4 shadow rounded-md">
      <ul className="flex flex-col gap-2">
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
  return <article className="py-4">
    <p>{comment.content}</p>
  </article>;
}
