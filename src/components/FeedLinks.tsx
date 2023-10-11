'use client'

import TabLink from "./TabLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHome } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation';

export default function FeedLinks() {
  const pathname = usePathname()

  return (
    <div className="flex gap-4">
      <TabLink href="/" activePath={pathname}>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faHome} />
          For You
        </div>
      </TabLink>
      <TabLink href="/new" activePath={pathname}>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faFire} />
          New
        </div>
      </TabLink>
    </div>
  );

}