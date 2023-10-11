"use client";

import { useCurrentUser } from "@/auth";
import DolphinIcon from "@/components/DolphinIcon";
import {
  CreatePostButton,
  JoinButton,
  SubmitButton,
} from "@/components/buttons";
import { joinPod, leavePod } from "@/db/pods";
import { PodDetail } from "@/db/types";

export default function PodBanner({ pod }: { pod: PodDetail }) {
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
    <section className="bg-white p-4 rounded-md shadow flex flex-col gap-4">
      <div className="flex gap-4">
        <DolphinIcon />
        <h1>{pod.name}</h1>
      </div>
      <p className="">{pod.about}</p>
      <p className="text-slate-500">
        Created on {pod.createdAt.toLocaleDateString()}
      </p>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <JoinButton onClick={handleClick} alreadyJoined={alreadyJoined} />
          <span className="text-slate-500">{pod.members.length} members</span>
        </div>
        <CreatePostButton podId={pod.id} />
      </div>
    </section>
  );
}