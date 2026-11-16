This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Project conventions

This is a school project worked on by 5 people. Only some of them use AI agents, so everything must work with plain npm and git.

- **Language:** all code is written in English: identifiers, comments, file names, commit messages and npm script names. User-facing documentation (`README.md`) and the team's terminal messages are in Swedish.
- **Package manager:** npm only (`package-lock.json`). Never use bun, yarn or pnpm.
- **Imports:** use the `@/` alias for `src/`, e.g. `import { X } from '@/components/X'`.
- **Structure:** `src/app` (routes), `src/components`, `src/hooks`, `src/services`, `src/utils`, `src/constants`, `src/types`, `docs`.
- **Formatting and linting:** Prettier and ESLint. A pre-commit hook (Husky + lint-staged) runs them on changed files. Never bypass it with `--no-verify`.
- **No tests:** there is no test setup. Do not add one unless the user asks.

### Git workflow

Everyone works in their own feature branch, never directly on `main`. Use the npm scripts in `scripts/git.mjs` instead of raw git where possible:

```bash
npm run new <name>       # create feature/<name> from the latest main
npm run save "message"   # run checks, commit and push the branch
npm run update           # merge the latest main into the branch
npm run finish           # merge the branch into main, push and delete the branch
```

Do not commit, push or merge unless the user asks you to.

## Commands

```bash
npm start                   # start the dev server
npm run check               # lint + typecheck (run before declaring any task done)
npm run lint                # lint only
npm run typecheck           # typecheck only
npm run format              # format everything with Prettier
npx expo install <package>  # ALWAYS use instead of npm install <package> — resolves SDK-compatible versions
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run `npm run check` before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `npx eas-cli@latest <command>`; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
