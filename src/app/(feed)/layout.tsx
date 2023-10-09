import FeedLinks from "@/components/FeedLinks";
import React from "react";

export default function Home({children}: {children: React.ReactNode}) {
  return (
    <main>
      <FeedLinks />
      {children}
    </main>
  );
}