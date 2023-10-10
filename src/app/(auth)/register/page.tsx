"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import FormError from "@/components/FormError";

type RegisterFormValues = {
  name: string;
  email: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const router = useRouter()

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formValues) => {
    const { name, email } = formValues;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({name, email }),
    });
    const user = await res.json();
    console.log(user);
    router.push('/login') // Redirect to login after successful registration
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto">
      <h1>Join us!</h1>
      <form
        className="py-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUser} />
            Username
          </label>
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
        {errors.name && <FormError>{errors.name.message}</FormError>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <div className="flex justify-center">
          <button className="bg-sky-500 hover:bg-sky-400 rounded-md shadow text-white p-2">
            Register
          </button>
        </div>
      </form>
    </main>
  );
}
