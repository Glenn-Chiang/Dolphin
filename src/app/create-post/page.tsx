import { SubmitButton } from "@/components/buttons";
import { createPost } from "@/db/posts";
import { getPods } from "@/db/pods";

export default async function CreatePost() {
  const pods = await getPods();

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Post</h1>
      <form action={createPost} className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="pod">Select a Pod</label>
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
          <label className="font-medium" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="content">Content</label>
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
