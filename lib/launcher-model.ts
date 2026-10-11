import type { Application } from "./applications";

// A TypeScript port of Beacon/LauncherModel.swift. Matching, ranking,
// selection, and favorites follow the native implementation so the demo
// behaves like the app; keep the two in sync when either changes.

export type Tint = "blue" | "green" | "clay" | "sand";

export type LauncherTarget =
  | { kind: "application"; app: Application }
  | { kind: "settings" }
  | { kind: "folder"; name: string }
  | { kind: "url"; url: string };

export type LauncherResult = {
  id: string;
  title: string;
  subtitle: string;
  symbol: "app" | "gearshape-fill" | "grid" | "globe";
  tint: Tint;
  target: LauncherTarget;
};

export const SETTINGS_RESULT_ID = "command:settings";
const WEB_SEARCH_RESULT_ID = "command:web-search";

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export function normalized(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").trim().toLowerCase();
}

export function matchScore(query: string, candidate: string): number | null {
  if (!query) return 0;
  if (candidate === query) return 1000;

  const candidateCharacters = Array.from(candidate);
  const queryCharacters = Array.from(query);
  if (candidate.startsWith(query)) return 800 - candidateCharacters.length;

  const offset = candidate.indexOf(query);
  if (offset >= 0) return 600 - Array.from(candidate.slice(0, offset)).length;

  let queryIndex = 0;
  let score = 0;
  let lastMatch: number | null = null;
  for (let index = 0; index < candidateCharacters.length && queryIndex < queryCharacters.length; index++) {
    if (candidateCharacters[index] === queryCharacters[queryIndex]) {
      score += lastMatch !== null && lastMatch + 1 === index ? 16 : 5;
      lastMatch = index;
      queryIndex++;
    }
  }
  return queryIndex === queryCharacters.length ? score : null;
}

function webSearchURL(query: string): string {
  const url = new URL("https://www.google.com/search");
  url.searchParams.set("q", query);
  return url.toString();
}

function commandResults(): LauncherResult[] {
  return [
    {
      id: SETTINGS_RESULT_ID,
      title: "Beacon Settings",
      subtitle: "Shortcut and launcher preferences",
      symbol: "gearshape-fill",
      tint: "clay",
      target: { kind: "settings" }
    },
    {
      id: "command:applications",
      title: "Applications",
      subtitle: "Open folder in Finder",
      symbol: "grid",
      tint: "sand",
      target: { kind: "folder", name: "Applications" }
    }
  ];
}

export class LauncherModel {
  query = "";
  results: LauncherResult[] = [];
  selectedIndex = 0;
  isSettingsButtonSelected = false;
  favoriteIDs: string[];

  onRun: ((result: LauncherResult) => void) | null = null;
  onOpenSettings: (() => void) | null = null;
  onDismiss: (() => void) | null = null;
  onFavoritesChanged: ((favoriteIDs: string[]) => void) | null = null;

  private readonly applications: Application[];

  constructor(applications: Application[], favoriteIDs: string[]) {
    this.applications = applications;
    this.favoriteIDs = Array.from(new Set(favoriteIDs));
    this.rebuildResults();
  }

  get canReorderFavoriteForSelection(): boolean {
    return normalized(this.query) === ""
      && !this.isSettingsButtonSelected
      && this.selectedIndex < this.results.length;
  }

  setQuery(query: string) {
    this.query = query;
    this.selectedIndex = 0;
    this.isSettingsButtonSelected = false;
    this.rebuildResults();
  }

  restoreFavorites(favoriteIDs: string[]) {
    this.favoriteIDs = Array.from(new Set(favoriteIDs));
    this.rebuildResults();
  }

  prepareForPresentation() {
    this.setQuery("");
  }

  moveSelection(offset: number) {
    if (offset === 0) return;
    if (this.results.length === 0) {
      if (offset > 0) this.isSettingsButtonSelected = true;
      return;
    }

    const currentPosition = this.isSettingsButtonSelected ? this.results.length : this.selectedIndex;
    const nextPosition = Math.min(Math.max(currentPosition + offset, 0), this.results.length);
    this.isSettingsButtonSelected = nextPosition === this.results.length;
    this.selectedIndex = Math.min(nextPosition, this.results.length - 1);
  }

