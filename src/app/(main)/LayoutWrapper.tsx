"use client";

import { Pod } from "@prisma/client";
import React, { useState, useEffect } from "react";
import TopNav from "@/components/nav/TopNav";
import Sidebar from "@/components/nav/Sidebar";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";

type props = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: props) {
  // Sidebar behaviour is determined by whether layout is mobile or not
  const mobileBreakpoint = 640;
  const [isMobile, setIsMobile] = useState(true);
  // Listen for window resize to update isMobile state
  useEffect(() => {
    setIsMobile(window.innerWidth <= mobileBreakpoint);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathname = usePathname();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(!isMobile); // On mobile, sidebar is closed by default. On larger screens, sidebar is open by default

  useEffect(() => {
    if (isMobile) {
      setSidebarIsOpen(false); // On mobile, clicking any link (i.e. changing pathname) will close sidebar
    }
  }, [pathname, isMobile]);

  useEffect(() => {
    if (!isMobile) { // Shrinking to mobile size then enlarging will trigger the sidebar to reopen
      setSidebarIsOpen(true)
    }
  }, [isMobile])

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TopNav toggleSidebar={() => setSidebarIsOpen((prev) => !prev)} />
      {sidebarIsOpen && <Sidebar />}
      <div
        className={`absolute w-full ${
          sidebarIsOpen ? "sm:left-1/4 sm:w-3/4 " : "w-full"
        } mt-16 mb-10 p-2 sm:p-4 `}
      >
        {children}
      </div>
    </QueryClientProvider>
  );
}
