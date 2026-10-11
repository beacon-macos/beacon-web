import Image from "next/image";
import { BeaconIcon } from "@/shared/BeaconIcon";
import type { Application } from "./applications";
import styles from "./applications.module.css";

export function AppIcon({ app, size }: { app: Application; size: number }) {
  if (app.icon.kind === "beacon") return <BeaconIcon size={size} className={styles.icon} />;

  return <Image src={app.icon.image} alt="" width={size} height={size} className={styles.icon} unoptimized />;
}
