const PREFIX = "beacon-demo:";

export function load(key: string): unknown {
  try {
    const value = window.localStorage.getItem(PREFIX + key);
    return value === null ? null : JSON.parse(value);
  } catch {
    return null;
  }
}

export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}
