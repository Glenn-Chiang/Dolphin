"use client";

import { SubmitButton } from "@/components/buttons";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter()

  const handleLogin = () => {
    signIn("google");
    router.push('/') // Redirect to homepage after successful login
  };
  console.log(useSession())

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Login</h1>
      <SubmitButton text="Sign in with Google" onClick={handleLogin} />
    </main>
  );
}
