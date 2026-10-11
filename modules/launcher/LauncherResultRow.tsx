import type { MouseEventHandler } from "react";
import { AppIcon } from "@/modules/applications/AppIcon";
import type { Application } from "@/modules/applications/applications";
import { SymbolIcon, type SymbolName } from "@/shared/SymbolIcon";
import type { Tint } from "./launcher-model";
import styles from "./launcher-result-row.module.css";

export type LauncherResultRowContent = {
  title: string;
  subtitle: string;
  symbol: SymbolName;
  tint: Tint;
  application?: Application;
  isExtensionCommand?: boolean;
};

type LauncherResultRowProps = {
  content: LauncherResultRowContent;
  isSelected: boolean;
  isFavorite: boolean;
  isDecorative?: boolean;
  id?: string;
  onMouseMove?: MouseEventHandler<HTMLLIElement>;
  onMouseDown?: MouseEventHandler<HTMLLIElement>;
  onClick?: MouseEventHandler<HTMLLIElement>;
};

export function LauncherResultRow({
  content,
  isSelected,
  isFavorite,
  isDecorative = false,
  id,
  onMouseMove,
  onMouseDown,
  onClick,
}: LauncherResultRowProps) {
  return (
    <li
      id={id}
      className={styles.row}
      role={isDecorative ? "presentation" : "option"}
      aria-hidden={isDecorative || undefined}
      aria-selected={isDecorative ? undefined : isSelected}
      data-selected={isSelected || undefined}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <ResultIcon content={content} />
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{content.title}</span>
        <span className={styles.rowSubtitle}>{content.subtitle}</span>
      </span>
      {content.isExtensionCommand && (
        <span className={styles.extensionBadge}>
          <SymbolIcon name="extension" />
          <span className={styles.extensionLabel}>Extension</span>
        </span>
      )}
      {isFavorite && <SymbolIcon name="starFill" className={styles.favoriteMark} aria-label="Favorite" />}
      {isSelected && <kbd className={styles.returnKey}>↵</kbd>}
    </li>
  );
}

function ResultIcon({ content }: { content: LauncherResultRowContent }) {
  if (content.application) {
    return (
      <span className={styles.resultIcon}>
        <AppIcon app={content.application} size={30} />
      </span>
    );
  }
  return (
    <span className={`${styles.resultIcon} ${styles.symbolIcon}`} style={{ backgroundColor: `var(--tint-${content.tint})` }}>
      <SymbolIcon name={content.symbol} />
    </span>
  );
}
