"use client";

import {
  faFire,
  faRocket,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabLink from "./TabLink";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SortMenuProps = {
  context: "profile" | "pods";
  id: number;
};

export default function SortMenu({context, id}: SortMenuProps) {
  const path = usePathname();
  return (
    <div className="bg-white shadow rounded-xl p-2 flex gap-4 items-center ">
      <SortLink href={`/${context}/${id}`} activePath={path}>
        <FontAwesomeIcon icon={faFire} />
        Hot
      </SortLink>
      <SortLink href={`/${context}/${id}/new`} activePath={path}>
        <FontAwesomeIcon icon={faStarOfLife} />
        New
      </SortLink>
      <SortLink href={`/${context}/${id}/top`} activePath={path}>
        <FontAwesomeIcon icon={faRocket} />
        Top
      </SortLink>
    </div>
  );
}

type SortLinkProps = {
  activePath: string;
  href: string;
  children: React.ReactNode;
};

function SortLink({ activePath, href, children }: SortLinkProps) {
  const isActive = activePath === href;
  return (
    <Link
      href={href}
      className={`p-2 rounded-full flex gap-2 items-center ${
        isActive ? "text-sky-600 bg-sky-200" : "hover:bg-slate-200"
      }`}
    >
      {children}
    </Link>
  );
}
