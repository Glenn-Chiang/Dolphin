import PostPreview from "@/components/PostPreview";
import prisma from "@/db";

const getUserPosts = async (userId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      id: userId,
    },
  });
  return posts;
};

export default async function ProfilePosts({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const posts = await getUserPosts(userId);

  if (posts.length === 0) {
    return <section>This user hasn&apos;t made any posts</section>;
  }

  return (
    <section>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
}
