import { keyCapComponents, type Shortcut } from "@/modules/shortcut/shortcut";
import { BeaconIcon } from "@/shared/BeaconIcon";
import { KeyCaps } from "@/shared/KeyCaps";
import styles from "./demo.module.css";

export function OpenHint({ shortcut, onOpen }: { shortcut: Shortcut; onOpen: () => void }) {
  const isDoubleTap = shortcut.kind === "double";
  const keys = keyCapComponents(shortcut);

  return (
    <button type="button" className={styles.openHint} onClick={onOpen}>
      <BeaconIcon size={44} />
      <span className={styles.openHintTitle}>
        {isDoubleTap ? "Double-tap" : "Press"}{" "}
        <KeyCaps keys={isDoubleTap ? keys.slice(0, 1) : keys} variant="desktop" /> to open Beacon
      </span>
      <span className={styles.openHintDetail}>or click here</span>
    </button>
  );
}
