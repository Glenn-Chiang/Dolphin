import UserCard from "@/components/UserCard";
import { getPodMembers } from "@/actions/users";

export default async function PodMembers({ params }: { params: { id: string } }) {
  const podId = Number(params.id)
  const users = await getPodMembers(podId);

  if (!users.length) {
    return (
      <section className="bg-white rounded-md p-4 shadow text-slate-500">
        This Pod doesn&apos;t have any members
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
