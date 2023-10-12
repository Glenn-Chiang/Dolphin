"use client";

import { likePost, deletePost } from "@/actions/posts";
import { useCurrentUser } from "@/lib/auth";
import { PostDetail } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "./Avatar";
import PodIcon from "./PodIcon";
import { CommentButton, LikeButton } from "./buttons";
import CommentModal from "./comment/CommentModal";
import MenuButton from "./MenuButton";

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

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/post/${post.id}`}>
        <Link
          href={`/pods/${post.podId}`}
          className="text-sky-500 font-medium -m-2 p-2 flex gap-2 items-center w-max rounded-xl hover:bg-sky-200"
        >
          <PodIcon src={post.pod.iconSource} />
          {post.pod.name}
        </Link>
        <h2 className="py-4">{post.title}</h2>
        <div className="flex gap-4 text-slate-500 items-center">
          <Link
            href={`/profile/${post.authorId}`}
            className="flex gap-2 items-center hover:text-sky-500"
          >
            <Avatar user={post.author} />
            {post.author ? post.author.name : "[deleted]"}
          </Link>
          <span>{post.createdAt.toDateString()}</span>
        </div>
        <div className="py-2 whitespace-pre-wrap">{post.content}</div>
        {isOwnPost && (
          <MenuButton
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDelete}
          />
        )}
        <div className="flex gap-4 py-2">
          <LikeButton liked={liked} likes={likes} onClick={handleLikeClick} />
          <CommentButton
            comments={post._count.comments}
            onClick={handleCommentClick}
          />
        </div>
      </Link>

      {commentModalIsOpen && (
        <CommentModal close={handleCommentClick} post={post} />
      )}
    </article>
  );
}
