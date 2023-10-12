"use client";

import TabLink from "@/components/TabLink";
import { UserDetail } from "@/lib/types";
import {
  faComment,
  faNoteSticky,
  faPeopleGroup,
  faUserFriends,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

export default function ProfileLinks({ user }: { user: UserDetail }) {
  const path = usePathname();

  return (
    <nav className="flex gap-4 font-medium bg-white p-2 rounded-md shadow overflow-x-scroll">
      <TabLink
        activePath={path}
        href={`/profile/${user.id}`}
      >
        <FontAwesomeIcon icon={faNoteSticky} />
        Posts
      </TabLink>
      <TabLink
        activePath={path}
        href={`/profile/${user.id}/comments`}
      >
        <FontAwesomeIcon icon={faComment} />
        Comments
      </TabLink>
      <TabLink
        activePath={path}
        href={`/profile/${user.id}/pods`}
      >
        <FontAwesomeIcon icon={faPeopleGroup} />
        Pods
      </TabLink>
      <TabLink
        activePath={path}
        href={`/profile/${user.id}/followers`}
      >
        <FontAwesomeIcon icon={faUserFriends} />
        Followers
      </TabLink>
      <TabLink
        activePath={path}
        href={`/profile/${user.id}/following`}
      >
        <FontAwesomeIcon icon={faUserGroup} />
        Following
      </TabLink>
    </nav>
  );
}
