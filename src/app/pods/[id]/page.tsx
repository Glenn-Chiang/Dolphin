import PostCard from "@/components/PostCard";
import SortMenu from "@/components/SortMenu";
import { getHotPodPosts, getNewPodPosts, getTopPodPosts } from "@/db/posts";
import { PostDetail } from "@/types";

const getPodPosts = async (
  podId: number,
  sortOrder: string | string[] | undefined
): Promise<PostDetail[]> => {
  let posts;

  switch (sortOrder) {
    case "hot":
      posts = await getHotPodPosts(podId);
      break;
    case "new":
      posts = await getNewPodPosts(podId);
      break;
    case "top":
      posts = await getTopPodPosts(podId);
      break;
    default:
      posts = await getHotPodPosts(podId);
  }

  return posts;
};

export default async function PodPosts({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const podId = Number(params.id);
  const sortOrder = searchParams.sort;
  const posts = await getPodPosts(podId, sortOrder);

  if (posts.length === 0) {
    return <section>This pod doesn&apos;t have any posts</section>;
  }

  return (
    <section className="flex flex-col gap-4">
      <SortMenu context="pods" id={podId} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
