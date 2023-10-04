import { SubmitButton } from "@/components/buttons";
import { createPod } from "@/db/pods";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreatePod() {
  
  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Pod!</h1>
      <form action={createPod} className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <input
            id="about"
            name="about"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex gap-2">
          <SubmitButton text="Create" />
        </div>
      </form>
      <Link href={"/pods"} className="flex gap-2 items-center text-slate-500">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </Link>
    </main>
  );
}
