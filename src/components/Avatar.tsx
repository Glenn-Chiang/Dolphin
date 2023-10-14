import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import Image from "next/image";

export default function Avatar({ user }: { user: User | null }) {
  if (user && user.avatarSource) {
    return (
      <Image
        src={user.avatarSource}
        alt="https://cdn-icons-png.flaticon.com/512/3050/3050651.png"
        width={40}
        height={40}
        className="rounded-full"
      />
    );
  } else {
    return <FontAwesomeIcon icon={faUserCircle} className="text-2xl"/>;
  }
}
