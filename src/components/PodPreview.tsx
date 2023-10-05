"use client";

import { getCurrentUser } from "@/auth";
import { PodDetail } from "@/types";
import Link from "next/link";
import React from "react";

export default function PodPreview({ pod }: {pod: PodDetail}) {
  const userId = getCurrentUser()
  // const alreadyJoined 
  const handleClickJoin = () => {};

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/pods/${pod.id}`}>
        <h2>{pod.name}</h2>
        <p className="py-4">{pod.about}</p>
        <div className="flex gap-4 items-center">
          <JoinButton onClick={handleClickJoin} />
          <span className="text-slate-500">{0} members</span>
        </div>
      </Link>
    </article>
  );
}

type JoinButtonProps = {
  onClick: () => void;
};

function JoinButton({ onClick }: JoinButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault(); // don't nevigate to link path when button is clicked
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-sky-500 text-white p-2 rounded-md shadow hover:shadow-lg hover:bg-sky-400"
    >
      Join Pod
    </button>
  );
}
