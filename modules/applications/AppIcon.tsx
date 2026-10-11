import { BeaconIcon } from "@/shared/BeaconIcon";
import type { Application } from "./applications";
import { GLYPHS } from "./glyphs";
import styles from "./applications.module.css";

export function AppIcon({ app, size }: { app: Application; size: number }) {
  if (app.icon.kind === "beacon") return <BeaconIcon size={size} className={styles.beacon} />;

  const { glyph, top, bottom, color } = app.icon;
  return (
    <span
      className={styles.glyph}
      style={{ width: size, height: size, color, backgroundImage: `linear-gradient(${top}, ${bottom})` }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {GLYPHS[glyph]}
      </svg>
    </span>
  );
}
