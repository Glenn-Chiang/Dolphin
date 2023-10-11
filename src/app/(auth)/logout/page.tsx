"use client";

import DolphinIcon from "@/components/DolphinIcon";
import { SubmitButton } from "@/components/buttons";
import { signOut, signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({callbackUrl: '/login'});
    console.log("Logged out");
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto w-full h-full flex justify-center items-center flex-col gap-4">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <p>Are you sure you want to logout?</p>
      <SubmitButton text="Logout" onClick={handleLogout} />
    </main>
  );
}
