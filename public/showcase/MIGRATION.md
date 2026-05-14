# Migration Next.js — du showcase HTML à `kijanilab-site/`

Ce document explique comment porter le **showcase HTML statique** (`docs/showcase/`) vers le scaffold Next.js déjà initialisé dans `kijanilab-site/`. Le code HTML a été écrit *avec la migration en tête* — les sélecteurs CSS, l'organisation des modules JS et la structure des pages mappent directement vers des composants React.

> Stack cible : **Next.js 16 (App Router) + TypeScript + Tailwind 4 + next-themes + Firebase Auth/Firestore**.
> Prérequis : avoir déjà installé `kijanilab-site/` (`npm install` à jour).
> ⚠️ Cette version de Next.js a des breaking changes — lire `node_modules/next/dist/docs/` avant de coder.

---

## 1. Vue d'ensemble du mapping

| Showcase HTML                          | Next.js cible                                       |
| -------------------------------------- | --------------------------------------------------- |
| `docs/showcase/index.html`             | `app/[locale]/page.tsx`                             |
| `docs/showcase/pages/services.html`    | `app/[locale]/services/page.tsx`                    |
| `docs/showcase/pages/projets.html`     | `app/[locale]/projets/page.tsx`                     |
| `docs/showcase/pages/contact.html`     | `app/[locale]/contact/page.tsx`                     |
| `docs/showcase/pages/auth.html`        | `app/[locale]/auth/page.tsx`                        |
| `docs/showcase/pages/dashboard.html`   | `app/[locale]/dashboard/page.tsx`                   |
| `docs/showcase/pages/admin.html`       | `app/[locale]/admin/page.tsx`                       |
| `docs/showcase/game/`                  | `app/[locale]/jeu/page.tsx` + `components/game/*`   |
| `docs/showcase/assets/styles.css`      | `app/globals.css` + Tailwind tokens dans `tailwind.config` |
| `docs/showcase/assets/app.js`          | `components/providers.tsx` + `components/site-header.tsx` |
| `docs/showcase/assets/logo-*.svg`      | `public/logo-*.svg`                                 |

Le scaffold contient déjà la plupart des pages et plusieurs composants. **Ne pas tout réécrire** — fusionner section par section.

---

## 2. Mapping section → composant

Chaque section du showcase devient un composant client ou serveur autonome. Toutes vivent dans `kijanilab-site/components/sections/`.

```
components/sections/
  hero-section.tsx              ← <section class="hero">
  proof-bar.tsx                 ← <section class="proof">
  services-bento.tsx            ← <section class="services" id="services">
  depth-marquee.tsx             ← <div class="depth-marquee">
  targets-list.tsx              ← <section class="targets">
  automation-flow.tsx           ← <section class="flow">
  pasture-section.tsx           ← <section class="pasture">          ← N°04 livestock
  greenhouse-section.tsx        ← <section class="greenhouse">       ← N°05 plants/irrigation
  tractor-sweep.tsx             ← <section class="tractor-sweep">    ← N°06 tracteur
  digital-timeline.tsx          ← <section class="timeline">         ← N°07
  climate-section.tsx           ← <section class="climate">          ← N°08
  personas-grid.tsx             ← <section class="personas">
  atlas-map.tsx                 ← <section class="atlas" id="atlas">
  products-grid.tsx             ← <section class="products">
  projects-list.tsx             ← <section class="projects">
  odss-grid.tsx                 ← <section class="odss">
  academy-section.tsx           ← <section class="academy">
  faq-accordion.tsx             ← <section class="faq">
  final-cta.tsx                 ← <section class="final">
```

**Règle :** une section = un composant. La home devient une simple composition de sections :

```tsx
// app/[locale]/page.tsx
import { HeroSection } from "@/components/sections/hero-section";
import { ProofBar } from "@/components/sections/proof-bar";
// ...
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <ServicesBento />
      <DepthMarquee />
      <TargetsList />
      <AutomationFlow />
      <PastureSection />
      <GreenhouseSection />
      <TractorSweep />
      <DigitalTimeline />
      <ClimateSection />
      <PersonasGrid />
      <AtlasMap />
      <ProductsGrid />
      <ProjectsList />
      <OdssGrid />
      <AcademySection />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
```

---

## 3. Theming (dark/light)

Le showcase utilise `data-theme="dark|light"` sur `<html>` + des CSS variables. **Garder cette mécanique** : elle est compatible avec `next-themes` (déjà installé).

