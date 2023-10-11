import Image from "next/image";
import dolphinIcon from "../../public/images/dolphin.png";

export default function DolphinIcon({large}: {large?: boolean}) {
  const width = large ? 140 : 40

  return (

    <Image
      alt=""
      src={dolphinIcon}
      width={width}
      height={width}
      className="filter invert bg-orange-500 p-2 rounded-full"
    />
  );
}
