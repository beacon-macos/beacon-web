"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { Launcher } from "@/modules/launcher/Launcher";
import { SettingsWindow } from "@/modules/settings/SettingsWindow";
import { useGlobalShortcut } from "@/modules/shortcut/useGlobalShortcut";
import { scrollBehavior } from "@/shared/motion";
import { DemoStore } from "./demo-store";
import { Dock } from "./Dock";
import { LaunchBanner } from "./LaunchBanner";
import { MenuBar } from "./MenuBar";
import { OpenHint } from "./OpenHint";
import styles from "./demo.module.css";

const SUGGESTIONS = ["xcd", "términal", "sys set", "pasta recipes"];

export function LauncherDemo() {
  const [store] = useState(() => new DemoStore());
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const stageRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLElement>(null);

  useEffect(() => {
    store.restore();
  }, [store]);

  useGlobalShortcut(state.shortcut, !state.isRecordingShortcut, () => {
    if (state.isLauncherVisible && launcherRef.current?.contains(document.activeElement)) {
      store.dismiss();
      return;
    }
    revealStage(stageRef.current);
    store.showLauncher();
  });

  function handleStagePointerDown(event: PointerEvent) {
    if (state.isLauncherVisible && !launcherRef.current?.contains(event.target as Node)) store.dismiss();
  }

  return (
    <div className={styles.demo}>
      <div ref={stageRef} className={styles.stage} onPointerDown={handleStagePointerDown}>
        <MenuBar onOpen={() => store.showLauncher()} onSettings={() => store.openSettings()} />

        <div className={styles.desktop}>
          {!state.isLauncherVisible && !state.isSettingsVisible && (
            <OpenHint shortcut={state.shortcut} onOpen={() => store.showLauncher()} />
          )}
          {state.isSettingsVisible && <SettingsWindow store={store} state={state} />}
          {state.isLauncherVisible && <Launcher ref={launcherRef} store={store} state={state} />}
          <div className={styles.bannerRegion} aria-live="polite">
            {state.launch && <LaunchBanner key={state.launch.id} launch={state.launch} onDismiss={() => store.dismissLaunch()} />}
          </div>
          <Dock items={state.dock} />
        </div>
      </div>

      <div className={styles.suggestions}>
        <span className={styles.suggestionsLabel}>Try</span>
        {SUGGESTIONS.map((query) => (
          <button key={query} type="button" className={styles.suggestion} onClick={() => store.showLauncher(query)}>
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}

function revealStage(stage: HTMLElement | null) {
  if (!stage) return;
  const { top, bottom } = stage.getBoundingClientRect();
  const middle = window.innerHeight / 2;
  if (top < middle && bottom > middle) return;
  stage.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
}
