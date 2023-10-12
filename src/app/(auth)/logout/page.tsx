"use client";

import DolphinIcon from "@/components/DolphinIcon";
import { SubmitButton } from "@/components/buttons";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    console.log("Logged out");
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto w-full h-full flex justify-center items-center flex-col gap-4">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <p>Are you sure you want to logout?</p>
      <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
      <Link href={"/"} className="text-sky-500 hover:text-sky-400">
        Return to Home
      </Link>
    </main>
  );
}
