import { SubmitButton } from "@/components/buttons";
import { getPost } from "@/db/posts";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <Backbar />
      <main className="bg-white p-4 rounded-xl shadow mt-2">
        <h1 className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faEdit} />
          Edit your post
        </h1>
        <EditPostForm post={post}/>
      </main>
    </>
  );
}
