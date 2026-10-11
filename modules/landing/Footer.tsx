import { BeaconIcon } from "@/shared/BeaconIcon";
import { CONTRIBUTING, ISSUES, RELEASES, REPOSITORY } from "./links";
import styles from "./landing.module.css";

const LINKS = [
  ["Source", REPOSITORY],
  ["Releases", RELEASES],
  ["Issues", ISSUES],
  ["Contributing", CONTRIBUTING]
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <span className={styles.footerBrand}>
          <BeaconIcon size={20} />
          Beacon
        </span>
        {LINKS.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </div>
      <p className={styles.footerNote}>
        The demo uses the names of apps that come with macOS; their icons here are simple drawings, not the apps’
        artwork. Mac and macOS are trademarks of Apple Inc., registered in the U.S. and other countries.
      </p>
    </footer>
  );
}
