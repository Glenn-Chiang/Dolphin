import Image from "next/image";
import DolphinIcon from "./DolphinIcon";

export default function PodIcon({ src }: { src: string}) {
  return (
    <Image
      src={src || "https://cdn-icons-png.flaticon.com/512/3050/3050651.png"}
      alt="https://cdn-icons-png.flaticon.com/512/3050/3050651.png"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}
