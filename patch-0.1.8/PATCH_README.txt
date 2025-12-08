patch-0.1.8 — Apply secure IPC + package.json scripts (PowerShell auto-apply)

Files included:
  - electron/preload.js
  - electron/main-ipc.js
  - electron/start-main.js
  - apply_patch_windows.ps1  (PowerShell script to copy files and update package.json)

How to apply (Windows, PowerShell):
  1) Extract patch-0.1.8.zip into your project root (D:\Projekt). The structure should yield electron/ and apply_patch_windows.ps1 at root.
  2) Open PowerShell, cd to project root (D:\Projekt) and run: .\apply_patch_windows.ps1
     This will backup package.json to package.json.bak, copy electron files to ./electron, and set package.json 'main' to 'electron/start-main.js' and add scripts:
       - dev:electron  (runs vite + electron in dev mode)
       - start:electron (launches electron pointed to dev url)
  3) Install concurrently & wait-on if not present: npm i -D concurrently wait-on
  4) Start dev: npm run dev:electron
  5) If you already have a custom Electron main file, instead of replacing it you should merge the content of electron/main-ipc.js into your main process and ensure BrowserWindow uses preload.js.

If you want, I can also generate a Linux/macOS apply script. If you want me to patch your main process directly, paste its contents or confirm its path and I'll edit it in-place.
