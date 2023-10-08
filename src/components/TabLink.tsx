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
        isActive ? "text-sky-500 underline underline-offset-8" : "hover:text-sky-500 "
      }`}
    >
      <h2>{children}</h2>
    </Link>
  );
}
