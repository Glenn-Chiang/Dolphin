"use client";

import { joinPod, leavePod } from "@/actions/pods";
import MenuButton from "@/components/MenuButton";
import Modal from "@/components/Modal";
import PodIcon from "@/components/PodIcon";
import { CreatePostButton, JoinButton } from "@/components/buttons";
import { useCurrentUser } from "@/lib/auth";
import { PodDetail } from "@/lib/types";
import { Pod } from "@prisma/client";
import { useState } from "react";
import EditModal from "./EditPodModal";
import Image from "next/image";

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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = () => {};

  return (
    <>
      <section className="bg-white p-4 rounded-md shadow flex flex-col gap-4 relative items-center">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Image
            src={pod.iconSource || ""}
            alt=""
            height={80}
            width={80}
            className="border-2 rounded-full"
          />
          <div className="flex flex-col gap-2 items-center">
            <h1>{pod.name}</h1>
            <span className="text-slate-500">{pod.members.length} members</span>
          </div>
        </div>
            <p className="text-slate-500">
              Created on {pod.createdAt.toLocaleDateString()}
            </p>
        <p className="text-center sm:w-1/2">{pod.about}</p>
        <div className="flex gap-4">
          <JoinButton onClick={handleClick} alreadyJoined={alreadyJoined} />
          <CreatePostButton podId={pod.id} />
        </div>
        <MenuButton
          handleEditClick={() => setModalIsOpen(true)}
          handleDeleteClick={handleDelete}
        />
      </section>
      {modalIsOpen && (
        <EditModal pod={pod} close={() => setModalIsOpen(false)} />
      )}
    </>
  );
}
