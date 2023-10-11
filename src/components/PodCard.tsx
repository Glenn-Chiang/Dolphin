"use client";

import { useCurrentUser } from "@/auth";
import { PodDetail } from "@/db/types";
import Link from "next/link";
import React from "react";
import { joinPod, leavePod } from "@/db/pods";
import { JoinButton } from "./buttons";
import PodIcon from "./PodIcon";

export default function PodCard({ pod }: { pod: PodDetail }) {
  const userId = useCurrentUser();
  const alreadyJoined = !!pod.members.find(
    (member) => member.memberId === userId
  );

  const handleClick = () => {
    if (alreadyJoined) {
      leavePod(pod.id);
    } else {
      joinPod(pod.id);
    }
  };

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/pods/${pod.id}`}>
        <div className="flex gap-2 items-center">
          <PodIcon src={pod.iconSource || undefined}/>
          <h2>{pod.name}</h2>
        </div>
        <p className="py-4">{pod.about}</p>
        <div className="flex gap-4 items-center">
          <JoinButton onClick={handleClick} alreadyJoined={alreadyJoined} />
          <span className="text-slate-500">
            {pod.members.length} member{pod.members.length !== 1 && "s"}
          </span>
        </div>
      </Link>
    </article>
  );
}
