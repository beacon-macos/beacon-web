"use client";

import { useEffect, useId, useLayoutEffect, useRef, type KeyboardEvent, type MouseEvent, type Ref } from "react";
import type { DemoState, DemoStore } from "@/modules/demo/demo-store";
import { BeaconWindow } from "@/shared/BeaconWindow";
import { scrollBehavior } from "@/shared/motion";
import { SymbolIcon } from "@/shared/SymbolIcon";
import { LauncherResultRow } from "./LauncherResultRow";
import { OPEN_RECENT_PROJECT_ROW } from "./open-recent-project";
import styles from "./launcher.module.css";

type LauncherProps = {
  store: DemoStore;
  state: DemoState;
  ref: Ref<HTMLElement>;
};

export function Launcher({ store, state, ref }: LauncherProps) {
  const { query, results, selectedIndex, isSettingsButtonSelected, presentation } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const scrollsToSelection = useRef(false);
  const listID = useId();

  useEffect(() => {
    if (presentation > 0) inputRef.current?.focus({ preventScroll: true });
  }, [presentation]);

  useLayoutEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [query]);

  useLayoutEffect(() => {
    if (!scrollsToSelection.current) return;
    scrollsToSelection.current = false;
    const list = listRef.current;
    const row = list?.children[selectedIndex] as HTMLElement | undefined;
    if (!list || !row) return;
    list.scrollTo({ top: row.offsetTop - (list.clientHeight - row.offsetHeight) / 2, behavior: scrollBehavior() });
  }, [selectedIndex, isSettingsButtonSelected]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.nativeEvent.isComposing) return;
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown": {
        event.preventDefault();
        const offset = event.key === "ArrowUp" ? -1 : 1;
        scrollsToSelection.current = true;
        if (event.altKey && state.canReorderFavoriteForSelection) {
          store.moveFavoriteForSelection(offset);
        } else {
          store.moveSelection(offset);
        }
        return;
      }
      case "Enter":
        event.preventDefault();
        store.runSelected();
        return;
      case "Escape":
        event.preventDefault();
        store.dismiss();
        return;
    }
    if (event.metaKey && event.key.toLowerCase() === "k" && store.toggleFavoriteForSelection()) {
      event.preventDefault();
    }
  }

  function handlePointerMove(event: MouseEvent, index: number) {
    const pointer = { x: event.screenX, y: event.screenY };
    if (lastPointer.current?.x === pointer.x && lastPointer.current.y === pointer.y) return;
    lastPointer.current = pointer;
    store.selectResult(index);
  }

  function focusSearch(event: MouseEvent) {
    if (event.target instanceof HTMLElement && event.target.closest("input, button, a")) return;
    event.preventDefault();
    inputRef.current?.focus({ preventScroll: true });
  }

  const selectedResult = isSettingsButtonSelected ? undefined : results[selectedIndex];

  return (
    <BeaconWindow
      ref={ref}
      theme={state.theme}
      className={styles.launcher}
      aria-label="Beacon launcher"
      onKeyDown={handleKeyDown}
      onMouseDown={focusSearch}
    >
      <div className={styles.searchBar}>
        <SymbolIcon name="magnifyingglass" className={styles.searchIcon} strokeWidth={2.6} />
        <input
          ref={inputRef}
          className={styles.searchField}
          value={query}
          onChange={(event) => store.setQuery(event.target.value)}
          placeholder="Search apps and commands"
          aria-label="Search apps and commands"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listID}
          aria-autocomplete="list"
          aria-activedescendant={selectedResult ? `${listID}-${selectedIndex}` : undefined}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
        />
      </div>
      <div className={styles.divider} />

      {results.length === 0 ? (
        <div className={styles.emptyState}>
          <SymbolIcon name={query ? "textMagnifyingglass" : "star"} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>{query ? `No results for “${query}”` : "No favorites yet"}</p>
          {!query && <p className={styles.emptyDetail}>Search for an app or command, then press ⌘K</p>}
        </div>
      ) : (
        <ul ref={listRef} id={listID} className={styles.results} role="listbox" aria-label="Results">
          {results.map((result, index) => {
            const isSelected = result === selectedResult;
            return (
              <LauncherResultRow
                key={result.id}
                id={`${listID}-${index}`}
                content={{
                  title: result.title,
                  subtitle: result.subtitle,
                  symbol: result.symbol,
                  tint: result.tint,
                  application: result.target.kind === "application" ? result.target.app : undefined,
                }}
                isSelected={isSelected}
                isFavorite={state.favoriteIDs.includes(result.id)}
                onMouseMove={(event) => handlePointerMove(event, index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => store.runResult(index)}
              />
            );
          })}
          {!query && (
            <LauncherResultRow
              content={OPEN_RECENT_PROJECT_ROW}
              isSelected={false}
              isFavorite
              isDecorative
            />
          )}
        </ul>
      )}

      <div className={styles.divider} />
      <div className={styles.footer}>
        <span className={styles.hint}>
          <SymbolIcon name="return" /> Open
        </span>
        <span className={styles.hint}>
          <SymbolIcon name="arrowUpArrowDown" /> Navigate
        </span>
        <span className={`${styles.hint} ${styles.wideHint}`}>
          <SymbolIcon name="star" /> Favorite ⌘K
        </span>
        <span className={`${styles.hint} ${styles.widestHint}`}>Hold ⌥ and press ↑↓ to rearrange</span>
        <button
          type="button"
          className={styles.settingsButton}
          data-selected={isSettingsButtonSelected || undefined}
          onClick={() => store.openSettings()}
        >
          <SymbolIcon name="gearshape" /> Settings
        </button>
      </div>
    </BeaconWindow>
  );
}
