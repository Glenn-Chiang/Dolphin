import { getCurrentUser } from "@/auth";
import { SubmitButton } from "@/components/buttons";
import prisma from "@/db/db";
import { redirect } from "next/navigation";

const getPods = async () => {
  const pods = await prisma.pod.findMany();
  return pods;
};

const createPost = async (formData: FormData) => {
  "use server";

  const title = formData.get("title");
  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }
  const content = formData.get("content");
  if (typeof content !== "string") {
    throw new Error("Invalid content");
  }
  const podId = formData.get("podId");
  if (typeof podId !== "string") {
    throw new Error("Invalid podId");
  }

  const authorId = getCurrentUser();

  await prisma.post.create({
    data: {
      title,
      content,
      podId: Number(podId),
      authorId,
    },
  });

  console.log("Post created!");
  redirect(`/profile/${authorId}`);
};

export default async function CreatePost() {
  const pods = await getPods();

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Post</h1>
      <form action={createPost} className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="pod">Select a Pod</label>
          <select
            id="pod"
            name="podId"
            className="shadow rounded-md p-2 bg-slate-50"
          >
            {pods.map((pod) => (
              <option key={pod.id} value={pod.id}>
                {pod.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex gap-4">
          <SubmitButton text="Post" />
        </div>
      </form>
    </main>
  );
}
