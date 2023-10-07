import PostCard from "@/components/PostCard";
import CommentSection from "./CommentSection";
import { getPost } from "@/db/posts";
import { getPostComments } from "@/db/comments";
import Backbar from "./Backbar";

export default async function Post({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await getPost(postId);
  const comments = await getPostComments(postId);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main className="flex flex-col gap-4 pb-4">
      <div className="flex gap-2 items-center">
        <Backbar />
        <h2>Post</h2>
      </div>
      <PostCard post={post} />
      <CommentSection comments={comments} />
    </main>
  );
}
