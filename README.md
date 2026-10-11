# Beacon website

The website for [Beacon](https://github.com/beacon-macos/Beacon), a fast, native application launcher for macOS, with an interactive version of the launcher that runs in the browser.

The site is a [Next.js](https://nextjs.org) App Router project written in TypeScript and deployed on [Vercel](https://vercel.com).

## Develop

Use Node.js 20.19 or later.

```sh
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Before opening a pull request, run:

```sh
npm run lint
npm run build
```

## Launcher demo

The demo uses the app's own search, ranking, favorites, and shortcut rules, ported to TypeScript:

- `lib/launcher-model.ts` mirrors [`LauncherModel.swift`](https://github.com/beacon-macos/Beacon/blob/master/Beacon/LauncherModel.swift).
- `lib/shortcut.ts` mirrors [`KeyboardShortcut.swift`](https://github.com/beacon-macos/Beacon/blob/master/Beacon/KeyboardShortcut.swift).

When the app's search or shortcut behavior changes, update these files to match.

## Contributing

Branch names, commit messages, and pull request titles follow the same Conventional Commits rules as the app. See [Beacon's contributing guide](https://github.com/beacon-macos/Beacon/blob/master/CONTRIBUTING.md).
