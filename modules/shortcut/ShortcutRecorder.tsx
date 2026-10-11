"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { DoubleTapWatcher, displayName, doubleTap, hasModifiers, isModifierKey, shortcutFromEvent, type Shortcut } from "./shortcut";
import styles from "./shortcut.module.css";

type ShortcutRecorderProps = {
  shortcut: Shortcut;
  onRecordingChange: (isRecording: boolean) => void;
  onChange: (shortcut: Shortcut) => void;
};

const SHAKE: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-5px)" },
  { transform: "translateX(5px)" },
  { transform: "translateX(0)" }
];

export function ShortcutRecorder({ shortcut, onRecordingChange, onChange }: ShortcutRecorderProps) {
  const [isRecording, setRecording] = useState(false);
  const [watcher] = useState(() => new DoubleTapWatcher());
  const buttonRef = useRef<HTMLButtonElement>(null);

  function setRecordingState(recording: boolean) {
    watcher.reset();
    setRecording(recording);
    onRecordingChange(recording);
  }

  function finish(recorded?: Shortcut) {
    setRecordingState(false);
    if (recorded) onChange(recorded);
    buttonRef.current?.blur();
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!isRecording) return;
    event.preventDefault();
    event.stopPropagation();

    if (isModifierKey(event.nativeEvent)) {
      const modifier = event.repeat ? null : watcher.handle(event.nativeEvent);
      if (modifier) finish(doubleTap(modifier));
      return;
    }
    if (event.type !== "keydown") return;
    if (event.key === "Escape") {
      finish();
      return;
    }

    watcher.reset();
    const recorded = shortcutFromEvent(event.nativeEvent);
    if (hasModifiers(recorded)) {
      finish(recorded);
    } else {
      buttonRef.current?.animate(SHAKE, { duration: 220 });
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.recorder}
      data-recording={isRecording || undefined}
      aria-label={isRecording ? "Type a shortcut" : `Open shortcut: ${displayName(shortcut)}. Click to change.`}
      onClick={() => setRecordingState(true)}
      onBlur={() => isRecording && setRecordingState(false)}
      onKeyDown={handleKey}
      onKeyUp={handleKey}
    >
      {isRecording ? "Type shortcut…" : displayName(shortcut)}
    </button>
  );
}
