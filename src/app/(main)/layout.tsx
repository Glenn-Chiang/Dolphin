import { getUserPods } from "@/actions/pods";
import AuthProvider from "@/components/AuthProvider";
import { getCurrentUser } from "@/lib/auth";
import Navbars from "./Navbars";
import TopButton from "@/components/TopButton";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";
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
  const userId = await getCurrentUser();
  if (!userId) return <></>;
  const pods = await getUserPods(userId);

  return (
    <html lang="en" spellCheck="false">
      <body className="whitespace-pre-wrap">
        <AuthProvider>
          <Navbars pods={pods}/>
          <div className="absolute w-full sm:left-1/4 sm:w-3/4 mt-16 mb-10 p-4 ">
            {children}
          </div>
          <TopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
