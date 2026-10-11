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
          A Visual Studio Code extension script registers an Open Recent Project command with searchable project
          results in Beacon.
        </figcaption>

        <div className={styles.manifest} aria-hidden="true">
          <div className={styles.fileBar}>
            <span>main.js</span>
            <span className={styles.fileType}>JS</span>
          </div>
          <pre className={styles.code}>
            <span className={styles.codePunctuation}>beacon.</span>
            <span className={styles.codeKey}>registerCommand</span>
            <span className={styles.codePunctuation}>(</span>
            {"\n  "}
            <span>&quot;open-recent-project&quot;</span>
            <span className={styles.codePunctuation}>,</span>
            {"\n  () => recentProjects\n"}
            <span className={styles.codePunctuation}>);</span>
          </pre>
        </div>

        <div className={styles.connector} aria-hidden="true">
          <span className={styles.packet} />
        </div>

        <div className={styles.commandPreview} aria-hidden="true">
          <div className={styles.commandBar}>
            <span className={styles.extensionGlyph}>{"{}"}</span>
            <span className={styles.commandName}>
              <strong>Open Recent Project</strong>
              <span>Visual Studio Code</span>
            </span>
            <kbd>↩</kbd>
          </div>

          <div className={styles.resultPanel}>
            <div className={styles.searchLine}>
              <span className={styles.searchQuery}>bea</span>
              <span className={styles.caret} />
              <span className={styles.resultCount}>2 results</span>
            </div>
            <div className={styles.resultList}>
              <div className={styles.selectedResult}>
                <span className={styles.folderMark} />
                <span className={styles.resultText}>
                  <strong>Beacon</strong>
                  <span>~/Developer/Beacon</span>
                </span>
                <span className={styles.openLabel}>Open</span>
              </div>
              <div className={styles.result}>
                <span className={styles.folderMark} />
                <span className={styles.resultText}>
                  <strong>Beacon website</strong>
                  <span>~/Developer/Beacon/website</span>
                </span>
              </div>
            </div>
          </div>
        </div>
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
