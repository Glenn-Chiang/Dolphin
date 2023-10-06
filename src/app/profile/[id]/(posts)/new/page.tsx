import PostCard from "@/components/PostCard";
import { getNewUserPosts } from "@/db/posts";

export default async function NewProfilePosts({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const posts = await getNewUserPosts(userId);

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
