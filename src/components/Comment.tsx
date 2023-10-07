"use client";

import { getCurrentUser } from "@/auth";
import { deleteComment, likeComment } from "@/db/comments";
import { CommentDetail } from "@/types";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { CommentButton, LikeButton, MenuButton } from "./buttons";
import ContextMenu from "./ContextMenu";
import EditCommentModal from "./EditCommentModal";

type CommentProps = {
  comment: CommentDetail;
};

export default function Comment({ comment }: CommentProps) {
  const userId = getCurrentUser();
  const isOwnComment = userId === comment.authorId;

  const [liked, setLiked] = useState(!!comment.likedBy.find(user => user.id === userId));

  const handleLikeClick = async () => {
    setLiked((prev) => !prev);
    await likeComment(comment.id)
  };

  const handleReplyClick = () => {};

  const [menuIsShown, setMenuIsShown] = useState(false);

  const toggleMenu = () => {
    setMenuIsShown((prev) => !prev);
  };

  const [editModalIsShown, setEditModalIsShown] = useState(false);
  const handleEdit = () => {
    setMenuIsShown(false);
    setEditModalIsShown(true);
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
      <p className="py-2">{comment.content}</p>
      <div className="flex gap-2 -ml-2">
        <LikeButton onClick={handleLikeClick} liked={liked} likes={comment.likedBy.length}/>
        <CommentButton onClick={handleReplyClick} comments={comment._count.replies}/>
      </div>
      {isOwnComment && (
        <MenuButton onClick={toggleMenu} isToggled={menuIsShown} />
      )}
      {menuIsShown && (
        <ContextMenu
          handleDeleteClick={() => deleteComment(comment.id)}
          handleEditClick={handleEdit}
        />
      )}
      {editModalIsShown && (
        <EditCommentModal
          close={() => setEditModalIsShown(false)}
          comment={comment}
        />
      )}
    </article>
  );
}
