import PostCard from "@/components/PostCard";
import CommentSection from "./CommentSection";
import { Comment } from "@prisma/client";
import { getPost } from "@/db/posts";

export default async function Post({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await getPost(postId);

  const comments: Comment[] = [];

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main className="flex flex-col gap-4 pb-4">
      <PostCard post={post} />
      <CommentSection comments={comments} />
    </main>
  );
}
