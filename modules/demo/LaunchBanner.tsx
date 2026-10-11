import { AppIcon } from "@/modules/applications/AppIcon";
import { SymbolIcon } from "@/shared/SymbolIcon";
import type { Launch } from "./demo-store";
import styles from "./demo.module.css";

export function LaunchBanner({ launch, onDismiss }: { launch: Launch; onDismiss: () => void }) {
  return (
    <div className={styles.banner}>
      <AppIcon app={launch.app} size={36} />
      <span className={styles.bannerText}>
        <strong>{launch.title}</strong>
        <span>{launch.detail}</span>
        {launch.link && (
          <a href={launch.link} target="_blank" rel="noreferrer" onClick={onDismiss}>
            Open in a new tab <SymbolIcon name="arrowUpRight" />
          </a>
        )}
      </span>
    </div>
  );
}
