"use client";

import { useState } from "react";
import { LikeButton, CommentButton, MoreButton } from "./buttons";
import { CommentDetail } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getCurrentUser } from "@/auth";

type CommentProps = {
  comment: CommentDetail;
};

export default function Comment({ comment }: CommentProps) {
  const userId = getCurrentUser()
  const isOwnComment = userId === comment.authorId

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleReplyClick = () => {};

  return (
    <article className="p-4 bg-white rounded-md shadow relative">
      <div className="flex items-center">
        <Link
          href={`/profile/${comment.authorId}`}
          className="flex gap-2 items-center text-slate-500 hover:text-sky-500 w-max p-2 -ml-2"
        >
          <FontAwesomeIcon icon={faUserCircle} />
          {comment.author.name}
        </Link>
        <span className="text-slate-500">{comment.createdAt.toDateString()}</span>
      </div>
      <p>{comment.content}</p>
      <div className="flex gap-2">
        <LikeButton onClick={handleLikeClick} liked={liked} />
        <CommentButton onClick={handleReplyClick} />
      </div>
      {isOwnComment && <MoreButton/>}
    </article>
  );
}
