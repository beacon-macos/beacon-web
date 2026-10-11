import { APPLICATIONS, applicationNamed, type Application } from "@/modules/applications/applications";
import { LauncherModel, SETTINGS_RESULT_ID, type LauncherResult, type LauncherTarget } from "@/modules/launcher/launcher-model";
import { DEFAULT_SHORTCUT, parseShortcut, registrationError, type Shortcut } from "@/modules/shortcut/shortcut";
import { isTheme, type Theme } from "@/shared/theme";
import { load, save } from "./storage";

export type Launch = {
  id: number;
  app: Application;
  title: string;
  detail: string;
  link?: string;
};

export type DockItem = { app: Application; launches: number };

export type DemoState = {
  query: string;
  results: LauncherResult[];
  selectedIndex: number;
  isSettingsButtonSelected: boolean;
  canReorderFavoriteForSelection: boolean;
  favoriteIDs: string[];
  isLauncherVisible: boolean;
  presentation: number;
  isSettingsVisible: boolean;
  isRecordingShortcut: boolean;
  shortcut: Shortcut;
  shortcutError: string | null;
  theme: Theme;
  dock: DockItem[];
  launch: Launch | null;
};

const FINDER = applicationNamed("Finder");
const BROWSER = applicationNamed("Safari");
const BEACON = applicationNamed("Beacon");
const DEFAULT_FAVORITES = [...["Safari", "Mail", "Notes", "Terminal"].map((name) => applicationNamed(name).id), SETTINGS_RESULT_ID];
const DOCK_LIMIT = 7;

function launchFor(target: LauncherTarget): Omit<Launch, "id"> | null {
  switch (target.kind) {
    case "application":
      return target.app === BEACON
        ? { app: BEACON, title: "Beacon", detail: "Already running in the menu bar" }
        : { app: target.app, title: target.app.name, detail: "Opened with Beacon" };
    case "folder":
      return { app: FINDER, title: target.name, detail: "Opened in Finder" };
    case "url":
      return {
        app: BROWSER,
        title: "Search the web",
        detail: `Searching for “${new URL(target.url).searchParams.get("q") ?? ""}”`,
        link: target.url
      };
    case "settings":
      return null;
  }
}

export class DemoStore {
  private readonly model = new LauncherModel(APPLICATIONS, DEFAULT_FAVORITES);
  private readonly listeners = new Set<() => void>();
  private isLauncherVisible = true;
  private presentation = 0;
  private isSettingsVisible = false;
  private isRecordingShortcut = false;
  private shortcut: Shortcut = DEFAULT_SHORTCUT;
  private theme: Theme = "system";
  private dock: DockItem[] = [{ app: FINDER, launches: 0 }];
  private launch: Launch | null = null;
  private launchTimer: ReturnType<typeof setTimeout> | undefined;
  private state: DemoState;
  private readonly initialState: DemoState;

  constructor() {
    this.model.onRun = (result) => this.didRun(result);
    this.model.onDismiss = () => {
      this.isLauncherVisible = false;
    };
    this.model.onOpenSettings = () => {
      this.isSettingsVisible = true;
    };
    this.model.onFavoritesChanged = (favoriteIDs) => save("favorites", favoriteIDs);
    this.state = this.initialState = this.snapshot();
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.state;

  getServerSnapshot = () => this.initialState;

  restore() {
    const favoriteIDs = load("favorites");
    if (Array.isArray(favoriteIDs) && favoriteIDs.every((id) => typeof id === "string")) {
      this.model.restoreFavorites(favoriteIDs);
    }
    this.shortcut = parseShortcut(load("shortcut")) ?? this.shortcut;
    const theme = load("theme");
    if (isTheme(theme)) this.theme = theme;
    this.commit();
  }

  setQuery(query: string) {
    this.model.setQuery(query);
    this.commit();
  }

  moveSelection(offset: number) {
    this.model.moveSelection(offset);
    this.commit();
  }

  moveFavoriteForSelection(offset: number) {
    this.model.moveFavoriteForSelection(offset);
    this.commit();
  }

  selectResult(index: number) {
    if (index === this.model.selectedIndex && !this.model.isSettingsButtonSelected) return;
    this.model.selectResult(index);
    this.commit();
  }

  runSelected() {
    this.model.runSelected();
    this.commit();
  }

  runResult(index: number) {
    this.model.selectResult(index);
    this.runSelected();
  }

  toggleFavoriteForSelection(): boolean {
    const handled = this.model.toggleFavoriteForSelection();
    if (handled) this.commit();
    return handled;
  }

  showLauncher() {
    this.model.prepareForPresentation();
    this.isLauncherVisible = true;
    this.presentation++;
    this.commit();
  }

  dismiss() {
    this.model.dismiss();
    this.commit();
  }

  openSettings() {
    this.model.openSettings();
    this.commit();
  }

  closeSettings() {
    this.isSettingsVisible = false;
    this.isRecordingShortcut = false;
    this.commit();
  }

  setRecordingShortcut(isRecording: boolean) {
    if (this.isRecordingShortcut === isRecording) return;
    this.isRecordingShortcut = isRecording;
    this.commit();
  }

  updateShortcut(shortcut: Shortcut) {
    this.shortcut = shortcut;
    save("shortcut", shortcut);
    this.commit();
  }

  resetShortcut() {
    this.updateShortcut(DEFAULT_SHORTCUT);
  }

  updateTheme(theme: Theme) {
    this.theme = theme;
    save("theme", theme);
    this.commit();
  }

  dismissLaunch() {
    clearTimeout(this.launchTimer);
    this.launch = null;
    this.commit();
  }

  private didRun(result: LauncherResult) {
    const launch = launchFor(result.target);
    if (!launch) return;
    if (launch.app !== BEACON) this.addToDock(launch.app);

    clearTimeout(this.launchTimer);
    this.launch = { ...launch, id: (this.launch?.id ?? 0) + 1 };
    this.launchTimer = setTimeout(() => this.dismissLaunch(), launch.link ? 7000 : 3500);
  }

  private addToDock(app: Application) {
    const existing = this.dock.find((item) => item.app === app);
    if (existing) {
      this.dock = this.dock.map((item) => (item === existing ? { app, launches: item.launches + 1 } : item));
      return;
    }
    const dock = [...this.dock, { app, launches: 1 }];
    if (dock.length > DOCK_LIMIT) dock.splice(1, 1);
    this.dock = dock;
  }

  private snapshot(): DemoState {
    return {
      query: this.model.query,
      results: this.model.results.slice(),
      selectedIndex: this.model.selectedIndex,
      isSettingsButtonSelected: this.model.isSettingsButtonSelected,
      canReorderFavoriteForSelection: this.model.canReorderFavoriteForSelection,
      favoriteIDs: this.model.favoriteIDs.slice(),
      isLauncherVisible: this.isLauncherVisible,
      presentation: this.presentation,
      isSettingsVisible: this.isSettingsVisible,
      isRecordingShortcut: this.isRecordingShortcut,
      shortcut: this.shortcut,
      shortcutError: registrationError(this.shortcut),
      theme: this.theme,
      dock: this.dock,
      launch: this.launch
    };
  }

  private commit() {
    this.state = this.snapshot();
    for (const listener of this.listeners) listener();
  }
}
