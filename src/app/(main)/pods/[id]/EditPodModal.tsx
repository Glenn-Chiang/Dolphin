"use client";

import Modal from "@/components/Modal";
import { SubmitButton } from "@/components/buttons";
import {
  faImage,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pod } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

type EditModalProps = {
  close: () => void;
  pod: Pod;
};

type FormValues = {
  about: string;
  iconSource: string;
};

export default function EditModal({ pod, close }: EditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {};

  return (
    <Modal close={close}>
      <h1>Edit Pod</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 flex flex-col gap-4"
      >
        <label htmlFor="about" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faInfoCircle} />
          About
        </label>
        <input
          id="about"
          {...register("about", {
            maxLength: {
              value: 500,
              message: "About cannot be longer than 500 characters",
            },
          })}
          defaultValue={pod.about}
        />
        <label htmlFor="icon" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faImage} />
          Icon URL
        </label>
        <input
          id="icon"
          {...register("iconSource")}
          defaultValue={pod.iconSource || ""}
        />
        <div>
          <SubmitButton>Save</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
