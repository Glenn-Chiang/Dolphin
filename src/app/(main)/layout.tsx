import { getUserPods } from "@/actions/pods";
import AuthProvider from "@/components/AuthProvider";
import { getCurrentUser } from "@/lib/auth";
import LayoutWrapper from "./LayoutWrapper";
import TopButton from "@/components/TopButton";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";
import Sidebar from "@/components/nav/Sidebar";
config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dolphin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" spellCheck="false">
      <body className="whitespace-pre-wrap break-words text-slate-800">
        <AuthProvider>
          <LayoutWrapper sidebar={<Sidebar/>}>
            {children}
          </LayoutWrapper>
          <TopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
