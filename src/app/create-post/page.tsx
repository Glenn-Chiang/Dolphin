import { getPods } from "@/db/pods";
import { createPost } from "@/db/posts";
import { SubmitButton } from "@/components/buttons";

export default async function CreatePost({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const pods = await getPods();
  const podId = Number(searchParams.pod)

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Post</h1>
      <form action={createPost} className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="pod">
            Select a Pod
          </label>
          <select
            id="pod"
            name="podId"
            className="shadow rounded-md p-2 bg-slate-50"
            defaultValue={podId}
          >
            {pods.map((pod) => (
              <option key={pod.id} value={pod.id}>
                {pod.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
          />
        </div>
        <div className="flex gap-4">
          <SubmitButton text="Post" />
        </div>
      </form>
    </main>
  );
}
