import UserCard from "@/components/UserCard";
import { getFollowedUsers } from "@/db/users";

export default async function Following({params}: {params: {id: string}}) {
  const userId = Number(params.id)
  const followedUsers = await getFollowedUsers(userId)

  if (!followedUsers.length) {
    return (
      <section className="bg-white rounded-md text-slate-500 p-4 shadow">
        This user isn&apos;t following anyone
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {followedUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}