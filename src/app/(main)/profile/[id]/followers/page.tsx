import UserCard from "@/components/UserCard";
import { getFollowers } from "@/actions/users";

export default async function Followers({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const followers = await getFollowers(userId);

  if (!followers.length) {
    return (
      <section className="bg-white rounded-md text-slate-500 p-4 shadow">
        This user doesn&apos;t have any followers
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {followers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
