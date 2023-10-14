"use client";

import { deleteComment, likeComment } from "@/actions/comments";
import { useCurrentUser } from "@/lib/auth";
import { CommentDetail } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import MenuButton from "../MenuButton";
import ReplyModal from "../ReplyModal";
import { CommentButton, LikeButton } from "../buttons";
import EditCommentModal from "./EditCommentModal";

// 1 top-level parent comment with its replies
export default function Comment({ comment }: { comment: CommentDetail }) {
  const userId = useCurrentUser();
  const isOwnComment = userId === comment.authorId;

  const [liked, setLiked] = useState(
    !!comment.likedBy.find((user) => user.id === userId)
  );
  const [likes, setLikes] = useState(comment.likedBy.length)

  const handleLikeClick = async () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    await likeComment(comment.id);
  };

  const [replyModalIsShown, setReplyModalIsShown] = useState(false);
  const handleReplyClick = () => {
    setReplyModalIsShown(true);
  };

  // Show edit modal when edit button is clicked
  const [editModalIsShown, setEditModalIsShown] = useState(false);
  const handleEdit = () => {
    setEditModalIsShown(true);
  };

  // Delete immediately when delete button is clicked
  const handleDelete = () => {
    deleteComment(comment.id);
  };

  return (
    <article className="relative -mr-4 ">
      <div className="flex items-center">
        <Link
          href={`/profile/${comment.authorId}`}
          className="flex gap-2 items-center text-slate-500 hover:text-sky-500 w-max p-2 -ml-2"
        >
          <Avatar user={comment.author} />
          {comment.author ? comment.author.name : "[deleted]"}
        </Link>
        <span className="text-slate-500">
          {comment.createdAt.toDateString()}
        </span>
      </div>
      <p className="py-2">{comment.content}</p>
      <div className="flex gap-2 -ml-2">
        <LikeButton
          onClick={handleLikeClick}
          liked={liked}
          likes={likes}
        />
        {!comment.parentCommentId && (
          <CommentButton
            onClick={handleReplyClick}
            comments={comment._count.replies}
          />
        )}
      </div>
      {isOwnComment && (
        <MenuButton
          handleEditClick={handleEdit}
          handleDeleteClick={handleDelete}
        />
      )}
      {editModalIsShown && (
        <EditCommentModal
          close={() => setEditModalIsShown(false)}
          comment={comment}
        />
      )}
      {replyModalIsShown && (
        <ReplyModal
          close={() => setReplyModalIsShown(false)}
          comment={comment}
        />
      )}
    </article>
  );
}
