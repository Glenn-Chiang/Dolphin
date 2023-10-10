"use client";

import { useCurrentUser } from "@/auth";
import { deletePost, likePost } from "@/db/posts";
import { PostDetail } from "@/db/types";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import CommentModal from "./comment/CommentModal";
import ContextMenu from "./ContextMenu";
import DolphinIcon from "./DolphinIcon";
import { CommentButton, LikeButton, MenuButton } from "./buttons";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function PostCard({ post }: { post: PostDetail }) {
  const currentUserId = useCurrentUser();

  const isOwnPost = currentUserId === post.authorId;

  const [liked, setLiked] = useState(
    !!post.likedBy.find((user) => user.id === currentUserId)
  );
  const [likes, setLikes] = useState(post._count.likedBy);

  const handleLikeClick = async () => {
    // Optimistically update like button UI
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    await likePost(post.id);
  };

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

  const handleCommentClick = () => {
    setCommentModalIsOpen((prev) => !prev);
  };

  const [menuIsShown, setMenuIsShown] = useState(false);
  const toggleMenu = () => {
    setMenuIsShown((prev) => !prev);
  };

  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/post/${post.id}/edit`);
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
        <div className="py-2 whitespace-pre-wrap">{post.content}</div>
        {isOwnPost && (
          <MenuButton onClick={toggleMenu} isToggled={menuIsShown} />
        )}
        <div className="flex gap-4 py-2">
          <LikeButton liked={liked} likes={likes} onClick={handleLikeClick} />
          <CommentButton
            comments={post._count.comments}
            onClick={handleCommentClick}
          />
        </div>
      </Link>
      {menuIsShown && (
        <ContextMenu
          handleEditClick={handleEditClick}
          handleDeleteClick={() => deletePost(post.id)}
        />
      )}
      {commentModalIsOpen && (
        <CommentModal close={handleCommentClick} post={post} />
      )}
    </article>
  );
}
