import { DEFAULT_SHORTCUT, keyCapComponents } from "@/modules/shortcut/shortcut";
import { KeyCaps } from "@/shared/KeyCaps";
import { LATEST_RELEASE, REPOSITORY } from "./links";
import styles from "./landing.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Open any app in a keystroke.</h1>
      <p className={styles.lede}>
        Beacon is a fast, native application launcher for macOS. Press <KeyCaps keys={keyCapComponents(DEFAULT_SHORTCUT)} />{" "}
        from anywhere, type a few letters, and press <KeyCaps keys={["↩"]} />.
      </p>
      <div className={styles.actions}>
        <a className={styles.primaryAction} href={LATEST_RELEASE}>
          Download for Mac
        </a>
        <a className={styles.secondaryAction} href={REPOSITORY}>
          View on GitHub
        </a>
      </div>
      <p className={styles.requirements}>Free · macOS 26 or later · Apple silicon and Intel</p>
    </section>
  );
}
