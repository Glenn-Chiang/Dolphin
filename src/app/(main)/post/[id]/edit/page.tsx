import { getPost } from "@/actions/posts";
import Backbar from "../Backbar";
import EditPostForm from "./EditForm";

export default async function EditPost({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await getPost(postId);

  if (!post) {
    return <section>Post not found</section>;
  }

  return (
    <>
      <div className="flex gap-2 pb-4 items-center">
        <Backbar />
        <h2>
          Edit your post
        </h2>
      </div>
      <EditPostForm post={post} />
    </>
  );
}
