import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import DolphinIcon from "@/components/DolphinIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dolphin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" spellCheck="false">
      <body>
        <TopNav />
        <SideNav />
        <div className="absolute sm:left-1/4 mt-16 mb-10 px-4">{children}</div>
      </body>
    </html>
  );
}

function SideNav() {
  return (
    <section className="hidden sm:flex fixed w-1/4 mt-14 left-0 top-0 h-screen overflow-y-auto bg-slate-200 z-10 py-2 px-4">
      <h1>Your Pods</h1>
    </section>
  );
}

function TopNav() {
  return (
    <nav className="bg-sky-500 text-white text-xl p-2 flex justify-between items-center fixed w-screen top-0 left-0 z-20 font-medium">
      <Link href={"/"} className="flex gap-2 items-center">
        <DolphinIcon />
        Dolphin
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          href={"/create-post"}
          className="flex gap-2 items-center bg-slate-200 text-sky-500 p-1 rounded-md"
        >
          <FontAwesomeIcon icon={faPlus} />
          Post
        </Link>
        <Link href={"/profile"}>
          <FontAwesomeIcon icon={faUserCircle} />
        </Link>
      </div>
    </nav>
  );
}
