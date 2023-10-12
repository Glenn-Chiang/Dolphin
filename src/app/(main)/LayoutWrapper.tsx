"use client";

import { Pod } from "@prisma/client";
import { useState } from "react";
import TopNav from "@/components/nav/TopNav";
import Sidebar from "@/components/nav/Sidebar";

type props = {
  pods: Pod[];
  children: React.ReactNode
}

export default function LayoutWrapper({ pods, children }: props) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  return (
    <>
      <TopNav toggleSidebar={() => setSidebarIsOpen((prev) => !prev)} />
      {sidebarIsOpen && <Sidebar pods={pods} />}
      <div
        className={`absolute w-full ${
          sidebarIsOpen ? "sm:left-1/4 sm:w-3/4 " : "w-full"
        } mt-16 mb-10 p-4 `}
      >
        {children}
      </div>
    </>
  );
}
