"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type RegisterFormValues = {
  name: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formValues) => {
    const { name } = formValues;
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const user = await res.json()
    console.log(user);
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto">
      <h1>Register</h1>
      <form
        className="py-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Your name can only be up to 50 characters",
              },
            })}
            className="shadow bg-slate-100 rounded-md p-2"
          />
        </div>
        {errors && errors.name?.message}
        <div className="flex justify-center">
          <button className="bg-sky-500 hover:bg-sky-400 rounded-md shadow text-white p-2">
            Register
          </button>
        </div>
      </form>
    </main>
  );
}
