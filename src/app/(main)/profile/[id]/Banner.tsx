"use client";

import { useCurrentUser } from "@/lib/auth";
import { FollowButton } from "@/components/buttons";
import { follow, unfollow } from "@/actions/follows";
import { UserDetail } from "@/lib/types";
import {
  faCalendar,
  faEdit,
  faUserCircle,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import Avatar from "@/components/Avatar";

export default function Banner({ user }: { user: UserDetail }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentUserId = useCurrentUser();
  const isOwnProfile = currentUserId === user.id;

  const alreadyFollowed = !!user.followers.find(
    (follower) => follower.followerId === currentUserId
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
        <Avatar user={user} />
        <h1>{user.name} </h1>
        {isOwnProfile && <h2 className="text-slate-500">(You)</h2>}
      </div>
      <p className="flex gap-2 text-slate-500 items-center">
        <FontAwesomeIcon icon={faCalendar} />
        <span>Joined</span>
        <span>{user.createdAt.toLocaleDateString()}</span>
      </p>
      <p className="">{user.about}</p>
      <div className="flex gap-4 ">
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
      className="absolute right-4 top-4 flex gap-2 items-center p-2 rounded-full border border-slate-500 text-slate-500 hover:bg-slate-200"
    >
      <FontAwesomeIcon icon={faUserEdit} />
      Edit profile
    </button>
  );
}
