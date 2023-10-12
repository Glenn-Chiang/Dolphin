"use client";

import { Pod } from "@prisma/client";
import { useState } from "react";
import TopNav from "@/components/nav/TopNav";
import Sidebar from "@/components/nav/Sidebar";

export default function Navbars({ pods }: { pods: Pod[] }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  return (
    <>
      <TopNav toggleSidebar={() => setSidebarIsOpen((prev) => !prev)} />
      {sidebarIsOpen && <Sidebar pods={pods} />}
    </>
  );
}

