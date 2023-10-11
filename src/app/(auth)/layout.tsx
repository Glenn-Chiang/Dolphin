import type { Metadata } from "next";
import "../../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import React from "react";
import AuthProvider from "@/components/AuthProvider";
import { Montserrat } from 'next/font/google';
import DolphinIcon from "@/components/DolphinIcon";

export const metadata: Metadata = {
  title: "Dolphin",
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" spellCheck="false" className={montserrat.className}>
      <body className="p-4 flex justify-center items-center h-screen ">
        {/* <DolphinIcon large={true}/> */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
