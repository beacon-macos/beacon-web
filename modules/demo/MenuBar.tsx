"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SymbolIcon } from "@/shared/SymbolIcon";
import styles from "./demo.module.css";

const MENU_ITEMS = ["File", "Edit", "View", "Go", "Window", "Help"];
const clockFormat = new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" });

type MenuActions = {
  onOpen: () => void;
  onSettings: () => void;
};

export function MenuBar({ onOpen, onSettings }: MenuActions) {
  return (
    <div className={styles.menuBar}>
      <span className={styles.menuAppName}>Finder</span>
      {MENU_ITEMS.map((item) => (
        <span key={item} className={styles.menuTitle}>
          {item}
        </span>
      ))}
      <span className={styles.menuSpacer} />
      <MenuExtra onOpen={onOpen} onSettings={onSettings} />
      <Clock />
    </div>
  );
}

function MenuExtra({ onOpen, onSettings }: MenuActions) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function close(event: Event) {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isOpen]);

  function choose(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={containerRef} className={styles.menuExtra}>
      <button
        type="button"
        className={styles.menuExtraButton}
        aria-label="Beacon"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-open={isOpen || undefined}
        onClick={() => setOpen(!isOpen)}
      >
        <SymbolIcon name="sparkleMagnifyingglass" />
      </button>
      {isOpen && (
        <div className={styles.menu} role="menu">
          <button type="button" role="menuitem" onClick={() => choose(onOpen)}>
            Open Beacon
          </button>
          <div className={styles.menuSeparator} role="separator" />
          <button type="button" role="menuitem" onClick={() => choose(onSettings)}>
            Settings…
          </button>
        </div>
      )}
    </div>
  );
}

function subscribeToClock(onChange: () => void) {
  const timer = setInterval(onChange, 1000);
  return () => clearInterval(timer);
}

function Clock() {
  const time = useSyncExternalStore(subscribeToClock, () => clockFormat.format(Date.now()), () => null);
  return <span className={styles.clock}>{time}</span>;
}
