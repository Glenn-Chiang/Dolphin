import { getCurrentUser } from "@/auth";
import DolphinIcon from "@/components/DolphinIcon";
import PodLink from "@/components/PodLink";
import { getUserPods } from "@/db/pods";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import "../globals.css";
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
        <div className="absolute sm:left-1/4 sm:w-3/4 mt-16 mb-10 p-4 ">
          {children}
        </div>
      </body>
    </html>
  );
}

async function SideNav() {
  const userId = getCurrentUser()
  const pods = await getUserPods(userId)
  return (
    <section className="hidden sm:flex flex-col fixed w-1/4 mt-16 left-0 top-0 h-screen overflow-y-auto z-10 p-4 bg-slate-50 shadow">
      <h1 className="">Your Pods</h1>
      <nav className="flex flex-col py-4 -mx-2">
        {pods.map(pod => <PodLink key={pod.id} pod={pod}/>)}
      </nav>
    </section>
  );
}


function TopNav() {
  return (
    <nav className="bg-sky-500 text-white text-xl p-2 flex justify-between items-center fixed h-16 w-screen top-0 left-0 z-20 font-medium">
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
