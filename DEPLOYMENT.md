# Deployment pz-solutions.pl na Cloudflare Pages

Strona jest publikowana jako statyczny eksport Next.js do istniejącego projektu Cloudflare Pages `pz-solutions`. Produkcyjna gałąź projektu Pages to `main`. Działające adresy: https://pz-solutions.pl, https://www.pz-solutions.pl oraz https://pz-solutions.pages.dev. DNS obsługuje repo `infra`; deployment strony nie wymaga zmian DNS ani serwera Hostinger.

## Konfiguracja aplikacji

Działająca wersja z 17 października 2026 używa Next.js 16.1.1, React 19.2.3 i Wrangler 4.151.1. Zachowaj istniejące wersje aplikacji w docelowym repo; zmiany wersji nie są wymaganiem samego deploymentu.

Repo jest skonfigurowane do eksportu statycznego w `next.config.js`:

```js
output: 'export',
images: { unoptimized: true },
```

Wynik `next build` musi zawierać `out/index.html` oraz angielską wersję `/en`. Eksport statyczny nie uruchamia serwera Next.js: własne API, Server Actions i dynamiczny SSR wymagałyby osobnej migracji na Workers lub inny backend.

PostHog używa bezpośredniego `api_host: "https://eu.i.posthog.com"` w `pages/_app.tsx`; `ui_host` pozostaje `https://eu.posthog.com`. Proxy `/ingest` nie jest potrzebne.

## Dane dostępowe

- Konto Cloudflare: `cf2d00ad00340e758a5bc656c5479868`.
- Projekt Pages: `pz-solutions` (istniejący Direct Upload).
- Token: `CLOUDFLARE_PAGES_API_TOKEN` w projekcie Infisical `infra`, środowisko `prod`, folder `/terraform`.
- Przy uruchamianiu Wrangler ten token musi trafić do zmiennej `CLOUDFLARE_API_TOKEN`.
- `CLOUDFLARE_ACCOUNT_ID` jest zapisany obok tokenu w Infisical.
- Build wymaga `NEXT_PUBLIC_POSTHOG_KEY` zgodnego z dotychczasowym projektem PostHog. To publiczny klucz projektu wbudowywany w pliki przeglądarki; nie zastępuj go prywatnym kluczem API PostHog.
- Token Cloudflare ma uprawnienie Account → Cloudflare Pages → Edit ograniczone do właściwego konta. Nie potrzebuje praw do DNS.

Nie zapisuj tokenu w repo ani w komendzie przekazywanej jako argument. Użyj Infisical albo sekretów CI.

## Publikacja ręczna

W docelowym repo uruchom instalację zgodną z jego lockfile i `next build`. Przykład dla repo utrzymującego `package-lock.json`:

```bash
npm ci
npm run build
```

Podczas budowania musi być dostępna zmienna `NEXT_PUBLIC_POSTHOG_KEY`, np. z ignorowanego `.env.local` albo ze środowiska CI. Repo utrzymuje `package-lock.json`; nie twórz drugiego lockfile na potrzeby deploymentu.

Następnie, mając w środowisku `CLOUDFLARE_API_TOKEN` i `CLOUDFLARE_ACCOUNT_ID`, opublikuj:

```bash
npx --yes wrangler@4.151.1 pages deploy out \
  --project-name pz-solutions \
  --branch main
```

Wrangler przesyła już zbudowane pliki. Nie uruchamia za Ciebie `next build`. `main` wskazuje produkcję projektu Pages, niezależnie od nazwy lokalnej gałęzi Git. Próbne wdrożenie wykonaj z inną nazwą `--branch`, np. `migration-check`; nie zmieni ono produkcyjnej domeny.

Na OMF istnieje także helper w worktree repo `infra`, który sam pobiera token z Infisical:

```bash
/home/wooboo/Work/infra/scripts/deploy-pz-pages.sh /absolutna/sciezka/do/repo/out
```

Helper jest utrzymywany w głównym checkoutcie repo `infra` na OMF. Na innych komputerach używaj powyższego polecenia Wrangler z bezpiecznie dostarczonymi zmiennymi.

## GitHub Actions

Workflow [deploy-pages.yml](.github/workflows/deploy-pages.yml) publikuje produkcję po pushu do `main`. Można go również uruchomić przez Actions → Deploy to Cloudflare Pages → Run workflow, wybierając `main`; inne gałęzie pomijają deployment.

Workflow używa Node.js 22, instaluje zależności przez `npm ci`, buduje aplikację, sprawdza `out/index.html` i `out/en.html`, a następnie wysyła `out` przez Wrangler 4.151.1 do projektu `pz-solutions`, gałęzi Pages `main`. Uruchomienia produkcyjne nie przerywają trwającej publikacji. Token Cloudflare jest dostępny tylko w kroku deploymentu.

W Settings → Secrets and variables → Actions są skonfigurowane:

- sekret `CLOUDFLARE_API_TOKEN` (wartość tokenu Pages z Infisical),
- zmienna `CLOUDFLARE_ACCOUNT_ID` z ID powyżej,
- zmienna `NEXT_PUBLIC_POSTHOG_KEY` na etapie budowania.

Token i zmienne skonfigurowano 17 października 2026. Pierwsze uruchomienie Actions nastąpi po wypchnięciu workflow na `main`. `CLOUDFLARE_API_TOKEN` jest sekretem repo; pozostałe dwie wartości są zmiennymi repo. Workflow kończy się czytelnym błędem, jeśli którejś wartości brakuje. Projekt Pages pozostaje typu Direct Upload; integracja Git w panelu Cloudflare nie jest potrzebna. Workflow nie publikuje pull requestów.

## Sprawdzenie po publikacji

Sprawdź `/` i `/en` pod domeną produkcyjną, przełączanie języka, obrazy, link do adresu e-mail oraz wysyłanie zdarzeń do właściwego projektu PostHog. Status obu domen w Pages powinien być `active`.

Powrót do wcześniejszego wdrożenia wykonuj przez rollback w projekcie Pages. Nie przełączaj DNS z powrotem na Hostinger jako zwykłego rollbacku.

## Kopia migracyjna

Źródła wersji przygotowanej do Cloudflare: `nas:/chorizon/Backups/vps1-retirement-20261017/pz-solutions-cloudflare-source-20261017.tar.gz`.

SHA-256: `4b0200632d5a1b3fb1cd033dc86f29acf4361fc500fa51be8717208072f2b886`.

Archiwum nie zawiera `.env*`, `node_modules`, `.next` ani `out`. Nie nadpisuj nim bieżącej pracy w repo; służy do porównania z działającą wersją migracyjną.

Źródła: [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [eksport statyczny Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [domeny Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/).
