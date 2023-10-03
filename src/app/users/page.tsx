import prisma from "@/db";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export default async function Users() {
  const users = await getUsers();
  return (
    <main>
      <h1 className="flex gap-2 items-center text-sky-600">
        <FontAwesomeIcon icon={faUsers} />
        Users
      </h1>
      <ul className="py-4 flex flex-col gap-4">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
}

function UserItem({ user }: {user: User}) {
  return (
    <article className="bg-white rounded-md shadow p-4">
      <h2>{user.name}</h2>
      <p className="flex gap-2 text-slate-500">
        <span>Joined on</span>
        <span>{user.createdAt.toLocaleDateString()}</span>
      </p>
      <p>{user.about}</p>
    </article>
  );
}
