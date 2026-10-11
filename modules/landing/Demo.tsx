import { LauncherDemo } from "@/modules/demo/LauncherDemo";
import styles from "./landing.module.css";

export function Demo() {
  return (
    <section className={styles.demo} aria-labelledby="demo-title">
      <h2 id="demo-title" className={styles.demoTitle}>
        Try it here. This is Beacon’s own search, ranking, and favorites logic, running in your browser.
      </h2>
      <LauncherDemo />
    </section>
  );
}
