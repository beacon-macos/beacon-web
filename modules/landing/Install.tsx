import { LATEST_RELEASE, REPOSITORY } from "./links";
import styles from "./landing.module.css";

export function Install() {
  return (
    <section id="install" className={styles.section}>
      <h2 className={styles.sectionTitle}>Install Beacon</h2>
      <ol className={styles.steps}>
        <li>
          <h3>Download</h3>
          <p>
            Get the DMG from the <a href={LATEST_RELEASE}>latest release</a> on GitHub. A PKG installer and a ZIP are
            there too.
          </p>
        </li>
        <li>
          <h3>Move it to Applications</h3>
          <p>Open the DMG and drag Beacon into the Applications folder.</p>
        </li>
        <li>
          <h3>Open it once</h3>
          <p>
            Control-click Beacon in Applications, choose Open, and confirm. Beacon is ad-hoc signed, so macOS asks the
            first time.
          </p>
        </li>
      </ol>
      <p className={styles.sectionNote}>
        Beacon requires macOS 26 or later. To build it yourself, clone the <a href={REPOSITORY}>repository</a>, open it in
        Xcode 26, and run the Beacon scheme.
      </p>
    </section>
  );
}
