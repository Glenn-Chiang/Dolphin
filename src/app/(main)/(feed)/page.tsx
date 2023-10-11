import { getHomeFeed } from "@/db/posts";
import PostCard from '../../../components/PostCard';

export default async function HomeFeed() {
  const posts = await getHomeFeed();
  
  if (!posts.length) {
    return (
      <section className="bg-white shadow rounded-md p-4 text-slate-500 text-center">
        Join pods to populate your home feed!
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
