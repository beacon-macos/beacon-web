import type { SVGProps } from "react";

const STAR = "m12 3.8 2.5 5.1 5.6.8-4.05 3.95.95 5.6L12 16.6l-5 2.65.95-5.6L3.9 9.7l5.6-.8z";
const GEAR = "M10.3 3.5h3.4l.5 2.4 1.7 1 2.3-.8 1.7 3-1.8 1.6v2l1.8 1.6-1.7 3-2.3-.8-1.7 1-.5 2.4h-3.4l-.5-2.4-1.7-1-2.3.8-1.7-3 1.8-1.6v-2L3.9 9.1l1.7-3 2.3.8 1.7-1z";

const PATHS = {
  magnifyingglass: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  sparkleMagnifyingglass: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.4 15.4 4.8 4.8" />
      <path d="M10.5 7.2c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8z" fill="currentColor" strokeWidth={1} />
    </>
  ),
  textMagnifyingglass: (
    <>
      <path d="M4 6h9M4 10h5M4 14h4" />
      <circle cx="15" cy="13" r="4" />
      <path d="m18 16 3 3" />
    </>
  ),
  star: <path d={STAR} />,
  starFill: <path d={STAR} fill="currentColor" />,
  return: <path d="M19 5v6.5a2.5 2.5 0 0 1-2.5 2.5H5m0 0 4-4m-4 4 4 4" />,
  arrowUpArrowDown: <path d="M8 19V5m0 0L4.5 8.5M8 5l3.5 3.5M16 5v14m0 0-3.5-3.5M16 19l3.5-3.5" />,
  gearshape: (
    <>
      <path d={GEAR} />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  gearshapeFill: (
    <path
      d={`${GEAR}M12 9.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z`}
      fill="currentColor"
      fillRule="evenodd"
      strokeWidth={1}
    />
  ),
  grid: (
    <g fill="currentColor" strokeWidth={1}>
      <rect x="4.5" y="4.5" width="6" height="6" rx="1.6" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1.6" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1.6" />
      <rect x="13.5" y="13.5" width="6" height="6" rx="1.6" />
    </g>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c-2.4 2.4-3.5 5.3-3.5 8.5s1.1 6.1 3.5 8.5c2.4-2.4 3.5-5.3 3.5-8.5s-1.1-6.1-3.5-8.5z" />
    </>
  ),
  app: <rect x="4.5" y="4.5" width="15" height="15" rx="4" />,
  arrowCounterclockwise: (
    <>
      <path d="M5.2 13a7 7 0 1 0 1.9-6" />
      <path d="M6.5 3.5v4h4" />
    </>
  ),
  exclamationTriangle: (
    <>
      <path d="M10.3 4.6a2 2 0 0 1 3.4 0l7 12.2a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3z" fill="currentColor" strokeWidth={1} />
      <path d="M12 9v4.2M12 16.5v.1" stroke="var(--symbol-cutout, #fff)" strokeWidth={2} />
    </>
  ),
  arrowUpRight: <path d="M8 16 16 8m0 0H9.5M16 8v6.5" />,
  arrowDownToLine: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5.5 19.5h13" />
} as const;

export type SymbolName = keyof typeof PATHS;

export function SymbolIcon({ name, ...props }: { name: SymbolName } & SVGProps<SVGSVGElement>) {
  const isLabelled = Boolean(props["aria-label"]);
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={isLabelled ? undefined : true}
      role={isLabelled ? "img" : undefined}
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
