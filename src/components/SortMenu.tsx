"use client";

import {
  faFire,
  faRocket,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';

type SortMenuProps = {
  context: "profile" | "pods";
  id: number;
};

export default function SortMenu({context, id}: SortMenuProps) {
  return (
    <div className="bg-white shadow rounded-xl p-2 flex gap-4 items-center ">
      <SortLink context={context} id={id} sortOrder="hot">
        <FontAwesomeIcon icon={faFire} />
        Hot
      </SortLink>
      <SortLink context={context} id={id} sortOrder="new">
        <FontAwesomeIcon icon={faStarOfLife} />
        New
      </SortLink>
      <SortLink context={context} id={id} sortOrder="top">
        <FontAwesomeIcon icon={faRocket} />
        Top
      </SortLink>
    </div>
  );
}

type SortLinkProps = {
  context: 'profile' | 'pods'
  id: number
  sortOrder: 'hot' | 'new' | 'top'
  children: React.ReactNode;
};

function SortLink({ context, id, sortOrder, children }: SortLinkProps) {
  const searchParams = useSearchParams()
  const currentSortOrder = searchParams.get('sort')
  const isActive = sortOrder === currentSortOrder
  
  return (
    <Link
      href={`/${context}/${id}?sort=${sortOrder}`}
      className={`p-2 rounded-full flex gap-2 items-center ${
        isActive ? "text-sky-600 bg-sky-200" : "hover:bg-slate-200"
      }`}
    >
      {children}
    </Link>
  );
}
