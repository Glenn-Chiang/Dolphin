"use client";

import { follow, unfollow } from "@/actions/follows";
import Avatar from "@/components/Avatar";
import { FollowButton } from "@/components/buttons";
import { useCurrentUser } from "@/lib/auth";
import { UserDetail } from "@/lib/types";
import { faCalendar, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import Image from "next/image";

export default function Banner({ user }: { user: UserDetail }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentUserId = useCurrentUser();
  const isOwnProfile = currentUserId === user.id;

  const alreadyFollowed = !!user.followers.find(
    (follower) => follower.followerId === currentUserId
  );

  const [isPending, setIsPending] = useState(false);

  const handleFollowClick = async () => {
    setIsPending(true);
    if (alreadyFollowed) {
      await unfollow(user.id);
    } else {
      await follow(user.id);
    }
    setIsPending(false);
  };

  return (
    <section className="bg-white rounded-md shadow p-4 flex flex-col gap-4 relative items-center">
      <div className="flex gap-2 items-center justify-center">
        <Image
          src={user.avatarSource || ""}
          alt=""
          width={80}
          height={80}
          className="rounded-full border-2 "
        />
        <div className="flex flex-col gap-2 items-center ">
          <h1>{user.name} </h1>
          <p className="flex gap-2 text-slate-500 items-center">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Joined</span>
            <span>{user.createdAt.toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <p className="sm:w-1/2 text-center">{user.about}</p>
      <div className="flex gap-4 py-4">
        <div>
          <span className="font-medium">{user._count.posts}</span>{" "}
          <span className="text-slate-500">Posts</span>
        </div>
        <div className="">
          <span className="font-medium">{user.followers.length}</span>{" "}
          <span className="text-slate-500">Followers</span>
        </div>
        <div className="">
          <span className="font-medium">{user._count.following}</span>{" "}
          <span className="text-slate-500">Following</span>
        </div>
      </div>
      {isOwnProfile || (
        <div>
          <FollowButton
            isPending={isPending}
            alreadyFollowed={alreadyFollowed}
            onClick={handleFollowClick}
          />
        </div>
      )}
      {isOwnProfile && <EditButton onClick={() => setModalIsOpen(true)} />}
      {modalIsOpen && (
        <ProfileModal user={user} close={() => setModalIsOpen(false)} />
      )}
    </section>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-max sm:absolute right-4 top-4 flex gap-2 items-center p-2 rounded-md shadow bg-slate-200 hover:bg-slate-300 text-slate-600"
    >
      <FontAwesomeIcon icon={faUserEdit} />
      Edit
    </button>
  );
}
