import { getPosts } from "@/db/posts";
import PostCard from "../components/PostCard";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h1>For You</h1>
          <h1>Popular</h1>
        </div>
      </div>
      <ul className="py-4 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}

