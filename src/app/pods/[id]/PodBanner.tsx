"use client";

import { getCurrentUser } from "@/auth";
import DolphinIcon from "@/components/DolphinIcon";
import { SubmitButton } from "@/components/buttons";
import { joinPod, leavePod } from "@/db/pods";
import { PodDetail } from "@/types";

export default function PodBanner({ pod }: { pod: PodDetail }) {
  const userId = getCurrentUser();
  const alreadyJoined = !!pod.members.find(
    (member) => member.memberId === userId
  );

  const handleClick = () => {
    if (alreadyJoined) {
      joinPod(pod.id);
    } else {
      leavePod(pod.id);
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
      <div className="flex gap-4 items-center">
        <JoinButton onClick={handleClick} alreadyJoined={alreadyJoined} />
        <span className="text-slate-500">{0} members</span>
      </div>
    </section>
  );
}

type JoinButtonProps = {
  alreadyJoined: boolean;
  onClick: () => void;
};

function JoinButton({ alreadyJoined, onClick }: JoinButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-500 p-2 rounded-md shadow text-white shadow-sky-500 hover:shadow-md hover:shadow-sky-500"
    >
      {alreadyJoined ? "Leave" : "Join"} Pod
    </button>
  );
}
