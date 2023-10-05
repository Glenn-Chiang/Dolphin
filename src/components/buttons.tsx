'use client'

import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SubmitButtonProps = {
  text: string
  onClick?: () => void
}

function SubmitButton({text, onClick}: SubmitButtonProps) {
  return (
    <button onClick={onClick} className="bg-sky-500 text-white p-2 rounded-md shadow shadow-sky-500 hover:shadow-md hover:shadow-sky-500">
      {text}
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


function JoinButton({podId}: {podId: number}) {
  
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

export { SubmitButton, CancelButton, LikeButton, CommentButton };
