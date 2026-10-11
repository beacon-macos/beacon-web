import { BeaconIcon } from "@/shared/BeaconIcon";
import { REPOSITORY } from "./links";
import styles from "./landing.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.brand}>
        <BeaconIcon size={28} loading="eager" />
        Beacon
      </a>
      <nav className={styles.nav} aria-label="Main">
        <a href="#features">Features</a>
        <a href="#keyboard">Keyboard</a>
        <a href="#install">Install</a>
        <a href={REPOSITORY}>GitHub</a>
      </nav>
    </header>
  );
}
