import { AppIcon } from "@/modules/applications/AppIcon";
import type { DockItem } from "./demo-store";
import styles from "./demo.module.css";

export function Dock({ items }: { items: DockItem[] }) {
  return (
    <div className={styles.dock} aria-hidden>
      {items.map(({ app, launches }) => (
        <span key={app.id} className={styles.dockItem} title={app.name}>
          <span key={launches} className={launches > 0 ? styles.bounce : undefined}>
            <AppIcon app={app} size={40} />
          </span>
          <span className={styles.runningIndicator} />
        </span>
      ))}
    </div>
  );
}
