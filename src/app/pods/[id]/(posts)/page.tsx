import PostCard from "@/components/PostCard";
import { getNewPodPosts } from "@/db/posts";

export default async function PodPosts({ params }: { params: { id: string } }) {
  const podId = Number(params.id);
  const posts = await getNewPodPosts(podId);

  if (!posts.length) {
    return (
      <section className="text-slate-500 bg-white shadow rounded-md p-4">
        This Pod doesn&apos;t have any posts
      </section>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
