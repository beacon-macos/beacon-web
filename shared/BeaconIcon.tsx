import Image, { type ImageProps } from "next/image";

type BeaconIconProps = { size: number } & Omit<ImageProps, "src" | "alt" | "width" | "height">;

export function BeaconIcon({ size, ...props }: BeaconIconProps) {
  return <Image src="/beacon.png" alt="" width={size} height={size} {...props} />;
}
