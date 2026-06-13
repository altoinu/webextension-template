# WebExtension Starter Template

A robust, developer-centric WebExtension boilerplate built with modern TypeScript, native ES Modules, and `webextension-polyfill`. This repository serves as a clean, standardized foundation for bootstrapping cross-browser extensions (Firefox, Chrome, Safari) with integrated tooling for linting, formatting, and automated version releases.

## Core Features

- **Cross-Browser Ready:** Implements `webextension-polyfill` out of the box, standardizing the `browser.*` namespace so the same codebase runs natively across Mozilla, Google, and Apple environments.
- **Pre-Configured Options & Popup:** Includes a functional "Save Settings" pipeline leveraging `browser.storage.local` to demonstrate immediate data persistence.
- **Strict Code Intelligence:** Wired with ESLint and Prettier, driven by Husky git hooks and `lint-staged` for uncompromising pre-commit quality control.
- **Automated CI/Deployment Pipeline:** Integrated semantic versioning scripts that automatically synchronize `package.json`, `manifest.json`, and deployment ledgers (`updates.json`) during release cycles.

## Project Structure

```text
webextension-template/
├── dist/                   # Compiled execution engine (Browser target)
├── src/
│   ├── manifest.json       # Extension capabilities & permission declarations
│   ├── icons/              # Scalable SVG branding assets
│   ├── options/            # Persistent settings workbench (HTML/CSS/TS)
│   └── popup/              # Action menu popover interface (HTML/TS)
├── scripts/                # Node.js automation tasks (Version sync engine)
├── eslint.config.mts       # Bifurcated code intelligence rules
├── package.json            # Task automation controls & dev tool declarations
└── tsconfig.json           # ECMAScript target compiler configurations
```

## Local Development & Compilation

1. Clone this repository and initialize development dependencies:
   ```bash
   npm install
   ```
2. Compile the TypeScript sources into production assets:
   ```bash
   npm run build
   ```
3. **Firefox Sideloading:** Open Firefox, navigate to `about:debugging`, select **This Firefox**, and load the `manifest.json` from the `dist/` folder.
4. **Chrome Sideloading:** Open Chrome, navigate to `chrome://extensions/`, enable **Developer Mode**, and click **Load unpacked**, pointing it to the compiled `dist/` directory.

## VS Code Debugging Workflow

This project is fully optimized for integrated breakpoint debugging and live console logging directly inside VS Code or Cursor.

1. **Start the Compiler Watcher:** Spin up the active file-watcher:
   ```bash
   npm run watch
   ```
2. **Launch the Debugger:** Go to the **Run and Debug** sidebar panel (`Cmd + Shift + D`), select **Launch Extension Workspace**, and press `F5`.
3. VS Code will automatically mount the temporary extension directly out of your compiled `dist/` directory and establish the socket pipeline. Place breakpoints in `src/**/*.ts` to trace script executions live.

### Manual Extension Inspection

If you prefer testing functionality outside of the automated VS Code launcher environment:

1. Compile the workspace manually by executing `npm run build`.
2. Sideload the temporary asset into your browser (see steps 3 or 4 in the **Local Development & Compilation** section above).
3. **Firefox:** Click the **Inspect** button adjacent to the extension descriptor within `about:debugging` to reveal the standalone Firefox Add-on Toolbox window to trace local storage entries and debug script executions.
4. **Chrome:** Click the **service worker** or **background page** link on the extension card inside `chrome://extensions/` to launch the standalone Chrome DevTools inspector.

## 📦 Release & Auto-Update Pipeline

This template includes a dynamic release pipeline configured for unlisted (self-distributed) setups. Browsers like Firefox can automatically check the `updates.json` ledger hosted on the `main` branch of your repository to discover and install new, cryptographically signed releases.

To publish a new auto-updating version:

1. **Bump, Sync & Push:** Run `npm run release:patch` (or `:minor`, `:major`). This triggers a fully automated lifecycle that increments the package version, syncs `manifest.json` and `updates.json`, commits the changes, creates a git tag, and automatically pushes everything to GitHub via the `postversion` hook.
2. **Download Clean Source Code:** Go to your GitHub repository's **Releases** page, find the newly generated version tag, and download the **Source code (zip)**. _Note: Using the GitHub release zip is highly recommended over local zipping because it natively excludes your `node_modules/` and compiled `dist/` artifacts, ensuring a clean, compliant payload for reviewers._
3. **Sign via Mozilla:** Log in to the [Mozilla Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/), upload the Source Code `.zip` artifact to your unlisted extension profile, and wait for the automated review. Download the resulting signed `.xpi` file.
4. **Distribute:** Edit the GitHub Release for your new version tag and attach the signed `.xpi` file as a binary asset. Ensure the `.xpi` file name perfectly matches the download URL designated in your `updates.json` ledger (e.g., `my-extension-0.1.0.xpi`).
5. **Auto-Update:** Users' browsers will now silently ping your live `updates.json` ledger, detect the new version, and download the `.xpi` directly from your GitHub release.

## Scripts Command Index

- `npm run build` - Transpiles the extension package and stages production assets inside `dist/`.
- `npm run clean` - Rejects and deep-cleans all ephemeral artifact directories (`dist/`, `artifacts/`, `coverage/`, and `node_modules/`).
- `npm run format` - Selective Prettier formatting pass restricted exclusively to files containing staged or uncommitted local changes.
- `npm run format:all` - Comprehensive formatting pipeline running Prettier processing definitions across the entire repository architecture uniformly.
- `npm run lint` - Executes automated ESLint static code analysis to trace syntax patterns and errors.
- `npm run lint:fix` - Runs ESLint syntax and code intelligence validations with automated downstream formatting repair loops.
- `npm run package` - Prunes prior artifacts, rebuilds source components, aggregates assets, and compiles a signed-ready extension archive inside `artifacts/`.
- `npm run reinstall` - Triggers an absolute purge of node modules and target directories before initializing a clean, fresh dependency build cycle.
- `npm run release:xxx` - Automates complete structural software deployment variations (`patch`, `minor`, `major`); increments version records, executes the configuration sync engine, and stages final JSON sets.
- `npm run watch` - Runs the active TypeScript compilation loop in a persistent file-watcher state.
