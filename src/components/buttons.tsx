"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isPending?: boolean;
};

function SubmitButton({ onClick, children, isPending }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || isPending}
      onClick={onClick}
      className={`${
        pending || isPending
          ? "opacity-50 cursor-not-allowed"
          : " shadow-sky-500 hover:shadow-md hover:shadow-sky-500"
      }  rounded-md shadow w-20 min-w-max flex gap-2 items-center justify-center bg-sky-500 text-white p-2`}
    >
      {(pending || isPending) && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white" />
      )}
      {children}
    </button>
  );
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-md text-slate-500 hover:text-black hover:bg-slate-200"
    >
      Cancel
    </button>
  );
}

type JoinButtonProps = {
  alreadyJoined: boolean;
  onClick: () => void;
  isPending: boolean;
};

function JoinButton({ alreadyJoined, onClick, isPending }: JoinButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault(); // don't nevigate to link path when button is clicked
    onClick();
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={` p-2 rounded-md shadow ${
        alreadyJoined
          ? "text-slate-500 bg-slate-200 hover:bg-slate-300"
          : "text-white bg-sky-500 shadow-sky-500 hover:shadow-md hover:shadow-sky-500 "
      } ${isPending && "opacity-50 cursor-not-allowed "}
      `}
    >
      {isPending && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white" />
      )}
      {alreadyJoined ? "Joined" : "Join Pod"}
    </button>
  );
}

type FollowButtonProps = {
  onClick: () => void;
  alreadyFollowed: boolean;
  isPending: boolean;
};

function FollowButton({
  onClick,
  alreadyFollowed,
  isPending,
}: FollowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={` p-2 rounded-md shadow ${
        alreadyFollowed
          ? "text-slate-500 bg-slate-200 hover:bg-slate-300"
          : "text-white bg-sky-500 shadow-sky-500 hover:shadow-md hover:shadow-sky-500"
      } ${isPending && "opacity-50 cursor-not-allowed "}`}
    >
      {isPending && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white" />
      )}
      {alreadyFollowed ? "Followed" : "Follow"}
    </button>
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
      <span className={`${liked && "text-rose-500"}`}>{likes}</span>
    </button>
  );
}

type CommentButtonProps = {
  comments: number;
  onClick: () => void;
};

function CommentButton({ comments, onClick }: CommentButtonProps) {
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
      {comments}
    </button>
  );
}

function CreatePostButton({ podId }: { podId?: number }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(podId ? `/create-post?pod=${podId}` : "/create-post");
  };
  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-md shadow font-medium bg-sky-500 hover:bg-sky-400 text-white "
    >
      Create Post
    </button>
  );
}

function CreatePodButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/create-pod");
  };
  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-md shadow font-medium bg-sky-500 hover:bg-sky-400 text-white "
    >
      Create Pod
    </button>
  );
}

export {
  CancelButton,
  CommentButton,
  CreatePodButton,
  CreatePostButton,
  FollowButton,
  JoinButton,
  LikeButton,
  SubmitButton,
};
