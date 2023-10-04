"use client";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import CommentModal from "./CommentModal";
import { CommentButton, LikeButton } from "./buttons";
import { PostDetail } from "@/types";
import DolphinIcon from "./DolphinIcon";

export default function PostCard({ post }: {post: PostDetail}) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
    return;
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCommentClick = () => {
    setModalIsOpen((prev) => !prev);
  };

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/post/${post.id}`}>
        <Link
          href={`/pods/${post.podId}`}
          className="text-sky-500 font-medium -m-2 p-2 flex gap-2 items-center w-max rounded-xl hover:bg-sky-200"
        >
          <DolphinIcon />
          {post.pod.name}
        </Link>
        <h2 className="py-4">{post.title}</h2>
        <div className="flex gap-4 text-slate-500 items-center">
          <Link
            href={`/profile/${post.authorId}`}
            className="flex gap-2 items-center hover:text-sky-500"
          >
            <FontAwesomeIcon icon={faUserCircle} />
            {post.author.name}
          </Link>
          <span>{post.createdAt.toDateString()}</span>
        </div>
        <div className="py-2">{post.content}</div>
        <button className="absolute top-4 right-4">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        <div className="flex gap-4 py-2">
          <LikeButton liked={liked} likes={10} onClick={handleLikeClick} />
          <CommentButton
            comments={post._count.comments}
            onClick={handleCommentClick}
          />
        </div>
      </Link>
      {modalIsOpen && <CommentModal close={handleCommentClick} />}
    </article>
  );
}
