"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEdit,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "@prisma/client";
import { useState } from "react";
import ProfileModal from "@/app/profile/[id]/ProfileModal";
import { useCurrentUser } from "@/auth";
import { FollowButton, SubmitButton } from "@/components/buttons";
import { UserDetail } from "@/db/types";
import { follow, unfollow } from "@/db/follows";

export default function Banner({ user }: { user: UserDetail }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isOwnProfile = useCurrentUser() === user.id;

  const alreadyFollowed = !!user.followers.find(
    (follower) => follower.followerId === useCurrentUser()
  );

  const handleFollowClick = async () => {
    if (alreadyFollowed) {
      await unfollow(user.id);
    } else {
      await follow(user.id);
    }
  };

  return (
    <section className="bg-white rounded-md shadow p-4 flex flex-col gap-4 relative">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-4xl text-sky-500"
        />
        <h1>{user.name} </h1>
        {isOwnProfile && <h2 className="text-slate-500">(You)</h2>}
      </div>
      <p className="flex gap-2 text-slate-500 items-center">
        <FontAwesomeIcon icon={faCalendar} />
        <span>Joined</span>
        <span>{user.createdAt.toLocaleDateString()}</span>
      </p>
      <p className="">{user.about}</p>
      <div className="flex gap-4">
        <div className="">
          {user.followers.length}{" "}
          <span className="text-slate-500">followers</span>
        </div>
        <div className="">
          {user._count.following}{" "}
          <span className="text-slate-500">following</span>
        </div>
      </div>
      {isOwnProfile || (
        <div>
          <FollowButton
            alreadyFollowed={alreadyFollowed}
            onClick={handleFollowClick}
          />
        </div>
      )}
      {isOwnProfile && <EditButton onClick={() => setModalIsOpen(true)} />}
      {modalIsOpen && (
        <ProfileModal about={user.about} close={() => setModalIsOpen(false)} />
      )}
    </section>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 flex gap-2 items-center p-2 rounded-full border border-slate-500 text-slate-500 hover:bg-slate-200"
    >
      <FontAwesomeIcon icon={faEdit} />
      Edit profile
    </button>
  );
}
