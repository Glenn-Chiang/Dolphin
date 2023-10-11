"use client";

import DolphinIcon from "@/components/DolphinIcon";
import { SubmitButton } from "@/components/buttons";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter()

  const handleLogin = async () => {
    await signIn("google");
    router.push('/') // Redirect to homepage after successful login
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto w-full h-full flex justify-center items-center flex-col gap-4">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <h1>Login</h1>
      <SubmitButton text="Sign in with Google" onClick={handleLogin} />
      <p>
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="text-sky-500 hover:text-sky-400">
          Register
        </Link>
      </p>
    </main>
  );
}
