# xTab Pro

A lightweight browser-native IDE powered by React, Vite, Monaco, and the File System Access API.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Extension Gallery Package

```bash
npm run build:extension
```

The unpacked Chrome/Edge MV3 extension package is emitted to `dist-extension/`. Zip the contents of that folder for an extension gallery submission.

The installable web app manifest is `public/manifest.webmanifest`.

## Desktop App Path

xTab Pro is scaffolded for Tauri v2 in `src-tauri/`.

```bash
npm run desktop:dev
npm run desktop:build
```

The desktop build uses the existing Vite output from `dist/` and keeps the browser and extension builds unchanged. Install Rust and the platform prerequisites before running the desktop commands.
