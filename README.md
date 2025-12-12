# Startup Company - Skeleton

## Instrukcja uruchomienia

1. Zainstaluj zależności:
 ```bash
 npm install
 ```
2. Uruchom projekt w trybie deweloperskim (React + Electron):
 ```bash
 npm run dev
 ```
3. Zbuduj projekt produkcyjnie:
 ```bash
 npm run build
 ```
4. Uruchom aplikację Electron na bazie zbudowanego frontendu:
 ```bash
 npm start
 ```

## Wymagania
- Node.js (zalecana najnowsza LTS)
- npm

## Struktura projektu
- `src/` — kod źródłowy aplikacji (React, TypeScript)
- `electron.main.js` — główny plik Electron
- `dist/` — pliki produkcyjne (nie wersjonować)
- `node_modules/` — zależności (nie wersjonować)

## Uwagi
- Plik `dist/` oraz `node_modules/` są ignorowane przez `.gitignore`.
- Jeśli pojawią się błędy związane z Electron, sprawdź czy plik `electron.main.js` jest w katalogu głównym.
