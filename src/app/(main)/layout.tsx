import { getCurrentUser } from "@/auth";
import AuthProvider from "@/components/AuthProvider";
import DolphinIcon from "@/components/DolphinIcon";
import PodLink from "@/components/PodLink";
import { CreatePostButton } from "@/components/buttons";
import { getUserPods } from "@/db/pods";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import '../../globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
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
      <body className="whitespace-pre-wrap">
        <AuthProvider>
          <TopNav />
          <Sidebar />
          <div className="absolute w-full sm:left-1/4 sm:w-3/4 mt-16 mb-10 p-4 ">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

async function Sidebar() {
  const userId = await getCurrentUser();
  const pods = await getUserPods(userId);
  return (
    <section className="hidden sm:flex flex-col justify-between fixed w-1/4 pt-20 left-0 top-0 h-screen z-10 p-4 bg-slate-50 shadow">
      <div className="flex flex-col gap-2">
        <h1 className="">Your Pods</h1>
        <nav className="flex flex-col -mx-2 max-h-80 overflow-auto">
          {pods.map((pod) => (
            <PodLink key={pod.id} pod={pod} />
          ))}
        </nav>
        <Link
          href={"/pods"}
          className="text-sky-500 font-medium hover:text-sky-400 py-2"
        >
          Explore all pods
        </Link>
      </div>
      <div className="flex gap-2 justify-center flex-col md:flex-row ">
        <CreatePostButton />
        <CreatePodButton />
      </div>
    </section>
  );
}

function CreatePodButton() {
  return (
    <Link
      href={"/create-pod"}
      className="p-2 rounded-md shadow font-medium bg-sky-500 hover:bg-sky-400 text-white"
    >
      Create Pod
    </Link>
  );
}

async function TopNav() {
  const userId = await getCurrentUser();
  return (
    <nav className="bg-sky-500 text-white text-xl p-2  flex justify-between items-center fixed h-16 w-screen top-0 left-0 z-20 font-medium">
      <div className="flex gap-2">
        <button className="p-2 rounded-full hover:bg-sky-600 w-10 h-10 flex justify-center items-center">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href={"/"} className="flex gap-2 items-center">
          <DolphinIcon />
          Dolphin
        </Link>
      </div>
      <Link
        href={`/profile/${userId}`}
        className="p-2 rounded-full hover:bg-sky-600 w-10 h-10 justify-center items-center flex"
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </Link>
    </nav>
  );
}
