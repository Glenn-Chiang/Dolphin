import { getPods } from "@/actions/pods";
import CreatePostForm from "./CreatePostForm";

export default async function CreatePost() {
  const pods = await getPods();

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Post</h1>
      <CreatePostForm pods={pods} />
    </main>
  );
}
