import type { ComponentProps } from "react";
import type { Theme } from "./theme";
import styles from "./BeaconWindow.module.css";

type BeaconWindowProps = ComponentProps<"section"> & { theme: Theme; className: string };

export function BeaconWindow({ theme, className, ...props }: BeaconWindowProps) {
  return <section {...props} className={`${styles.window} ${className}`} data-theme={theme} />;
}
