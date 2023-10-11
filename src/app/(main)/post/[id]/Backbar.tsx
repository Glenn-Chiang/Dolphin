"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Backbar() {
  const router = useRouter();
  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="flex gap-2 items-center hover:bg-slate-200 p-4 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}
