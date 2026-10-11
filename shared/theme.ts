export type Theme = "system" | "light" | "dark";

export const THEMES: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" }
];

export function isTheme(value: unknown): value is Theme {
  return THEMES.some((theme) => theme.value === value);
}
