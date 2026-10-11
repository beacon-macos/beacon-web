import { LauncherResultRow } from "@/modules/launcher/LauncherResultRow";
import { OPEN_RECENT_PROJECT_ROW } from "@/modules/launcher/open-recent-project";
import { BeaconWindow } from "@/shared/BeaconWindow";
import { SymbolIcon } from "@/shared/SymbolIcon";
import { EXTENSIONS_CONTRIBUTING, EXTENSIONS_REPOSITORY } from "./links";
import styles from "./extensions.module.css";

export function Extensions() {
  return (
    <section id="extensions" className={styles.section} aria-labelledby="extensions-title">
      <div className={styles.copy}>
        <p className={styles.label}>Extensions</p>
        <h2 id="extensions-title" className={styles.title}>
          Turn a keystroke into a workflow.
        </h2>
        <p className={styles.lede}>
          Install reviewed extensions from Beacon Settings. Their commands sit beside your apps, ready to search, run,
          and favorite.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryAction} href={EXTENSIONS_REPOSITORY}>
            Browse extensions
            <SymbolIcon name="arrowUpRight" />
          </a>
          <a className={styles.secondaryAction} href={EXTENSIONS_CONTRIBUTING}>
            Build one
            <SymbolIcon name="arrowUpRight" />
          </a>
        </div>
      </div>

      <figure className={styles.flow}>
        <figcaption className={styles.srOnly}>
          The Visual Studio Code extension appears in Beacon as a favorite Open Recent Project command.
        </figcaption>
        <BeaconWindow theme="system" staticPosition className={styles.commandPreview} aria-hidden="true">
          <ul className={styles.previewList} role="listbox">
            <LauncherResultRow
              content={OPEN_RECENT_PROJECT_ROW}
              isSelected
              isFavorite
            />
          </ul>
        </BeaconWindow>
      </figure>

      <dl className={styles.facts}>
        <div>
          <dt>In Settings</dt>
          <dd>Install and update from the official catalog.</dd>
        </div>
        <div>
          <dt>In the launcher</dt>
          <dd>Search, run, and favorite commands like any result.</dd>
        </div>
        <div>
          <dt>Contained runtime</dt>
          <dd>Scripts can read files and read-only SQLite, but cannot use the network or run other programs.</dd>
        </div>
      </dl>
    </section>
  );
}
