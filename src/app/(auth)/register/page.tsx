"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import FormError from "@/components/FormError";
import DolphinIcon from "@/components/DolphinIcon";
import Link from "next/link";

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

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formValues) => {
    const { name, email } = formValues;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    const user = await res.json();
    console.log(user);
    router.push("/login"); // Redirect to login after successful registration
  };

  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto w-full h-full flex justify-center items-center flex-col">
      <div className="p-4">
        <DolphinIcon large={true} />
      </div>
      <h1>Join us !</h1>
      <form
        className="py-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <label htmlFor="username" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUser} />
          </label>
          <input
            placeholder="Username"
            id="username"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Your name can only be up to 50 characters",
              },
            })}
            className="bg-transparent shadow-none border-b-2 focus:outline-none w-full"
          />
        </div>
        {errors.name && <FormError>{errors.name.message}</FormError>}
        <div className="flex gap-2">
          <label htmlFor="email" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <input
            placeholder="Email"
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="bg-transparent shadow-none border-b-2 focus:outline-none w-full"
          />
        </div>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <button className="bg-sky-500 hover:bg-sky-400 rounded-md shadow text-white p-2">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="text-sky-500 hover:text-sky-400">
          Login
        </Link>
      </p>
    </main>
  );
}
