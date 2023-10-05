import Link from 'next/link';
import { User } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function UserCard({ user }: { user: User }) {
  return (
    <article className="bg-white rounded-md shadow p-4 hover:shadow-md">
      <Link href={`/profile/${user.id}`} className='flex flex-col gap-2'>
        <h2 className='flex gap-2 items-center'>
          <FontAwesomeIcon icon={faUserCircle} className='text-sky-500'/>
          {user.name}
        </h2>
        <p className="flex gap-2 text-slate-500">
          <span>Joined on</span>
          <span>{user.createdAt.toLocaleDateString()}</span>
        </p>
        <p>{user.about}</p>
      </Link>
    </article>
  );
}
