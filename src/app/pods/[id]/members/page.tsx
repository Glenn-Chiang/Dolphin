import UserCard from "@/components/UserCard";
import prisma from "@/db/db";

const getPodMembers = async (podId: number) => {
  const members = await prisma.user.findMany({
    where: {
      pods: {
        some: {
          podId,
        },
      },
    },
  });
  return members;
};

export default async function PodMembers({ podId }: { podId: number }) {
  const users = await getPodMembers(podId);

  if (!users.length) {
    return (
      <section className="bg-white rounded-md p-4 shadow text-slate-500">
        This Pod doesn&apos;t have any members
      </section>
    );
  }
  return (
    <section>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
