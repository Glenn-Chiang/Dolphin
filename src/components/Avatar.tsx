import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import Image from "next/image";

export default function Avatar({ user }: { user: User | null }) {
  if (user && user.avatarSource) {
    return (
      <Image
        src={user.avatarSource}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
    );
  } else {
    return <FontAwesomeIcon icon={faUserCircle} />;
  }
}
