import prisma from "@/db/db";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "@/components/UserCard";

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
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
}
