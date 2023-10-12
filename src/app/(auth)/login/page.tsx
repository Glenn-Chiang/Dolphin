"use client";

import DolphinIcon from "@/components/DolphinIcon";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" }); // Redirect to homepage on successful sign in
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow m-auto w-full h-full flex justify-center items-center flex-col gap-4">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <h1>Welcome to Dolphin!</h1>
      <button
        onClick={handleLogin}
        className="flex gap-2 items-center shadow p-2 rounded-md bg-slate-200 hover:bg-slate-300"
        disabled={isLoading}
      >
        <Image
          src={"https://www.google.com/favicon.ico"}
          alt=""
          width={20}
          height={20}
        />
        Sign in with Google
      </button>
      <p className="w-4/5 sm:w-1/2 text-center text-slate-500">If you&apos;re signing in for the first time, your account will be created for you</p>
    </main>
  );
}