```tsx
// components/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from "@/components/providers";
// ...
<html lang="fr" suppressHydrationWarning>
  <body><Providers>{children}</Providers></body>
</html>
```

Les CSS variables de `assets/styles.css` (`--bg`, `--fg`, `--accent`, etc.) restent **inchangées** dans `app/globals.css`. Aucune réécriture.

Le `theme-toggle` HTML devient :

```tsx
"use client";
import { useTheme } from "next-themes";
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {/* SVG du soleil/lune */}
    </button>
  );
}
```

---

## 4. i18n (FR/EN)

Le showcase encode les deux langues dans `data-fr` / `data-en`. **Ne pas porter cette mécanique en React** — utiliser `next-intl` ou un dict simple par locale.

### Option A — dict par locale (recommandé)

```ts
// lib/i18n.ts
const dicts = {
  fr: {
    hero: {
      badge: "Cotonou — Bénin",
      title: "Faire entrer l'agriculture dans son avenir.",
      // ...
    },
  },
  en: {
    hero: {
      badge: "Cotonou — Benin",
      title: "Reframe agriculture for the future.",
      // ...
    },
  },
} as const;

export function getDict(locale: "fr" | "en") {
  return dicts[locale] ?? dicts.fr;
}
```

Le scaffold a déjà `lib/i18n.ts` avec `getDictionary()` et `localizePath()` — l'étendre avec les chaînes du showcase. Toutes les chaînes `data-fr`/`data-en` du HTML doivent migrer là.

### Option B — `next-intl`

Si vous préférez une lib dédiée : `npm i next-intl`, puis structurer `messages/fr.json` et `messages/en.json` avec les mêmes clés.

---

## 5. Loader

Le loader (la pousse + la barre + le compteur) est purement décoratif et apparaît au chargement. En Next.js, mappez-le sur `app/[locale]/loading.tsx` (le scaffold en a déjà un).

```tsx
// app/[locale]/loading.tsx
export default function Loading() {
  return (
    <div className="loader">
      <div className="loader__inner">
        <div className="loader__mark">
          <span className="loader__stem" />
          <span className="loader__leaf" />
        </div>
        <div className="loader__bar" />
        <div className="loader__meta">
          <span>Cartographie de l'atelier</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
```

Les keyframes restent dans `globals.css`.

---

## 6. Le mini-jeu

Le jeu est **déjà** structuré comme du React :

```
docs/showcase/game/
  main.js                       ← <GameContainer />
  modules/
    gameState.js                ← useState / useReducer slice
    production.js               ← reducer actions
    market.js                   ← reducer action
    upgrades.js                 ← reducer actions
    ui.js                       ← disparaît, remplacé par JSX
```

### 6.1. Migration des modules

Garder `gameState.js`, `production.js`, `market.js`, `upgrades.js` **tels quels** — ce sont des fonctions pures. Renommer en `.ts` et typer :

```ts
// lib/game/state.ts
export interface GameState {
  money:      number;
  crops:      number;
  animals:    number;
  fish:       number;
  smartphone: boolean;
  ecommerce:  boolean;
}
export const initialState: GameState = { money:0, crops:0, animals:0, fish:0, smartphone:false, ecommerce:false };
export const PRICES = { smartphone: 100, ecommerce: 250 } as const;
export const SELL_PER_UNIT = 10;
// ...mêmes helpers
```

`ui.js` disparaît : son rôle est repris par JSX + `useState`.

### 6.2. Composants React

```tsx
// components/game/GameContainer.tsx
"use client";
import { useReducer, useEffect } from "react";
import { reducer, initialState, load, save, isFullyDigital } from "@/lib/game/state";
import { Header } from "./Header";
import { ResourcePanel } from "./ResourcePanel";
import { ActionButtons } from "./ActionButtons";
import { UpgradeCard } from "./UpgradeCard";
import { WinBox } from "./WinBox";
import { Instructions } from "./Instructions";

export default function GameContainer() {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => save(state), [state]);
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <Header state={state} />
      <ResourcePanel state={state} />
      <ActionButtons dispatch={dispatch} state={state} />
      <UpgradeCard kind="smartphone" state={state} dispatch={dispatch} />
      <UpgradeCard kind="ecommerce"  state={state} dispatch={dispatch} />
      {isFullyDigital(state) && <WinBox />}
      <Instructions />
    </main>
  );
}
```

Le `reducer` factorise les actions :

