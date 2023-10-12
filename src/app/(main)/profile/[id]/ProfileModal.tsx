"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { SubmitButton } from "@/components/buttons";
import { updateProfile } from "@/db/users";
import FormError from "@/components/FormError";
import { User } from "@prisma/client";

type ProfileModalProps = {
  close: () => void;
  user: User;
};

type EditProfileFormValues = {
  name: string;
  about: string;
  avatarSrc: string;
};

export default function ProfileModal({ close, user }: ProfileModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProfileFormValues>();

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (formValues) => {
    const { name, about, avatarSrc } = formValues;
    await updateProfile(name, about, avatarSrc);
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            defaultValue={user.name}
            {...register("name", {
              required: "Your name can't be empty",
              maxLength: {
                value: 25,
                message: "Your name can't be longer than 25 characters",
              },
            })}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
          <label htmlFor="about">About</label>
          <textarea
            {...register("about", {
              maxLength: {
                value: 500,
                message: "Your About can't be longer than 500 characters",
              },
            })}
            defaultValue={user.about}
            id="about"
            className="p-2 shadow bg-slate-100"
          />
        </div>
        {errors.about && <FormError>{errors.about.message}</FormError>}
        <label htmlFor="avatar">Avatar image link</label>
        <input
          id="avatar"
          {...register("avatarSrc")}
          defaultValue={user.avatarSource || ""}
        />
        <div>
          <SubmitButton>Save</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
