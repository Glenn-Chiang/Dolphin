"use client";

import { deletePod } from "@/actions/pods";
import Modal from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { Pod } from "@prisma/client";
import { useState } from "react";

type DeleteModalProps = {
  pod: Pod;
  close: () => void;
};

export default function DeleteModal({ pod, close }: DeleteModalProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    await deletePod(pod.id);
    close();
  };

  return (
    <Modal close={close}>
      <div className="flex flex-col gap-4 items-center">
        <h2>
          Are you sure you want to delete your pod{" "}
          <span className="text-sky-500">{pod.name}</span>?
        </h2>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending} onClick={handleDelete}>
            Confirm
          </SubmitButton>
          <CancelButton onClick={close}/>
        </div>
      </div>
    </Modal>
  );
}
