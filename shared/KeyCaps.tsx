import styles from "./KeyCaps.module.css";

type KeyCapsProps = {
  keys: string[];
  variant?: "page" | "desktop" | "window";
};

export function KeyCaps({ keys, variant = "page" }: KeyCapsProps) {
  return (
    <span className={`${styles.keys} ${styles[variant]}`}>
      {keys.map((key, index) => (
        <kbd key={index}>{key}</kbd>
      ))}
    </span>
  );
}
