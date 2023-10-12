import Image from "next/image";
import DolphinIcon from "./DolphinIcon";

export default function PodIcon({ src }: { src?: string | null }) {
  if (!src) {
    // Dolphin icon is used as placeholder if pod does not have icon
    return <DolphinIcon />;
  }

  return <Image src={src} alt="" width={40} height={40} className="rounded-full"/>;
}
