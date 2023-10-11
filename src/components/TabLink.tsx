import { count } from "console";
import Link from "next/link";
import React from "react";

type TabLinkProps = {
  activePath: string;
  href: string;
  count: number;
  children: React.ReactNode;
};

export default function TabLink({ activePath, href, children, count }: TabLinkProps) {
  const isActive = activePath === href
  return (
    <Link
      href={href}
      className={`p-2 flex gap-2 items-center ${
        isActive ? "text-sky-500 underline underline-offset-8" : "hover:text-sky-500 "
      }`}
    >
      {children}
      <CountCircle count={count} isActive={isActive}/>
    </Link>
  );
}


function CountCircle({ count, isActive }: { count: number; isActive: boolean }) {
  return (
    <span className={`${isActive ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'} w-8 h-8 justify-center items-center flex rounded-full`}>
      {count}
    </span>
  );
}