```ts
type Action =
  | { type: "PRODUCE_CROPS" }
  | { type: "PRODUCE_ANIMALS" }
  | { type: "PRODUCE_FISH" }
  | { type: "SELL" }
  | { type: "BUY_SMARTPHONE" }
  | { type: "BUY_ECOMMERCE" }
  | { type: "RESET" };

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "PRODUCE_CROPS":   return { ...state, crops:   state.crops + 1 };
    case "PRODUCE_ANIMALS": return { ...state, animals: state.animals + 1 };
    case "PRODUCE_FISH":    return { ...state, fish:    state.fish + 1 };
    case "SELL":            return sellReducer(state);
    case "BUY_SMARTPHONE":  return buySmartphone(state).state;
    case "BUY_ECOMMERCE":   return buyEcommerce(state).state;
    case "RESET":           return { ...initialState };
  }
}
```

### 6.3. Page

```tsx
// app/[locale]/jeu/page.tsx
import GameContainer from "@/components/game/GameContainer";
export default function GamePage() {
  return <GameContainer />;
}
```

### 6.4. Animations

Les keyframes `kj-press`, `kj-float`, `kj-glow` du `<style>` du jeu vont dans `app/globals.css` ou dans le bloc `theme.extend.keyframes` de `tailwind.config.ts`.

---

## 7. Reveal-on-scroll

Le code dans `app.js` utilise `IntersectionObserver` pour ajouter `.in` aux éléments `.reveal`. En React :

```tsx
// hooks/use-reveal.ts
"use client";
import { useEffect, useRef } from "react";
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
```

Usage :

```tsx
const ref = useReveal<HTMLDivElement>();
return <div ref={ref} className="reveal">…</div>;
```

---

## 8. Auth + Firestore

Le scaffold a déjà `lib/firebase.ts` et `lib/firestore.ts`. Brancher `auth.html` :

```tsx
// app/[locale]/auth/page.tsx
"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await signInWithEmailAndPassword(auth, data.get("email") as string, data.get("password") as string);
      router.push("/fr/dashboard");
    } catch (e: any) { setErr(e.message); }
  }
  return (/* JSX porté du auth.html */);
}
```

Le rôle admin se gère via une collection `users/{uid}` :

```ts
{ uid, email, role: "user" | "admin", createdAt }
```

`app/[locale]/admin/page.tsx` doit faire un check `role === "admin"` côté serveur (via cookies de session Firebase) ou côté client avec un guard.

---

## 9. Dashboard et admin

Les tableaux du dashboard et de l'admin sont des **données statiques** dans le HTML (pour la maquette). En prod :

- `dashboard.html` → lire `users/{uid}/enrollments` et `trainings/`
- `admin.html` → CRUD sur `trainings/` + lecture `users/`, `quoteRequests/`

Collections Firestore minimales (à compléter dans `lib/firestore.ts`) :

```ts
trainings:    { id, title, slug, durationHours, sessions, status: "live" | "draft" | "manual", priceCents }
users:        { uid, name, email, role, createdAt }
enrollments:  { uid, trainingId, progress: 0..1, status, lastActivityAt }
quoteRequests:{ id, name, org, email, phone, type, service, budget, message, priority, createdAt, status }
```

---

## 10. Atlas / map géospatiale

La map SVG stylisée du showcase est suffisante pour la home. Pour l'**atlas réel** (page dédiée, plus tard), passer à **Mapbox GL** ou **Leaflet** :

```bash
npm i mapbox-gl
```

Composant `<AtlasMap layers={["zones", "risques", "capteurs"]} />` chargé en `dynamic` (`ssr: false`) car Mapbox est purement client.

Garder la version SVG sur la home — elle est plus légère, plus stylée et plus rapide.

---

## 11. Tracteur, vaches, plantes, météo

Toutes les illustrations 3D-feel du showcase sont **CSS pur + SVG inline**. Aucune dépendance lourde, pas de Three.js, pas de WebGL. Les composants se portent quasi tels quels :

