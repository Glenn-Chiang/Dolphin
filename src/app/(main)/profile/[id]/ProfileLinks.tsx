"use client";

import TabLink from "@/components/TabLink";
import { UserDetail } from "@/db/types";
import { faBookOpen, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { follow } from '@/db/follows';

export default function ProfileLinks({ user }: { user: UserDetail }) {
  const path = usePathname();

  return (
    <nav className="flex gap-4 font-medium bg-white p-2 rounded-md shadow overflow-x-scroll">
      <TabLink
        activePath={path}
        href={`/profile/${user.id}`}
        count={user._count.posts}
      >
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </TabLink>
      <TabLink activePath={path} href={`/profile/${user.id}/comments`} count={user._count.comments}>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </TabLink>
      <TabLink activePath={path} href={`/profile/${user.id}/pods`} count={user._count.pods}>
        Pods
      </TabLink>
      <TabLink activePath={path} href={`/profile/${user.id}/followers`} count={user.followers.length}>
        Followers
      </TabLink>
      <TabLink activePath={path} href={`/profile/${user.id}/following`} count={user._count.following}>
        Following
      </TabLink>
    </nav>
  );
}
