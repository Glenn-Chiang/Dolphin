'use client'

import { SubmitButton } from "@/components/buttons";
import { signOut } from 'next-auth/react';

export default function Logout() {
  const handleLogout = async () => {
    await signOut()
    console.log("Logged out")
  }
  return (
    <SubmitButton text="Logout" onClick={handleLogout}/>
  )
}