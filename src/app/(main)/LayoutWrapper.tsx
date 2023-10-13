"use client";

import { Pod } from "@prisma/client";
import { useState, useEffect } from "react";
import TopNav from "@/components/nav/TopNav";
import Sidebar from "@/components/nav/Sidebar";
import { usePathname } from "next/navigation";

type props = {
  pods: Pod[];
  children: React.ReactNode;
};

export default function LayoutWrapper({ pods, children }: props) {
  // Sidebar behaviour is determined by whether layout is mobile or not
  const mobileBreakpoint = 640;
  const [isMobile, setIsMobile] = useState(false);
  // Listen for window resize to update isMobile state
  useEffect(() => {
    setIsMobile(window.innerWidth <= mobileBreakpoint)

    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // On mobile, clicking any link (i.e. changing pathname) will close sidebar
  // On mobile, sidebar is closed by default. On larger screens, sidebar is open by default
  const pathname = usePathname();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setSidebarIsOpen(false);
    } else {
      setSidebarIsOpen(true)
    }
  }, [pathname, isMobile]);

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
