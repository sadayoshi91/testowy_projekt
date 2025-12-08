# PowerShell apply script - run from project root (D:\Projekt)
# It will:
# 1) backup package.json to package.json.bak
# 2) copy electron files into ./electron/
# 3) set package.json 'main' to 'electron/start-main.js' and add scripts for electron dev
# 4) inform about manual merging if you have custom main
$ErrorActionPreference = 'Stop'
$root = Get-Location
$pkg = Join-Path $root 'package.json'
if (-Not (Test-Path $pkg)) {
  Write-Error 'package.json not found in current directory. Run this script in project root.'
  exit 1
}
Copy-Item $pkg -Destination (Join-Path $root 'package.json.bak') -Force
Write-Output 'Backed up package.json to package.json.bak'
# copy electron files (they are located in the zip root electron/)
$source = Join-Path $PSScriptRoot 'electron'
$dest = Join-Path $root 'electron'
if (-Not (Test-Path $source)) {
  Write-Error 'This script expects electron/ files next to the script. Ensure you extracted the patch into project root.'
  exit 1
}
Copy-Item $source -Destination $dest -Recurse -Force
Write-Output 'Copied electron files to ./electron/'
# update package.json
$json = Get-Content $pkg -Raw | ConvertFrom-Json
$json.main = 'electron/start-main.js'
if (-Not $json.scripts) { $json.scripts = @{} }
# add dev script for electron + vite concurrently
$json.scripts['dev:electron'] = 'concurrently "npx vite" "wait-on http://localhost:5173 && ELECTRON_START_URL=http://localhost:5173 electron ."'
$json.scripts['start:electron'] = 'ELECTRON_START_URL=http://localhost:5173 electron .'
# write back
$json | ConvertTo-Json -Depth 10 | Out-File $pkg -Encoding utf8
Write-Output 'Updated package.json: set main and added scripts (dev:electron, start:electron). Original backed up.'
Write-Output 'If you have a custom Electron main, merge electron/main-ipc.js into it instead of replacing main.'
