"use client";

import { useCurrentUser } from "@/lib/auth";
import DolphinIcon from "@/components/DolphinIcon";
import {
  faBars,
  faChevronDown,
  faSignOut,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TopNav({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const toggleDropdown = () => setDropdownIsOpen((prev) => !prev);

  const userId = useCurrentUser();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hideDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      event.target instanceof Node &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownIsOpen(false);
    }
  };
  // Enables hiding of dropdown by clicking outside of it
  useEffect(() => {
    if (dropdownIsOpen) {
      document.addEventListener("click", hideDropdown);
    } else {
      document.removeEventListener("click", hideDropdown);
    }
    return () => document.removeEventListener("click", hideDropdown);
  }, [dropdownIsOpen]);

  return (
    <nav className="bg-white text-xl p-2 pr-4 flex justify-between items-center fixed h-16 w-screen top-0 left-0 z-20 font-medium shadow-md">
      <div className="flex gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-slate-200 w-10 h-10 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href={"/"} className="flex gap-2 items-center">
          <DolphinIcon />
          Dolphin
        </Link>
      </div>
      <div onClick={toggleDropdown} className="relative">
        <div
          className={`flex gap-2 items-center hover:bg-slate-200 p-3 rounded-full ${
            dropdownIsOpen && "bg-slate-200"
          }`}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
        </div>
        {dropdownIsOpen && (
          <div ref={dropdownRef}>
            <ProfileDropdown userId={userId} />
          </div>
        )}
      </div>
    </nav>
  );
}

function ProfileDropdown({ userId }: { userId: number | null }) {
  return (
    <nav className="absolute flex-col text-base bg-slate-100 shadow text-slate-600 top-12 right-2 w-max rounded-md">
      <Link
        href={`/profile/${userId}`}
        className="flex gap-2 items-center p-2 hover:bg-slate-200 rounded-t-md"
      >
        <FontAwesomeIcon icon={faUser} />
        My Profile
      </Link>
      <Link
        href={"/logout"}
        className="flex gap-2 items-center p-2 hover:bg-slate-200 rounded-b-md"
      >
        <FontAwesomeIcon icon={faSignOut} />
        Logout
      </Link>
    </nav>
  );
}
