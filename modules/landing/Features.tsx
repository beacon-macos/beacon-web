import type { ReactNode } from "react";
import { DEFAULT_SHORTCUT, keyCapComponents } from "@/modules/shortcut/shortcut";
import { KeyCaps } from "@/shared/KeyCaps";
import { SymbolIcon, type SymbolName } from "@/shared/SymbolIcon";
import styles from "./landing.module.css";

const FEATURES: { title: string; icon: SymbolName | "⌥"; body: ReactNode }[] = [
  {
    title: "Opens from anywhere",
    icon: "⌥",
    body: (
      <>
        A global shortcut brings Beacon up over any app: <KeyCaps keys={keyCapComponents(DEFAULT_SHORTCUT)} /> by
        default. Record your own combination, or double-tap a modifier such as <KeyCaps keys={["⌘", "⌘"]} />.
      </>
    )
  },
  {
    title: "Forgiving search",
    icon: "magnifyingglass",
    body: (
      <>
        Matching ignores case and accents and tolerates skipped letters, so <q>xcd</q> finds Xcode and <q>términal</q>{" "}
        finds Terminal. Exact and prefix matches rank first.
      </>
    )
  },
  {
    title: "Favorites up front",
    icon: "star",
    body: (
      <>
        Before you type, Beacon lists your favorites. Press <KeyCaps keys={["⌘", "K"]} /> to add or remove the selected
        result, and hold <KeyCaps keys={["⌥"]} /> while pressing <KeyCaps keys={["↑"]} /> or <KeyCaps keys={["↓"]} /> to
        reorder them.
      </>
    )
  },
  {
    title: "Web search fallback",
    icon: "globe",
    body: "Every search ends with a web search result. Choose it to open Google in your default browser. Your query stays on your Mac until you do."
  },
  {
    title: "Finds every app",
    icon: "grid",
    body: "Beacon indexes /Applications, /System/Applications, and ~/Applications on your Mac, and checks once a day for apps you have installed since."
  },
  {
    title: "Native and out of the way",
    icon: "sparkleMagnifyingglass",
    body: "Built with SwiftUI and AppKit and no third-party dependencies. It lives in the menu bar, stays out of the Dock, and follows the system appearance or the one you pick."
  }
];

export function Features() {
  return (
    <section id="features" className={styles.section}>
      <h2 className={styles.sectionTitle}>Small, quick, and out of the way</h2>
      <ul className={styles.features}>
        {FEATURES.map((feature) => (
          <li key={feature.title} className={styles.feature}>
            <span className={styles.featureIcon} aria-hidden>
              {feature.icon === "⌥" ? "⌥" : <SymbolIcon name={feature.icon} />}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
