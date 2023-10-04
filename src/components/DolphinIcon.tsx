import Image from "next/image";
import dolphinIcon from "../../public/images/dolphin.png";

export default function DolphinIcon() {
  return (
    <Image
      alt=""
      src={dolphinIcon}
      width={40}
      height={40}
      className="filter invert"
    />
  );
}
