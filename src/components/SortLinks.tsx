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
      <SortLink href={`/${context}/${id}?sort=hot`} >
        <FontAwesomeIcon icon={faFire} />
        Hot
      </SortLink>
      <SortLink href={`/${context}/${id}?sort=new`} >
        <FontAwesomeIcon icon={faStarOfLife} />
        New
      </SortLink>
      <SortLink href={`/${context}/${id}?sort=top`} >
        <FontAwesomeIcon icon={faRocket} />
        Top
      </SortLink>
    </div>
  );
}

type SortLinkProps = {
  href: string;
  children: React.ReactNode;
};

function SortLink({ href, children }: SortLinkProps) {
  const activePath = usePathname() // Does not contain search params
  const searchParams = useSearchParams()
  const sortOrder = searchParams.get('sort') // 'new', 'top', 'hot'
  const isActive = href === activePath + `?sort=${sortOrder}`
  
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
