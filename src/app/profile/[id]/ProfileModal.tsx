"use client";

import Modal from "../../../components/Modal";
import { SubmitButton } from "../../../components/buttons";
import { updateProfile } from "@/db/users";
import { useRef } from "react";

type ProfileModalProps = {
  close: () => void;
  about: string;
};

type EditProfileFormValues = {
  about: string;
};

export default function ProfileModal({ close, about }: ProfileModalProps) {
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const about = aboutRef.current?.value;
    if (typeof about !== 'string') return;
    await updateProfile(about);
    close();
  };

  return (
    <Modal close={close}>
      <h1>Edit profile</h1>
      <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <textarea
            ref={aboutRef}
            defaultValue={about}
            id="about"
            name="about"
            className="p-2 shadow bg-slate-100"
          />
        </div>
        <div>
          <SubmitButton text="Save" />
        </div>
      </form>
    </Modal>
  );
}
