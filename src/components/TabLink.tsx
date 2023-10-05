import Link from "next/link";
import React from "react";

type TabLinkProps = {
  activePath: string;
  href: string;
  children: React.ReactNode;
};

export default function TabLink({ activePath, href, children }: TabLinkProps) {
  const isActive = activePath === href
  return (
    <Link
      href={href}
      className={`p-2 rounded-2xl ${
        isActive ? "bg-sky-200 text-sky-600" : "hover:bg-slate-200 "
      }`}
    >
      <h2>{children}</h2>
    </Link>
  );
}
