"use client";

import DolphinIcon from "@/components/DolphinIcon";
import { SubmitButton } from "@/components/buttons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/" }); // Redirect to homepage on successful sign in
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto w-full h-full flex justify-center items-center flex-col gap-4">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <h1>Login to Dolphin</h1>
      <SubmitButton onClick={handleLogin}>
        <Image src={"https://www.google.com/favicon.ico"} alt="" width={20} height={20}/>
        Sign in with Google
      </SubmitButton>
      <p>
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="text-sky-500 hover:text-sky-400">
          Register
        </Link>
      </p>
    </main>
  );
}
