import { SubmitButton } from "@/components/buttons";
import { getPost } from "@/db/posts";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function EditPost({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await getPost(postId);

  if (!post) {
    return <section>Post not found</section>;
  }

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1 className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faEdit} />
        Edit your post
      </h1>
      <form className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <span>{post.title}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="content">Content</label>
          <textarea id="content" defaultValue={post.content} className="shadow rounded-md bg-slate-100 p-2"/>
        </div>
        <div>
          <SubmitButton text="Save"/>
        </div>
      </form>
    </main>
  );
}
