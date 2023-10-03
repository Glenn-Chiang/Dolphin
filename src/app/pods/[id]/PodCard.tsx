"use client";

import { Pod } from "@prisma/client";
import {SubmitButton} from "@/components/buttons";

type PodCardProps = {
  pod: Pod;
};

export default function PodCard({ pod }: PodCardProps) {
  return (
    <section className="bg-white p-4 rounded-md shadow">
      <h1>{pod.name}</h1>
      <p className="py-4">{pod.about}</p>
      <div className="flex gap-4 items-center">
        <SubmitButton text="Join Pod"/>
        <span className="text-slate-500">{0} members</span>
      </div>
    </section>
  );
}
