import { getHomeFeed } from "@/db/posts";
import PostCard from "../../../components/PostCard";
import Link from "next/link";

export default async function HomeFeed() {
  const posts = await getHomeFeed();

  if (!posts.length) {
    return (
      <section className="bg-white shadow rounded-md p-4 text-slate-500 text-center">
        Join pods to populate your home feed!{" "}
        <Link href={"/pods"} className="text-sky-500 hover:text-sky-400">
          Explore pods
        </Link>
      </section>
    );
  }

  return (
    <ul className="py-4 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
