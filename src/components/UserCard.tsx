import { UserDetail } from "@/lib/types";
import Link from "next/link";
import Avatar from "./Avatar";

export default function UserCard({ user }: { user: UserDetail }) {
  return (
    <article className="bg-white rounded-md shadow p-4 hover:shadow-md">
      <Link href={`/profile/${user.id}`} className="flex flex-col gap-2">
        <h2 className="flex gap-2 items-center">
          <Avatar user={user}/>
          {user.name}
        </h2>
        <div className="flex gap-4">
          <div className="">
            {user.followers.length}{" "}
            <span className="text-slate-500">followers</span>
          </div>
          <div className="">
            {user._count.following}{" "}
            <span className="text-slate-500">following</span>
          </div>
        </div>
        <p>{user.about}</p>
      </Link>
    </article>
  );
}
