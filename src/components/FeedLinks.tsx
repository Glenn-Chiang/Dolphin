"use client";

import TabLink from "./TabLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHome } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function FeedLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 w-full">
      <TabLink href="/" activePath={pathname} >
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faHome} />
          <h2>For You</h2>
        </div>
      </TabLink>
      <TabLink href="/new" activePath={pathname} >
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faFire} />
          <h2>New</h2>
        </div>
      </TabLink>
    </div>
  );
}
