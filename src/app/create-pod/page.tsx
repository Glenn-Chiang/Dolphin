import { CancelButton, SubmitButton } from "@/components/buttons";
import prisma from "@/db";

const createPod = async () => {
  // await prisma.pod.create({})
}

export default function CreatePod() {
  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Start a Pod!</h1>
      <form className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="podname">Name</label>
          <input id='podname' className="shadow bg-slate-50 rounded-md p-2"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input id="description" className="shadow bg-slate-50 rounded-md p-2"/>
        </div>
        <div className="flex gap-2">
          <SubmitButton />
          <CancelButton />
        </div>
      </form>
    </main>
  );
}