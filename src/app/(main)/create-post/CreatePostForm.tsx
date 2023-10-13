"use client";

import { createPost } from "@/actions/posts";
import FormError from "@/components/FormError";
import { SubmitButton } from "@/components/buttons";
import { Pod } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  podId: string;
  title: string;
  content: string;
};

export default function CreatePostForm({ pods }: { pods: Pod[] }) {
  const podId = useSearchParams().get("pod");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    createPost(formValues)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-4 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="pod">
          Select a Pod
        </label>
        <select
          id="pod"
          {...register("podId")}
          className="shadow rounded-md p-2 bg-slate-50"
          defaultValue={podId || undefined}
        >
          {pods.map((pod) => (
            <option key={pod.id} value={pod.id}>
              {pod.name}
            </option>
          ))}
        </select>
      </div>
      {errors.podId && <FormError>{errors.podId.message}</FormError>}

      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          {...register("title", {
            required: "Title cannot be empty",
            maxLength: {
              value: 255,
              message: "Title cannot be longer than 255 characters",
            },
          })}
        />
      </div>
      {errors.title && <FormError>{errors.title.message}</FormError>}

      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Content cannot be empty" })}
        />
      </div>
      {errors.content && <FormError>{errors.content.message}</FormError>}
      
      <div className="flex gap-4">
        <SubmitButton>Post</SubmitButton>
      </div>
    </form>
  );
}
