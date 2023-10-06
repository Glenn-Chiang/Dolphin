import PostCard from "@/components/PostCard";
import { getUserPosts } from "@/db/posts";

export default async function ProfilePosts({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const posts = await getUserPosts(userId);

  if (posts.length === 0) {
    return <section>This user hasn&apos;t made any posts</section>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
