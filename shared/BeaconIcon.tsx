import Image, { type ImageProps } from "next/image";

import beacon from "@/public/beacon.png";

type BeaconIconProps = { size: number } & Omit<ImageProps, "src" | "alt" | "width" | "height">;

export function BeaconIcon({ size, ...props }: BeaconIconProps) {
  return <Image src={beacon} alt="" width={size} height={size} {...props} />;
}
