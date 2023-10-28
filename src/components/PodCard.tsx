"use client";

import { useCurrentUser } from "@/lib/auth";
import { PodDetail } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { joinPod, leavePod } from "@/actions/pods";
import { JoinButton } from "./buttons";
import PodIcon from "./PodIcon";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function PodCard({ pod }: { pod: PodDetail }) {
  const currentUserId = useCurrentUser();
  const alreadyJoined = !!pod.members.find(
    (member) => member.memberId === currentUserId
  );

  const [isPending, setIsPending] = useState(false);

  const queryClient = useQueryClient()

  const handleClick = async () => {
    setIsPending(true);
    if (alreadyJoined) {
      await leavePod(pod.id);
    } else {
      await joinPod(pod.id);
    }
    queryClient.invalidateQueries(["users", currentUserId, "pods"]);
    setIsPending(false);
  };

  return (
    <article className="bg-white p-4 pb-2 rounded-md relative shadow hover:shadow-lg transition">
      <Link href={`/pods/${pod.id}`}>
        <div className="flex gap-2 items-center">
          <PodIcon src={pod.iconSource} />
          <h2>{pod.name}</h2>
        </div>
        <p className="py-4">{pod.about}</p>
        <div className="flex gap-4 items-center">
          <JoinButton
            isPending={isPending}
            onClick={handleClick}
            alreadyJoined={alreadyJoined}
          />
          <span className="text-slate-500">
            {pod.members.length} member{pod.members.length !== 1 && "s"}
          </span>
        </div>
      </Link>
    </article>
  );
}
