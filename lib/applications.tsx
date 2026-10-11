import type { ReactNode } from "react";

// The demo's application index: what Beacon would find in /Applications,
// /System/Applications, and ~/Applications on a typical Mac. Icons are simple
// drawings that hint at each app, not the apps' real artwork.

export type ApplicationIcon =
  | { kind: "glyph"; glyph: ReactNode; top: string; bottom: string; color: string }
  | { kind: "beacon" };

export type Application = {
  id: string;
  name: string;
  icon: ApplicationIcon;
};

const dots = (points: [number, number][]) => (
  <path d={points.map(([x, y]) => `M${x} ${y}h.1`).join("")} strokeWidth={2.4} />
);

const GLYPHS = {
  pulse: <path d="M3 12.5h4l2-5 4 10 2.2-5H21" />,
  appStore: <path d="M7.5 17 12.5 8.2M16.5 17l-5-8.8M6.2 14h11.6" />,
  book: (
    <>
      <path d="M3.5 6.2c2.9-1.1 5.8-.9 8.5 1 2.7-1.9 5.6-2.1 8.5-1v11.6c-2.9-1.1-5.8-.9-8.5 1-2.7-1.9-5.6-2.1-8.5-1z" />
      <path d="M12 7.2v11.6" />
    </>
  ),
  calculator: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="2" />
      <path d="M8.5 7h7" />
      {dots([[8.6, 11.5], [12, 11.5], [15.4, 11.5], [8.6, 14.5], [12, 14.5], [15.4, 14.5], [8.6, 17.5], [12, 17.5], [15.4, 17.5]])}
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16M8.5 3v4M15.5 3v4" />
      {dots([[9, 13.5], [12, 13.5], [15, 13.5], [9, 16.5], [12, 16.5]])}
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="9" r="3.4" />
      <path d="M5.5 19.5c.9-3.4 3.5-5.2 6.5-5.2s5.6 1.8 6.5 5.2" />
    </>
  ),
  disk: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3.5v4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="7" width="12" height="10" rx="2.2" />
      <path d="m15 10.5 5.5-3v9l-5.5-3z" />
    </>
  ),
  finder: (
    <>
      <path d="M12.6 3.5c-1.3 3-2 6.4-2 10h2.2c0 2.3.2 4.5.6 6.5" />
      <path d="M8.2 8.5v2.2M15.8 8.5v2.2" />
      <path d="M7.5 15.2c2.9 1.9 6.1 1.9 9 0" />
    </>
  ),
  fontBook: (
    <text x="12" y="16.6" textAnchor="middle" fontSize="12" fontWeight="600" stroke="none" fill="currentColor" fontFamily="ui-serif, Georgia, serif">
      Aa
    </text>
  ),
  squiggle: (
    <>
      <path d="M4.5 16.5c2.6-7.6 4.6-1.2 7.1-4.9 2.4-3.6 3.9 2.1 7.9-3.1" />
      <circle cx="18.6" cy="17" r="1.6" />
    </>
  ),
  house: <path d="M4.5 11 12 4.8l7.5 6.2v8.5h-5v-5h-5v5h-5z" />,
  bookmark: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="2" />
      <path d="M9.5 3.5v7l2-1.4 2 1.4v-7" />
    </>
  ),
  podium: <path d="M5 5.5h14v8H5zM12 13.5v6M8.5 19.5h7" />,
  mail: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2.2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  map: (
    <>
      <path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  bubble: <path d="M12 4.5c4.7 0 8.5 3 8.5 6.8s-3.8 6.7-8.5 6.7c-1 0-2-.1-2.9-.4l-4 1.9.9-3.4C4.4 14.9 3.5 13.2 3.5 11.3 3.5 7.5 7.3 4.5 12 4.5z" />,
  note: (
    <>
      <path d="M9 17.5V6.2l10-2v11" />
      <circle cx="6.6" cy="17.6" r="2.4" />
      <circle cx="16.6" cy="15.3" r="2.4" />
    </>
  ),
  news: <path d="M7.5 17.5v-11l9 11v-11" />,
  lines: <path d="M7 7h10M7 11h10M7 15h6" />,
  bars: <path d="M6.5 19v-6M10.5 19V6M14.5 19v-9M18.5 19v-4" />,
  nib: (
    <>
      <path d="M12 3.8 17 11l-5 9.2L7 11z" />
      <path d="M12 3.8v8.2" />
      <circle cx="12" cy="13.2" r="1.3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.6" />
      <path d="M11.6 12h8.9M17.5 12v3M20.5 12v2.4" />
    </>
  ),
  camera: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.4" />
      <path d="M8.5 7 10 4.5h4L15.5 7" />
      <circle cx="12" cy="13.2" r="3.3" />
    </>
  ),
  photos: (
    <>
      {([["#FF9F0A", 0], ["#FFD60A", 60], ["#30D158", 120], ["#40C8E0", 180], ["#5E5CE6", 240], ["#FF375F", 300]] as const).map(
        ([color, angle]) => (
          <ellipse key={angle} cx="12" cy="7.4" rx="2.6" ry="4.4" fill={color} fillOpacity={0.85} stroke="none" transform={`rotate(${angle} 12 12)`} />
        )
      )}
    </>
  ),
  podcast: (
    <>
      <circle cx="12" cy="10" r="2.3" />
      <path d="M11 13.5h2l-.5 6.5h-1z" />
      <path d="M7.8 14.3a6 6 0 1 1 8.4 0M5.4 17A9.3 9.3 0 1 1 18.6 17" />
    </>
  ),
  preview: (
    <>
      <rect x="3.5" y="5" width="13" height="10.5" rx="1.6" />
      <circle cx="15.5" cy="14.5" r="3.4" />
      <path d="m18 17 2.6 2.6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m10 8.3 5.6 3.7-5.6 3.7z" fill="currentColor" />
    </>
  ),
  list: (
    <>
      <path d="M10 7h9M10 12h9M10 17h9" />
      <path d="M5.6 7h.1M5.6 12h.1M5.6 17h.1" strokeWidth={3} />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.6 8.4-2.2 5-5 2.2 2.2-5z" fill="currentColor" />
    </>
  ),
  screenshot: (
    <>
      <path d="M4 8.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8 4.5-8 4.5-8-4.5z" />
      <path d="m4 12.5 8 4.5 8-4.5M4 16.3l8 4.4 8-4.4" />
    </>
  ),
  chart: (
    <>
      <path d="m4 16 5-5 3.2 3.2L19.5 7" />
      <path d="M15.5 7h4v4" />
    </>
  ),
  gear: (
    <>
      <path d="M10.27 4.8 10.35 2.54h3.3l.08 2.26 2.14.89 1.65-1.54 2.33 2.33-1.54 1.65.89 2.14 2.26.08v3.3l-2.26.08-.89 2.14 1.54 1.65-2.33 2.33-1.65-1.54-2.14.89-.08 2.26h-3.3l-.08-2.26-2.14-.89-1.65 1.54-2.33-2.33 1.54-1.65-.89-2.14-2.26-.08v-3.3l2.26-.08.89-2.14-1.54-1.65 2.33-2.33 1.65 1.54z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  terminal: <path d="m6.5 8.5 3.5 3.5-3.5 3.5M12 15.5h5.5" />,
  pencil: (
    <>
      <path d="m15.2 4.6 4.2 4.2L9 19.2H4.8V15z" />
      <path d="m13 6.8 4.2 4.2" />
    </>
  ),
  timeMachine: (
    <>
      <path d="M4.8 9.2A8 8 0 1 1 4 12" />
      <path d="M4.2 5.2v4.2h4.2" />
      <path d="M12 8v4.2l2.8 1.8" />
    </>
  ),
  tv: (
    <>
      <rect x="3.5" y="5" width="17" height="11.5" rx="1.8" />
      <path d="M9 19.5h6" />
    </>
  ),
  wave: <path d="M4.5 10.5v3M8 7.5v9M11.5 5v14M15 8.5v7M18.5 10.5v3" />,
  weather: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M8 19h9a3.5 3.5 0 0 0 .2-7 5 5 0 0 0-9.4 1A3 3 0 0 0 8 19z" />
    </>
  ),
  hammer: (
    <>
      <path d="m5 19.5 8.6-8.6" />
      <path d="m11.2 6.4 3.4-2.2 5.2 5.2-2.2 3.4-2.5-.9-2.6-2.6z" />
    </>
  )
} satisfies Record<string, ReactNode>;

type GlyphName = keyof typeof GLYPHS;

// name, glyph, gradient top, gradient bottom, glyph color
const INDEX: [string, GlyphName | "beacon", string?, string?, string?][] = [
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
  icon: glyph === "beacon" ? { kind: "beacon" } : { kind: "glyph", glyph: GLYPHS[glyph], top, bottom, color }
}));

export function applicationNamed(name: string): Application {
  const application = APPLICATIONS.find((app) => app.name === name);
  if (!application) throw new Error(`No demo application named ${name}`);
  return application;
}
