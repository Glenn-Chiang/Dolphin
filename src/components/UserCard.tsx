import Link from 'next/link';
import { User } from '@prisma/client';

export default function UserCard({ user }: { user: User }) {
  return (
    <article className="bg-white rounded-md shadow p-4">
      <Link href={`/profile/${user.id}`}>
        <h2>{user.name}</h2>
        <p className="flex gap-2 text-slate-500">
          <span>Joined on</span>
          <span>{user.createdAt.toLocaleDateString()}</span>
        </p>
        <p>{user.about}</p>
      </Link>
    </article>
  );
}
