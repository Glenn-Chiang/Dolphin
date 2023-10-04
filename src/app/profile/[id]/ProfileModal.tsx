"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../components/Modal";
import { SubmitButton } from "../../../components/buttons";
import { updateProfile } from "@/db/users";

type ProfileModalProps = {
  close: () => void;
  about: string;
};

type EditProfileFormValues = {
  about: string;
};

export default function ProfileModal({ close, about }: ProfileModalProps) {
  const { handleSubmit, register } = useForm<EditProfileFormValues>();

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (formValues) => {
    const { about } = formValues;
    await updateProfile(about);
    close();
  };

  return (
    <Modal close={close}>
      <h1>Edit profile</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <textarea
            {...register("about", {
              maxLength: {
                value: 500,
                message: "Your About cannot be more than 500 characters",
              },
            })}
            defaultValue={about}
            id="about"
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
