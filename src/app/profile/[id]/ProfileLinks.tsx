'use client'

import TabLink from "@/components/TabLink";
import {usePathname} from 'next/navigation'

export default function ProfileLinks({userId}: {userId: number}) {
  const path = usePathname()

  return (
    <nav className="flex gap-4 font-medium bg-white p-2 rounded-md shadow">
      <TabLink activePath={path} href={`/profile/${userId}`}>
        Posts
      </TabLink>
      <TabLink activePath={path} href={`/profile/${userId}/comments`}>
        Comments
      </TabLink>
      <TabLink activePath={path} href={`/profile/${userId}/pods`}>
        Pods
      </TabLink>
      <TabLink activePath={path} href={`/profile/${userId}/followers`}>
        Followers
      </TabLink>
      <TabLink activePath={path} href={`/profile/${userId}/following`}>
        Following
      </TabLink>
    </nav>
  );
}