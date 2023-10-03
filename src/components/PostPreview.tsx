"use client";

import { Post } from "@/types";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import CommentModal from "./CommentModal";
import { CommentButton, LikeButton } from "./buttons";

type PostPreviewProps = {
  post: Post;
};

export default function PostPreview({ post }: PostPreviewProps) {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = () => {
    setLiked(prev => !prev)
    return;
  };

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleCommentClick = () => {
    setModalIsOpen(prev => !prev)
  };

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/post/${post.id}`}>
        <h2 className="">{post.title}</h2>
        <div className="flex gap-4 text-slate-500 items-center">
          <span className="flex gap-2 items-center py-2">
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
            liked={liked}
            likes={post.likes}
            onClick={handleLikeClick}
          />
          <CommentButton comments={post.comments} onClick={handleCommentClick} />
        </div>
      </Link>
      {modalIsOpen && <CommentModal close={handleCommentClick}/>}
    </article>
  );
}
