"use client";

import { likePost, deletePost } from "@/actions/posts";
import { useCurrentUser } from "@/lib/auth";
import { PostDetail } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import PodIcon from "./PodIcon";
import { CommentButton, LikeButton } from "./buttons";
import CommentModal from "./comment/CommentModal";
import MenuButton from "./MenuButton";
import { DateTime } from "luxon";
import Image from "next/image";

type PostCardProps = {
  post: PostDetail;
  full?: boolean;
};

export default function PostCard({ post, full }: PostCardProps) {
  const currentUserId = useCurrentUser();

  const isOwnPost = currentUserId === post.authorId;

  const [liked, setLiked] = useState(
    !!post.likedBy.find((user) => user.id === currentUserId)
  );
  const [likes, setLikes] = useState(post._count.likedBy);

  useEffect(() => {
    setLiked(!!post.likedBy.find((user) => user.id === currentUserId));
  }, [currentUserId, post.likedBy]);

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
        <div className="flex gap-4 text-slate-500 items-center ">
          <Link
            href={`/pods/${post.podId}`}
            className="text-sky-500 font-medium -m-2 p-2 flex gap-2 items-center w-max rounded-xl hover:bg-sky-200"
          >
            <PodIcon src={post.pod.iconSource} />
            {post.pod.name}
          </Link>
          <span>{DateTime.fromJSDate(post.createdAt).toRelative()}</span>
        </div>
        <h2 className="py-2">{post.title}</h2>
        {full && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">posted by</span>
            <Link
              href={`/profile/${post.authorId}`}
              className="flex gap-2 items-center text-sky-500 hover:text-sky-400"
            >
              {post.author ? post.author.name : "[deleted]"}
            </Link>
          </div>
        )}
        <div className="py-2 whitespace-pre-wrap">{post.content}</div>

        {post.imageUrl && (
          <div className="rounded-md p-2">
            <Image
              src={post.imageUrl}
              alt=""
              width={400}
              height={400}
              className="rounded-2xl w-full object-contain max-h-[50vh]"
            />
          </div>
        )}

        <div className="flex gap-4 py-2">
          <LikeButton liked={liked} likes={likes} onClick={handleLikeClick} />
          <CommentButton
            comments={post._count.comments}
            onClick={handleCommentClick}
          />
        </div>
      </Link>
      {isOwnPost && (
        <div className="absolute right-4 top-4">
          <MenuButton
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDelete}
          />
        </div>
      )}
      {commentModalIsOpen && (
        <CommentModal close={handleCommentClick} post={post} />
      )}
    </article>
  );
}
