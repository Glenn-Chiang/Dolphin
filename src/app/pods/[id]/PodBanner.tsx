"use client";

import { Pod } from "@prisma/client";
import {SubmitButton} from "@/components/buttons";
import DolphinIcon from "@/components/DolphinIcon";

export default function PodBanner({ pod }: {pod: Pod}) {
  return (
    <section className="bg-white p-4 rounded-md shadow flex flex-col gap-4">
      <div className="flex gap-4">
        <DolphinIcon/>
        <h1>{pod.name}</h1>
      </div>
      <p className="">{pod.about}</p>
      <p className="text-slate-500">Created on {pod.createdAt.toLocaleDateString()}</p>
      <div className="flex gap-4 items-center">
        <SubmitButton text="Join Pod"/>
        <span className="text-slate-500">{0} members</span>
      </div>
    </section>
  );
}
