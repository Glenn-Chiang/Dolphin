import Link from "next/link";
import PostCard from "../components/PostCard";
import { getPosts } from "@/db/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h1>For You</h1>
          <h1>Popular</h1>
        </div>
        <CreatePostButton />
      </div>
      <ul className="py-4 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}

function CreatePostButton() {
  return (
    <Link
      href={"/create-post"}
      className="bg-white p-2 rounded-md shadow text-sky-500 font-medium hover:bg-sky-500 hover:text-white"
    >
      Create a post
    </Link>
  );
}
