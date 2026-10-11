import { LauncherDemo } from "@/modules/demo/LauncherDemo";
import { DEFAULT_SHORTCUT, keyCapComponents } from "@/modules/shortcut/shortcut";
import { KeyCaps } from "@/shared/KeyCaps";
import styles from "./landing.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Open any app in a keystroke.</h1>
        <p className={styles.lede}>
          Beacon is a fast, native application launcher for macOS. Press <KeyCaps keys={keyCapComponents(DEFAULT_SHORTCUT)} />{" "}
          from anywhere, type a few letters, and press <KeyCaps keys={["↩"]} />.
        </p>
        <p id="demo-title" className={styles.demoTitle}>
          Try it here. This is Beacon’s own search, ranking, and favorites logic, running in your browser.
        </p>
      </div>
      <section aria-labelledby="demo-title">
        <LauncherDemo />
      </section>
    </section>
  );
}
