import { useEffect, useEffectEvent } from "react";
import { DoubleTapWatcher, isModifierKey, matchesEvent, type Shortcut } from "./shortcut";

export function useGlobalShortcut(shortcut: Shortcut, isEnabled: boolean, onTrigger: () => void) {
  const trigger = useEffectEvent(onTrigger);

  useEffect(() => {
    if (!isEnabled) return;
    const watcher = new DoubleTapWatcher();

    function handleKey(event: KeyboardEvent) {
      if (isModifierKey(event)) {
        const modifier = watcher.handle(event);
        if (shortcut.kind === "double" && modifier === shortcut.modifier) trigger();
        return;
      }
      if (event.type !== "keydown") return;
      watcher.reset();
      if (!matchesEvent(shortcut, event)) return;
      event.preventDefault();
      if (!event.repeat) trigger();
    }

    const reset = () => watcher.reset();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      window.removeEventListener("blur", reset);
    };
  }, [shortcut, isEnabled]);
}
