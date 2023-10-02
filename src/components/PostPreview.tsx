"use client";

import { Post } from "@/types";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

type PostPreviewProps = {
  post: Post;
};

export default function PostPreview({ post }: PostPreviewProps) {
  const handleLikeClick = () => {
    return;
  };

  const handleCommentClick = () => {};

  return (
    <li className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/post/${post.id}`}>
        <h2 className="">{post.title}</h2>
        <div className="flex gap-4 text-slate-500 items-center">
          <span className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUserCircle} />
            {post.author}
          </span>
          <span>{post.datePosted.toLocaleString()}</span>
        </div>
        <div className="py-2">{post.content}</div>
        <button className="absolute top-4 right-4">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        <div className="flex gap-4 py-2">
          <LikeButton
            liked={false}
            likes={post.likes}
            onClick={handleLikeClick}
          />
          <CommentButton replies={post.comments} onClick={handleCommentClick} />
        </div>
      </Link>
    </li>
  );
}

type LikeButtonProps = {
  liked: boolean;
  likes: number;
  onClick: () => void;
};

function LikeButton({ liked, likes, onClick }: LikeButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center hover:bg-rose-200 hover:text-rose-500 rounded-full p-2"
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={`${liked ? "text-rose-500" : "text-slate-200"}`}
      />
      {likes}
    </button>
  );
}

type CommentButtonProps = {
  replies: number;
  onClick: () => void;
};

function CommentButton({ replies, onClick }: CommentButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center rounded-full p-2 text-sky-500 hover:bg-sky-200 hover:text-sky-600 group"
    >
      <FontAwesomeIcon icon={faComment} />
      {replies}
    </button>
  );
}
