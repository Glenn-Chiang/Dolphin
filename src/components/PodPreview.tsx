"use client";

import { Pod } from "@prisma/client";
import Link from "next/link";
import React from "react";

type PodPreviewProps = {
  pod: Pod;
};

export default function PodPreview({ pod }: PodPreviewProps) {
  const handleClickJoin = () => {};

  return (
    <li className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/pods/${pod.id}`}>
        <h2>{pod.name}</h2>
        <p className="py-4">{pod.about}</p>
        <div className="flex gap-4 items-center">
          <JoinButton onClick={handleClickJoin} />
          <span className="text-slate-500">{0} members</span>
        </div>
      </Link>
    </li>
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
