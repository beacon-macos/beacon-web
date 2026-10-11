import type { GlyphName } from "./glyphs";

export type ApplicationIcon =
  | { kind: "glyph"; glyph: GlyphName; top: string; bottom: string; color: string }
  | { kind: "beacon" };

export type Application = {
  id: string;
  name: string;
  icon: ApplicationIcon;
};

const INDEX: [name: string, glyph: GlyphName | "beacon", top?: string, bottom?: string, color?: string][] = [
  ["Activity Monitor", "pulse", "#4A4A4F", "#1C1C1E", "#5BE37D"],
  ["App Store", "appStore", "#3FA3FF", "#0A5FFF"],
  ["Beacon", "beacon"],
  ["Books", "book", "#FFA53A", "#F26A00"],
  ["Calculator", "calculator", "#5C5C61", "#2A2A2D", "#FF9F0A"],
  ["Calendar", "calendar", "#FFFFFF", "#ECECEE", "#FF3B30"],
  ["Clock", "clock", "#3A3A3D", "#111113"],
  ["Contacts", "person", "#D5B08A", "#A57A51"],
  ["Disk Utility", "disk", "#A9B1BA", "#6C7580"],
  ["FaceTime", "video", "#63E27E", "#18A93F"],
  ["Finder", "finder", "#71C9FF", "#1478EE"],
  ["Font Book", "fontBook", "#FFFFFF", "#ECECEE", "#3A3A3C"],
  ["Freeform", "squiggle", "#FFFFFF", "#ECECEE", "#0A84FF"],
  ["Home", "house", "#FFBE4D", "#FF8A00"],
  ["Journal", "bookmark", "#B992FF", "#7547F5"],
  ["Keynote", "podium", "#45A8FF", "#0062D6"],
  ["Mail", "mail", "#56B8FF", "#1270EE"],
  ["Maps", "map", "#7FDDA0", "#22A862"],
  ["Messages", "bubble", "#72E383", "#22B843"],
  ["Music", "note", "#FF6E85", "#F22747"],
  ["News", "news", "#FF5F64", "#E0222B"],
  ["Notes", "lines", "#FFE27F", "#FFC531", "#6E5200"],
  ["Numbers", "bars", "#5BDC72", "#1A9A39"],
  ["Pages", "nib", "#FFB656", "#FF7600"],
  ["Passwords", "key", "#62CDFB", "#0A72F5"],
  ["Photo Booth", "camera", "#FF7068", "#C42B27"],
  ["Photos", "photos", "#FFFFFF", "#F0F0F2"],
  ["Podcasts", "podcast", "#CB75FF", "#8424DD"],
  ["Preview", "preview", "#92D5FF", "#3594EC"],
  ["QuickTime Player", "play", "#4F5A6D", "#1C2230"],
  ["Reminders", "list", "#FFFFFF", "#ECECEE", "#3A3A3C"],
  ["Safari", "compass", "#5ECBFF", "#0A70FF"],
  ["Screenshot", "screenshot", "#B6BBC2", "#7A8089"],
  ["Shortcuts", "layers", "#FF5E9A", "#5856D6"],
  ["Stocks", "chart", "#2E2E31", "#050506", "#34C759"],
  ["System Settings", "gear", "#A9AEB5", "#686D74"],
  ["Terminal", "terminal", "#3A3A3D", "#0E0E10", "#F2F2F2"],
  ["TextEdit", "pencil", "#FFFFFF", "#ECECEE", "#3A3A3C"],
  ["Time Machine", "timeMachine", "#43D8AA", "#0C9573"],
  ["TV", "tv", "#2E2E31", "#050506"],
  ["Voice Memos", "wave", "#2E2E31", "#050506", "#FF453A"],
  ["Weather", "weather", "#5DBBFF", "#1A66DD"],
  ["Xcode", "hammer", "#52ABFF", "#1360DE"]
];

export const APPLICATIONS: Application[] = INDEX.map(([name, glyph, top = "", bottom = "", color = "#FFFFFF"]) => ({
  id: "app:" + name,
  name,
  icon: glyph === "beacon" ? { kind: "beacon" } : { kind: "glyph", glyph, top, bottom, color }
}));

export function applicationNamed(name: string): Application {
  const application = APPLICATIONS.find((app) => app.name === name);
  if (!application) throw new Error(`No demo application named ${name}`);
  return application;
}
