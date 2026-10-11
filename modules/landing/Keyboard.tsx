import { KEY_BINDINGS } from "@/modules/launcher/key-bindings";
import { DEFAULT_SHORTCUT, keyCapComponents } from "@/modules/shortcut/shortcut";
import { KeyCaps } from "@/shared/KeyCaps";
import styles from "./landing.module.css";

const SHORTCUTS: [action: string, keys: string[]][] = [
  ["Show or hide Beacon", keyCapComponents(DEFAULT_SHORTCUT)],
  ...KEY_BINDINGS
];

export function Keyboard() {
  return (
    <section id="keyboard" className={`${styles.section} ${styles.split}`}>
      <div>
        <h2 className={styles.sectionTitle}>Made for the keyboard</h2>
        <p className={styles.sectionText}>
          Your hands never need to leave the keys. Press <KeyCaps keys={["↓"]} /> past the last result to reach Settings,
          where you can record a new shortcut or switch between light and dark.
        </p>
      </div>
      <dl className={styles.shortcuts}>
        {SHORTCUTS.map(([action, keys]) => (
          <div key={action} className={styles.shortcut}>
            <dt>{action}</dt>
            <dd>
              <KeyCaps keys={keys} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
