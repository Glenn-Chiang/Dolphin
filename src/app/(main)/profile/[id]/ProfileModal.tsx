"use client";

import { updateProfile } from "@/actions/users";
import FormError from "@/components/FormError";
import Modal from "@/components/Modal";
import { SubmitButton } from "@/components/buttons";
import {
  faImage,
  faInfoCircle,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';

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

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (formValues) => {
    setIsPending(true)
    const { name, about, avatarSrc } = formValues;
    await updateProfile(name, about, avatarSrc);
    close();
  };

  return (
    <Modal close={close}>
      <h1 className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faUserEdit} />
        Edit profile
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 flex flex-col gap-4"
      >
        <label htmlFor="name" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faUser} />
          Name
        </label>
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
        <label htmlFor="about" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faInfoCircle} />
          About
        </label>
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
        {errors.about && <FormError>{errors.about.message}</FormError>}
        <label className="flex gap-2 items-center" htmlFor="avatar">
          <FontAwesomeIcon icon={faImage} />
          Avatar URL
        </label>
        <input
          id="avatar"
          {...register("avatarSrc")}
          defaultValue={user.avatarSource || ""}
        />
        <div>
          <SubmitButton isPending={isPending}>Save</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
