import PostCard from "@/components/PostCard";
import SortMenu from "@/components/SortMenu";
import { getHotUserPosts, getNewUserPosts, getTopUserPosts } from "@/db/posts";
import { PostDetail } from "@/types";

const getUserPosts = async (
  userId: number,
  sortOrder: string | string[] | undefined
): Promise<PostDetail[]> => {
  let posts;

  switch (sortOrder) {
    case "hot":
      posts = await getHotUserPosts(userId);
      break;
    case "new":
      posts = await getNewUserPosts(userId);
      break;
    case "top":
      posts = await getTopUserPosts(userId);
      break;
    default:
      posts = await getHotUserPosts(userId);
  }

  return posts;
};

export default async function ProfilePosts({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = Number(params.id);
  const sortOrder = searchParams.sort;
  const posts = await getUserPosts(userId, sortOrder);

  if (posts.length === 0) {
    return (
      <section className="bg-white rounded-md p-4 shadow text-slate-500">
        This user hasn&apos;t made any posts
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <SortMenu context="profile" id={userId} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
