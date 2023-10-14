import Image from "next/image";
import DolphinIcon from "./DolphinIcon";

export default function PodIcon({ src }: { src?: string | null }) {
  if (!src) {
    // Dolphin icon is used as placeholder if pod does not have icon
    return <DolphinIcon />;
  }

  return (
    <Image
      src={src}
      alt="https://cdn-icons-png.flaticon.com/512/3050/3050651.png"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}
