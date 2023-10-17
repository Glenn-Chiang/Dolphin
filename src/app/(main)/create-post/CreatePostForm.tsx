"use client";

import { createPost } from "@/actions/posts";
import FormError from "@/components/FormError";
import { SubmitButton } from "@/components/buttons";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pod } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";

type FormValues = {
  podId: string;
  title: string;
  content: string;
  image: FileList;
};

export default function CreatePostForm({ pods }: { pods: Pod[] }) {
  const podId = useSearchParams().get("pod");

  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    setIsPending(true);
    const { podId, title, content, image } = formValues;

    const imageFile = image[0];
    // console.log("image:", imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("podId", podId);
    formData.append("title", title);
    formData.append("content", content);

    await createPost(formData);
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
        <label
          className="font-medium flex gap-2 items-center"
          htmlFor="content"
        >
          <FontAwesomeIcon icon={faPen} />
          Content
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Content cannot be empty" })}
        />
      </div>
      {errors.content && <FormError>{errors.content.message}</FormError>}

      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="font-medium flex gap-2 items-center">
          <FontAwesomeIcon icon={faCamera} />
          Image <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <input type="file" accept="image/*" id="image" {...register("image")} />
      </div>

      <div className="flex gap-4">
        <SubmitButton isPending={isPending}>Post</SubmitButton>
      </div>
    </form>
  );
}
