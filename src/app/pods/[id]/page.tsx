import PostPreview from "@/components/PostPreview";
import prisma from "@/db";

const getPodPosts = async (podId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      podId,
    },
  });
  return posts;
};

export default async function PodPosts({ params }: { params: { id: string } }) {
  const podId = Number(params.id);
  const posts = await getPodPosts(podId);

  if (posts.length === 0) {
    return <section>This pod doesn&apos;t have any posts</section>;
  }

  return (
    <section>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
}
