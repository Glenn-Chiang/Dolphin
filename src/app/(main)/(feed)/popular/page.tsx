import PostCard from "@/components/PostCard";
import { getPosts } from "@/db/posts";

export default async function Popular() {
  const posts = await getPosts();

  return (
    <ul className="py-4 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
