import type { ComponentProps } from "react";
import type { Theme } from "./theme";
import styles from "./BeaconWindow.module.css";

type BeaconWindowProps = ComponentProps<"section"> & {
  theme: Theme;
  className: string;
  staticPosition?: boolean;
};

export function BeaconWindow({ theme, className, staticPosition = false, ...props }: BeaconWindowProps) {
  return (
    <section
      {...props}
      className={`${styles.window} ${className}`}
      data-theme={theme}
      data-static={staticPosition || undefined}
    />
  );
}
