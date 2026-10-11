"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import type { DemoState, DemoStore } from "@/modules/demo/demo-store";
import { KEY_BINDINGS } from "@/modules/launcher/key-bindings";
import { isDefaultShortcut } from "@/modules/shortcut/shortcut";
import { ShortcutRecorder } from "@/modules/shortcut/ShortcutRecorder";
import { BeaconWindow } from "@/shared/BeaconWindow";
import { KeyCaps } from "@/shared/KeyCaps";
import { SymbolIcon } from "@/shared/SymbolIcon";
import { THEMES } from "@/shared/theme";
import styles from "./settings.module.css";

export function SettingsWindow({ store, state }: { store: DemoStore; state: DemoState }) {
  const windowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    windowRef.current?.focus({ preventScroll: true });
  }, []);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    store.closeSettings();
  }

  return (
    <BeaconWindow
      ref={windowRef}
      theme={state.theme}
      className={styles.window}
      aria-label="Beacon Settings"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.titleBar}>
        <span className={styles.trafficLights}>
          <button type="button" aria-label="Close settings" onClick={() => store.closeSettings()} />
          <span />
          <span />
        </span>
        <span className={styles.windowTitle}>Beacon Settings</span>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.badge}>
            <SymbolIcon name="sparkleMagnifyingglass" />
          </span>
          <span className={styles.heading}>
            <strong>Beacon</strong>
            <span>Launcher settings</span>
          </span>
          <span className={styles.versionPill}>Web demo</span>
        </header>

        <SettingsCard title="General">
          <SettingRow title="Appearance" detail="Choose how Beacon looks, or follow the system setting.">
            <div className={styles.segmented} role="radiogroup" aria-label="Theme">
              {THEMES.map((theme) => (
                <button
                  key={theme.value}
                  type="button"
                  role="radio"
                  aria-checked={state.theme === theme.value}
                  onClick={() => store.updateTheme(theme.value)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </SettingRow>
          <SettingRow
            title="Open shortcut"
            detail="Show or hide Beacon from anywhere on this page. Click the field, then press a key combination or double-tap a modifier."
          >
            <div className={styles.shortcutControls}>
              <ShortcutRecorder
                shortcut={state.shortcut}
                onRecordingChange={(isRecording) => store.setRecordingShortcut(isRecording)}
                onChange={(shortcut) => store.updateShortcut(shortcut)}
              />
              <button
                type="button"
                className={styles.resetButton}
                disabled={isDefaultShortcut(state.shortcut)}
                onClick={() => store.resetShortcut()}
              >
                <SymbolIcon name="arrowCounterclockwise" /> Reset to default
              </button>
            </div>
          </SettingRow>
          {state.shortcutError && (
            <p className={styles.shortcutError} role="alert">
              <SymbolIcon name="exclamationTriangle" /> {state.shortcutError}
            </p>
          )}
        </SettingsCard>

        <SettingsCard title="Keyboard">
          {KEY_BINDINGS.map(([action, keys]) => (
            <div key={action} className={styles.keyboardRow}>
              <span>{action}</span>
              <KeyCaps keys={keys} variant="window" />
            </div>
          ))}
        </SettingsCard>
      </div>
    </BeaconWindow>
  );
}

function SettingsCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function SettingRow({ title, detail, children }: { title: string; detail: string; children: ReactNode }) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.settingLabel}>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      {children}
    </div>
  );
}
