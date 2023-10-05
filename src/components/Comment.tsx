"use client";

import { useState } from "react";
import { LikeButton, CommentButton, MenuButton } from "./buttons";
import { CommentDetail } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getCurrentUser } from "@/auth";

type CommentProps = {
  comment: CommentDetail;
};

export default function Comment({ comment }: CommentProps) {
  const userId = getCurrentUser();
  const isOwnComment = userId === comment.authorId;

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleReplyClick = () => {};

  const [menuIsShown, setMenuIsShown] = useState(false);

  const toggleMenu = () => {
    setMenuIsShown((prev) => !prev);
  };

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
        <span className="text-slate-500">
          {comment.createdAt.toDateString()}
        </span>
      </div>
      <p>{comment.content}</p>
      <div className="flex gap-2">
        <LikeButton onClick={handleLikeClick} liked={liked} />
        <CommentButton onClick={handleReplyClick} />
      </div>
      {isOwnComment && <MenuButton onClick={toggleMenu} isToggled={menuIsShown}/>}
      {menuIsShown && <ContextMenu />}
    </article>
  );
}

function ContextMenu() {
  return (
    <div className="absolute right-2 top-16 z-10 shadow bg-slate-100 rounded-md text-slate-600 flex flex-col items-start ">
      <EditButton />
      <DeleteButton />
    </div>
  );
}

function EditButton() {
  return (
    <button className="p-3 flex gap-2 items-center hover:bg-slate-200 w-full rounded-t-md">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );
}

function DeleteButton() {
  return (
    <button className="p-3 flex gap-2 items-center hover:bg-slate-200 w-full rounded-b-md">
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </button>
  );
}