```tsx
// components/sections/tractor-sweep.tsx
export function TractorSweep() {
  return (
    <section className="tractor-sweep">
      <div className="wrap">
        {/* JSX directement copié du HTML */}
        <div className="tractor-stage">
          <div className="tractor-stage__sky" />
          <div className="tractor-stage__field" />
          {/* ... */}
          <div className="tractor">
            <svg viewBox="0 0 240 140">{/* paths */}</svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Règle :** garder les classes CSS du showcase, ne pas tout traduire en `className` Tailwind. Le design system existe déjà dans `globals.css`.

---

## 12. Si vous voulez aller à 100% Tailwind

Le scaffold actuel utilise Tailwind 4. Si vous préférez convertir :

1. Conservez les CSS variables (`--bg`, `--fg`, `--accent`, `--mint`, etc.) dans `@theme` Tailwind 4 :

```css
/* app/globals.css */
@import "tailwindcss";
@theme {
  --color-ink: #0A1410;
  --color-mint: #43AA8B;
  --color-bone: #E8DFC8;
  --font-display: "Fraunces", serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

2. Réécrivez les sections complexes (`pasture`, `greenhouse`, `tractor-sweep`) en gardant le CSS personnalisé — c'est plus lisible que des dizaines de classes Tailwind.

3. Les boutons/cartes simples passent en Tailwind sans difficulté.

Recommandation : **CSS hybride**. Tailwind pour les utilitaires, CSS variables pour les tokens, CSS modules pour les composants visuels riches (pasture, tractor, etc.).

---

## 13. Polices

```tsx
// app/layout.tsx
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "SOFT"] });
const sans    = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono    = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
  return (
    <html className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Et ajustez les variables CSS :

```css
:root {
  --display: var(--font-display), serif;
  --sans:    var(--font-sans), system-ui, sans-serif;
  --mono:    var(--font-mono), monospace;
}
```

---

## 14. Plan de migration recommandé (5 jours)

| Jour | Livrables                                                                 |
| ---- | ------------------------------------------------------------------------- |
| 1    | Theme + i18n + polices + globals.css (tout sauf composants)              |
| 2    | Hero + Proof + Services + Depth marquee + Targets                        |
| 3    | Flow + Pasture + Greenhouse + Tractor + Timeline + Climate (sections "field") |
| 4    | Personas + Atlas + Products + Projects + ODD + Academy + FAQ + Final CTA |
| 5    | Mini-jeu + Auth + Dashboard + Admin + tests + déploiement               |

---

## 15. Checklist d'acceptation

- [ ] Toggle FR/EN fonctionne sur toutes les pages
- [ ] Toggle dark/light fonctionne sur toutes les pages
- [ ] Loader s'affiche pendant la transition
- [ ] Reveal-on-scroll actif sur les sections
- [ ] Mini-jeu : produire, vendre, acheter, sauvegarde locale OK
- [ ] Mini-jeu : message final s'affiche quand les 2 upgrades sont achetés
- [ ] Formulaire de devis envoie un document `quoteRequests` dans Firestore
- [ ] Auth : login email + Google OK, redirection dashboard
- [ ] Dashboard utilisateur affiche les enrollments réels
- [ ] Admin : CRUD sur la collection `trainings` opérationnel
- [ ] Sections livestock / greenhouse / tractor / climat s'animent correctement
- [ ] Atlas SVG s'affiche avec les coordonnées correctes
- [ ] Build Next.js sans erreur (`npm run build`)
- [ ] Lighthouse mobile > 90 sur la home
- [ ] Schema.org Organization + Service injectés sur la home

---

## 16. Aide à la décision

**Faut-il porter tout d'un coup ?** Non. Le scaffold `kijanilab-site/` a déjà une page d'accueil. Approche progressive :

1. Remplacer le hero existant par celui du showcase
2. Ajouter les sections N°04 à N°08 (livestock → climat) — c'est la valeur la plus visible
3. Refondre la depth-marquee et les services bento
4. Migrer le jeu
5. Migrer auth/dashboard/admin

Chaque étape est mergeable indépendamment.

---

## 17. Questions ouvertes

- **Mapbox** vs **MapLibre + tuiles open** : si le bailleur exige du libre, MapLibre + tiles OSM est gratuit et auto-hébergé.
- **next-intl** vs **dict maison** : pour 2 langues, dict maison suffit. Au-delà de 4, prendre next-intl.
- **GSAP** pour la timeline scroll : **non nécessaire**. Les animations CSS du showcase sont suffisantes et plus performantes.
- **Three.js / R3F** pour la scène drone : **non recommandé**. Le SVG actuel est plus rapide, plus accessible et plus nettement maintenable.

---

Si vous voulez démarrer la migration, ouvrez `kijanilab-site/app/[locale]/page.tsx` et commencez par y importer les composants `<HeroSection />` et `<ProofBar />` que vous extrayez de `docs/showcase/index.html`.

— *Prochaine étape suggérée : créer `components/sections/hero-section.tsx` à partir du bloc `<section class="hero">` du showcase.*
