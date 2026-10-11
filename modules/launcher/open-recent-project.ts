import type { LauncherResultRowContent } from "./LauncherResultRow";

// Mirrors the command added by beacon-macos/Beacon@e7893a37. The browser demo
// intentionally presents only the favorite row and does not run extension code.
export const OPEN_RECENT_PROJECT_ROW: LauncherResultRowContent = {
  title: "Open Recent Project",
  subtitle: "Visual Studio Code",
  symbol: "curlybraces",
  tint: "blue",
  isExtensionCommand: true,
};
