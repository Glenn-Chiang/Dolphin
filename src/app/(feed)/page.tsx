import { getPosts } from "@/db/posts";
import PostCard from "../../components/PostCard";

export default async function HomeFeed() {
  const posts = await getPosts();

  return (
    <ul className="py-4 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
