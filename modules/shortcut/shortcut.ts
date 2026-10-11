export type Modifier = "ctrl" | "alt" | "shift" | "meta";

type ModifierFlags = Record<Modifier, boolean>;

export type Shortcut =
  | ({ kind: "combo"; code: string } & ModifierFlags)
  | { kind: "double"; modifier: Modifier };

type Combo = Extract<Shortcut, { kind: "combo" }>;

const MODIFIERS: Record<Modifier, { glyph: string; flag: "ctrlKey" | "altKey" | "shiftKey" | "metaKey" }> = {
  ctrl: { glyph: "⌃", flag: "ctrlKey" },
  alt: { glyph: "⌥", flag: "altKey" },
  shift: { glyph: "⇧", flag: "shiftKey" },
  meta: { glyph: "⌘", flag: "metaKey" }
};
const DISPLAY_ORDER: Modifier[] = ["ctrl", "alt", "shift", "meta"];
const DOUBLE_TAP_ORDER: Modifier[] = ["alt", "meta", "ctrl", "shift"];
const MODIFIER_KEYS = new Set(["Control", "Alt", "Shift", "Meta", "CapsLock", "Fn", "FnLock", "OS", "AltGraph"]);

export const DEFAULT_SHORTCUT: Shortcut = { kind: "combo", code: "Space", ctrl: false, alt: true, shift: false, meta: false };

const NAMED_KEYS: Record<string, string> = {
  Space: "Space", Enter: "↩", NumpadEnter: "⌤", Tab: "⇥", Backspace: "⌫", Delete: "⌦",
  Escape: "Esc", ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓",
  Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]", Backslash: "\\",
  Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/", Backquote: "`",
  IntlBackslash: "§", Home: "↖", End: "↘", PageUp: "⇞", PageDown: "⇟"
};

const SYSTEM_RESERVED = new Set([
  "meta+Space", "meta+Tab", "meta+KeyQ", "meta+KeyW", "meta+KeyT", "meta+KeyN",
  "meta+KeyH", "meta+KeyM", "shift+meta+KeyT", "shift+meta+KeyN", "ctrl+Tab", "ctrl+shift+Tab"
]);

function keyName(code: string): string {
  if (NAMED_KEYS[code]) return NAMED_KEYS[code];
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  if (/^Numpad\d$/.test(code)) return code.slice(6);
  return code;
}

function isPressed(event: KeyboardEvent, modifier: Modifier): boolean {
  return event[MODIFIERS[modifier].flag];
}

function modifierFlags(isSet: (modifier: Modifier) => boolean): ModifierFlags {
  return { ctrl: isSet("ctrl"), alt: isSet("alt"), shift: isSet("shift"), meta: isSet("meta") };
}

function activeModifiers(shortcut: Combo): Modifier[] {
  return DISPLAY_ORDER.filter((modifier) => shortcut[modifier]);
}

function signature(shortcut: Shortcut): string {
  if (shortcut.kind === "double") return "double+" + shortcut.modifier;
  return [...activeModifiers(shortcut), shortcut.code].join("+");
}

export function doubleTap(modifier: Modifier): Shortcut {
  return { kind: "double", modifier };
}

export function keyCapComponents(shortcut: Shortcut): string[] {
  if (shortcut.kind === "double") {
    const glyph = MODIFIERS[shortcut.modifier].glyph;
    return [glyph, glyph];
  }
  return [...activeModifiers(shortcut).map((modifier) => MODIFIERS[modifier].glyph), keyName(shortcut.code)];
}

export function displayName(shortcut: Shortcut): string {
  return keyCapComponents(shortcut).join("");
}

export function isDefaultShortcut(shortcut: Shortcut): boolean {
  return signature(shortcut) === signature(DEFAULT_SHORTCUT);
}

export function isModifierKey(event: KeyboardEvent): boolean {
  return MODIFIER_KEYS.has(event.key);
}

export function shortcutFromEvent(event: KeyboardEvent): Shortcut {
  return { kind: "combo", code: event.code, ...modifierFlags((modifier) => isPressed(event, modifier)) };
}

export function hasModifiers(shortcut: Shortcut): boolean {
  return shortcut.kind === "double" || activeModifiers(shortcut).length > 0;
}

export function matchesEvent(shortcut: Shortcut, event: KeyboardEvent): boolean {
  return shortcut.kind === "combo"
    && !isModifierKey(event)
    && event.code === shortcut.code
    && DISPLAY_ORDER.every((modifier) => isPressed(event, modifier) === shortcut[modifier]);
}

export function registrationError(shortcut: Shortcut): string | null {
  return SYSTEM_RESERVED.has(signature(shortcut))
    ? "That shortcut is already used by macOS or your browser."
    : null;
}

class DoubleModifierPressDetector {
  static readonly maximumInterval = 0.4;

  private isModifierPressed = false;
  private previousPressTimestamp: number | null = null;

  flagsChanged(modifierIsPressed: boolean, hasOtherModifiers: boolean, timestamp: number): boolean {
    if (hasOtherModifiers) {
      this.reset();
      this.isModifierPressed = modifierIsPressed;
      return false;
    }

    if (modifierIsPressed === this.isModifierPressed) return false;
    this.isModifierPressed = modifierIsPressed;
    if (!modifierIsPressed) return false;

    if (this.previousPressTimestamp !== null
      && timestamp >= this.previousPressTimestamp
      && timestamp - this.previousPressTimestamp <= DoubleModifierPressDetector.maximumInterval) {
      this.previousPressTimestamp = null;
      return true;
    }

    this.previousPressTimestamp = timestamp;
    return false;
  }

  reset() {
    this.isModifierPressed = false;
    this.previousPressTimestamp = null;
  }
}

export class DoubleTapWatcher {
  private readonly detectors = new Map(DOUBLE_TAP_ORDER.map((modifier) => [modifier, new DoubleModifierPressDetector()]));

  handle(event: KeyboardEvent): Modifier | null {
    const timestamp = event.timeStamp / 1000;
    let detected: Modifier | null = null;
    for (const [modifier, detector] of this.detectors) {
      const hasOtherModifiers = DISPLAY_ORDER.some((other) => other !== modifier && isPressed(event, other));
      if (detector.flagsChanged(isPressed(event, modifier), hasOtherModifiers, timestamp)) detected = modifier;
    }
    return detected;
  }

  reset() {
    for (const detector of this.detectors.values()) detector.reset();
  }
}
