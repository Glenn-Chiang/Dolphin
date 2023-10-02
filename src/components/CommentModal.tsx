import React from "react";
import { CancelButton, SubmitButton } from "./buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type CommentModalProps = {
  close: () => void
}

export default function CommentModal({close}: CommentModalProps) {
  return (
    <Modal close={close}>
      <form className="flex flex-col gap-4">
        <h1>Share your thoughts</h1>
        <textarea className="bg-slate-100 shadow rounded-md" />
        <div className="flex gap-2">
          <SubmitButton text="Post"/>
          <CancelButton onClick={close}/>
        </div>
      </form>
    </Modal>
  );
}

function Modal({ children, close }: { children: React.ReactNode, close: () => void }) {
  return (
    <div className="w-screen h-screen fixed bg-slate-400/40 z-20 left-0 top-0 flex justify-center items-center">
      <section className="bg-white rounded-xl p-4 w-4/5 sm:w-1/2 relative">
        {children}
        <button onClick={close} className="absolute right-2 top-2 hover:bg-slate-200 rounded-full p-2 w-10 h-10 transition">
          <FontAwesomeIcon icon={faX} />
        </button>
      </section>
    </div>
  );
}
