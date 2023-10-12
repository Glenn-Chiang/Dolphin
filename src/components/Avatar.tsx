import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import Image from "next/image";

export default function Avatar({ user }: { user: User | null }) {
  return (
    <div>
      {user && user.avatarSource ? (
        <Image src={user.avatarSource} alt="" width={40} height={40}/>
      ) : (
        <FontAwesomeIcon icon={faUserCircle} />
      )}  
    </div>
  );
}
