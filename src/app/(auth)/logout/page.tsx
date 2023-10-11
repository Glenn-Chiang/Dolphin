'use client'

import { SubmitButton } from "@/components/buttons";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    console.log("Logged out")
    router.push('/login') // Redirect to login after logging out
  }
  return (
    <SubmitButton text="Logout" onClick={handleLogout}/>
  )
}