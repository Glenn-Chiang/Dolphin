import PostCard from "@/components/PostCard";
import { getPodPosts } from "@/db/posts";

export default async function PodPosts({ params }: { params: { id: string } }) {
  const podId = Number(params.id);
  const posts = await getPodPosts(podId);

  if (!posts.length) {
    return (
      <section className="text-slate-500 bg-white shadow rounded-md p-4">
        This Pod doesn&apos;t have any posts
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
