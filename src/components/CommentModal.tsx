import React from "react";
import { CancelButton, SubmitButton } from "./buttons";
import Modal from "./Modal";

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
