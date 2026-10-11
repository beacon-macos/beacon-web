# AGENTS.md

This file contains repository-specific guidance for coding agents working on the Beacon website.

## Project overview

This repository is the website for [Beacon](https://github.com/beacon-macos/Beacon), a native macOS application launcher. It is a Next.js App Router project written in TypeScript and deployed on Vercel. The home page presents the app and includes an interactive version of the launcher.

## Important files

- `app/`: routes, the root layout, metadata, and styles
- `lib/launcher-model.ts`: port of `Beacon/LauncherModel.swift`: normalization, matching, ranking, selection, and favorites
- `lib/shortcut.ts`: port of `Beacon/KeyboardShortcut.swift`: key combinations, double-tapped modifiers, and their display
- `lib/applications.tsx`: the demo's application index and icon drawings

## Working rules

- Keep the ports in `lib/` behaviorally identical to the Swift sources they mirror. When the app changes that behavior, update the port the same way and reference the app commit or pull request.
- Name branches, commits, and pull requests as Beacon's [`CONTRIBUTING.md`](https://github.com/beacon-macos/Beacon/blob/master/CONTRIBUTING.md) specifies. Use these scopes: `demo` for the interactive launcher, `landing` for page content and layout, `seo` for metadata and social images, and `deps` for dependency updates.
- Do not add a dependency unless the task requires it.
- The demo may use the names of Apple's apps, but never their artwork. Demo icons are simple drawings.

## Build and test

```sh
npm run lint
npm run build
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
