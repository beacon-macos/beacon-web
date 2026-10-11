"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { Launcher } from "@/modules/launcher/Launcher";
import { SettingsWindow } from "@/modules/settings/SettingsWindow";
import { useGlobalShortcut } from "@/modules/shortcut/useGlobalShortcut";
import { scrollBehavior } from "@/shared/motion";
import { DemoStore } from "./demo-store";
import { Dock } from "./Dock";
import { LaunchBanner } from "./LaunchBanner";
import { MenuBar } from "./MenuBar";
import { OpenHint } from "./OpenHint";
import lightWallpaper from "@/public/wallpapers/tahoe-light.webp";
import darkWallpaper from "@/public/wallpapers/tahoe-dark.webp";
import styles from "./demo.module.css";

// Imported wallpapers share Next.js content-hashed, immutable asset caching.
const wallpaperStyle = {
  "--wallpaper-light": `url("${lightWallpaper.src}")`,
  "--wallpaper-dark": `url("${darkWallpaper.src}")`,
} as CSSProperties;

export function LauncherDemo() {
  const [store] = useState(() => new DemoStore());
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const stageRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLElement>(null);

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
    <div ref={stageRef} className={styles.stage} style={wallpaperStyle} onPointerDown={handleStagePointerDown}>
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
  );
}

function revealStage(stage: HTMLElement | null) {
  if (!stage) return;
  const { top, bottom } = stage.getBoundingClientRect();
  const middle = window.innerHeight / 2;
  if (top < middle && bottom > middle) return;
  stage.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
}
