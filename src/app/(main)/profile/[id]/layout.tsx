import { getUser } from "@/actions/users";
import React from "react";
import Banner from "./Banner";
import ProfileLinks from "./ProfileLinks";

export default async function Profile({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const userId = Number(params.id);
  const user = await getUser(userId);

  if (!user) {
    return <section>User not found</section>;
  }
  return (
    <main className="flex flex-col gap-4">
      <Banner user={user} />
      <ProfileLinks user={user} />
      {children}
    </main>
  );
}