  selectResult(index: number) {
    if (index < 0 || index >= this.results.length) return;
    this.selectedIndex = index;
    this.isSettingsButtonSelected = false;
  }

  moveFavoriteForSelection(offset: number) {
    if (!this.canReorderFavoriteForSelection || offset === 0) return;

    const destinationIndex = this.selectedIndex + offset;
    if (destinationIndex < 0 || destinationIndex >= this.results.length) return;

    const selectedID = this.results[this.selectedIndex].id;
    const destinationID = this.results[destinationIndex].id;
    const favoriteIndex = this.favoriteIDs.indexOf(selectedID);
    const destinationFavoriteIndex = this.favoriteIDs.indexOf(destinationID);
    if (favoriteIndex < 0 || destinationFavoriteIndex < 0) return;

    this.favoriteIDs[favoriteIndex] = destinationID;
    this.favoriteIDs[destinationFavoriteIndex] = selectedID;
    this.onFavoritesChanged?.(this.favoriteIDs.slice());
    this.rebuildResults();

    const reorderedIndex = this.results.findIndex((result) => result.id === selectedID);
    if (reorderedIndex >= 0) this.selectedIndex = reorderedIndex;
  }

  runSelected() {
    if (this.isSettingsButtonSelected) {
      this.openSettings();
      return;
    }
    const result = this.results[this.selectedIndex];
    if (result) this.run(result);
  }

  run(result: LauncherResult) {
    if (result.target.kind === "settings") {
      this.openSettings();
      return;
    }
    this.onRun?.(result);
    this.dismiss();
  }

  isFavorite(result: LauncherResult): boolean {
    return this.favoriteIDs.includes(result.id);
  }

  toggleFavoriteForSelection(): boolean {
    if (this.isSettingsButtonSelected) return false;
    const result = this.results[this.selectedIndex];
    if (!result || result.id === WEB_SEARCH_RESULT_ID) return false;

    const index = this.favoriteIDs.indexOf(result.id);
    if (index >= 0) {
      this.favoriteIDs.splice(index, 1);
    } else {
      this.favoriteIDs.push(result.id);
    }
    this.onFavoritesChanged?.(this.favoriteIDs.slice());

    if (normalized(this.query) === "") this.rebuildResults();
    return true;
  }

  dismiss() {
    this.onDismiss?.();
  }

  openSettings() {
    this.dismiss();
    this.onOpenSettings?.();
  }

  private rebuildResults() {
    const normalizedQuery = normalized(this.query);
    const candidates = commandResults().concat(
      this.applications.map((app): LauncherResult => ({
        id: app.id,
        title: app.name,
        subtitle: "Application",
        symbol: "app",
        tint: "blue",
        target: { kind: "application", app }
      }))
    );

    if (normalizedQuery === "") {
      const candidatesByID = new Map(candidates.map((candidate) => [candidate.id, candidate]));
      this.results = this.favoriteIDs.flatMap((id) => candidatesByID.get(id) ?? []);
    } else {
      this.results = candidates
        .flatMap((candidate): [LauncherResult, number][] => {
          const score = matchScore(normalizedQuery, normalized(candidate.title + " " + candidate.subtitle));
          return score === null ? [] : [[candidate, score]];
        })
        .sort((lhs, rhs) => (lhs[1] === rhs[1] ? collator.compare(lhs[0].title, rhs[0].title) : rhs[1] - lhs[1]))
        .slice(0, 30)
        .map(([candidate]) => candidate);

      this.results.push({
        id: WEB_SEARCH_RESULT_ID,
        title: `Search the web for “${this.query}”`,
        subtitle: "Open in the default browser",
        symbol: "globe",
        tint: "green",
        target: { kind: "url", url: webSearchURL(this.query) }
      });
    }
    this.selectedIndex = this.results.length === 0 ? 0 : Math.min(this.selectedIndex, this.results.length - 1);
  }
}
