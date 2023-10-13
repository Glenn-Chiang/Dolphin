"use client";

import { SubmitButton } from "@/components/buttons";
import { createPod } from "@/actions/pods";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/components/FormError";

type FormValues = {
  name: string;
  about: string;
};

export default function CreatePod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    createPod(formValues)
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Pod!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name", {
              required: "Pod name cannot be empty",
              maxLength: {
                value: 25,
                message: "Pod name cannot be longer than 25 characters",
              },
            })}
          />
        </div>
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <input
            id="about"
            {...register("about", {
              maxLength: {
                value: 500,
                message: "About cannot be longer than 500 characters",
              },
            })}
          />
        </div>
        {errors.about && <FormError>{errors.about.message}</FormError>}
        <div className="flex gap-2">
          <SubmitButton>Create</SubmitButton>
        </div>
      </form>
    </main>
  );
}
