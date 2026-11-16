# Kvalitetsprojekt

Expo / React Native-app med Expo Router och TypeScript.

## Förutsättningar

- Git och VS Code
- Node.js 22 eller nyare (npm följer med; använd inte yarn/bun)
- Expo Go på telefonen (version som stöder Expo SDK 58) eller en emulator
- VS Code föreslår att du installerar tilläggen Prettier och ESLint när du öppnar projektet. Tacka ja.

## Kom igång

```bash
git clone <repo-url>
cd Kvalitetsprojekt
npm install      # bara första gången
npm start        # starta dev-servern, skanna QR-koden med Expo Go
```

## Arbetsflöde (git)

Alla jobbar i en egen branch per feature, aldrig direkt på `main`. Fyra kommandon räcker:

| Kommando                    | Gör                                                                      |
| --------------------------- | ------------------------------------------------------------------------ |
| `npm run new login`         | Hämtar senaste `main` och skapar branchen `feature/login`                |
| `npm run save "meddelande"` | Kontrollerar koden, committar allt och pushar din branch                 |
| `npm run update`            | Hämtar in det andra lagt till i `main` (gör det gärna ofta)              |
| `npm run finish`            | Uppdaterar, kontrollerar, lägger in branchen i `main`, pushar och städar |

Ett typiskt arbetspass:

1. `npm run new my-feature`
2. Skriv kod och testa med `npm start`.
3. `npm run save "Beskriv vad du gjort"`, så ofta du vill.
4. När featuren är färdig: `npm run finish`

Om något går fel, till exempel en merge-konflikt, stannar kommandot och förklarar vad du ska göra. Lös det och kör sedan samma kommando igen. Skripten ligger i `scripts/git.mjs`.

Kontrollen av koden (ESLint, Prettier och typer) körs automatiskt av `save` och `finish`, och av en hook vid varje commit. Du behöver inte köra den själv.

## Struktur

```
src/app/          Skärmar och routes (Expo Router)
src/components/   Återanvändbara komponenter
src/hooks/        Egna hooks
src/services/     API-anrop, lagring m.m.
src/utils/        Hjälpfunktioner
src/constants/    Färger, konfiguration
src/types/        Delade TypeScript-typer
docs/             Dokumentation
```

Importera med alias: `import { X } from '@/components/X'`.

## Tips

- Lägg till paket med `npx expo install <paket>` (inte `npm install <paket>`).
- `npm install` behövs bara första gången. Därefter hämtar `new`, `update` och `finish` ner nya paket automatiskt när någon har lagt till dem.
- Om appen beter sig konstigt efter att paket eller konfiguration har ändrats: `npx expo start --clear`.
