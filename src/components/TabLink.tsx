import Link from "next/link";
import React from "react";

type TabLinkProps = {
  activePath: string;
  href: string;
  children: React.ReactNode;
};

export default function TabLink({ activePath, href, children }: TabLinkProps) {
  const isActive = activePath === href;
  return (
    <Link
      href={href}
      className={`p-2 text-lg flex gap-2 items-center ${
        isActive ? "text-sky-500 " : "hover:text-sky-400 "
      }`}
    >
      {children}
    </Link>
  );
}
