## Kom igång

```bash
git clone <repo-url>
cd Kvalitetsprojekt
npm install      # bara första gången
npm start        # starta dev-servern, skanna QR-koden med Expo Go
```

## Arbetsflöde (git)

Alla jobbar i en egen branch per feature

| Kommando                    | Gör                                                                      |
| --------------------------- | ------------------------------------------------------------------------ |
| `npm run new login`         | Hämtar senaste `main` och skapar branchen `feature/login`                |
| `npm run save "meddelande"` | Kontrollerar koden, committar allt och pushar din branch                 |
| `npm run update`            | Hämtar in det andra lagt till i `main` (gör det gärna ofta)              |
| `npm run finish`            | Uppdaterar, kontrollerar, lägger in branchen i `main`, pushar och städar |

## Tips

- Lägg till paket med `npx expo install <paket>` (inte `npm install <paket>`).
- `npm install` behövs bara första gången. Därefter hämtar `new`, `update` och `finish` ner nya paket automatiskt när någon har lagt till dem.
- Om appen beter sig konstigt efter att paket eller konfiguration har ändrats: `npx expo start --clear`.
