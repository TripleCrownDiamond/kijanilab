# Showcase HTML — KijaniLab

Maquette HTML autonome (aucun build, aucune dépendance npm) qui démontre la **direction visuelle award-winning** retenue pour le site KijaniLab : éditorial, agritech, dark/light, FR/EN.

## Lancer

Ouvrez n'importe quel fichier `.html` dans un navigateur — aucun serveur n'est requis. Pour les bonnes pratiques (modules ES, polices, polish général), servez le dossier en local :

```bash
# Avec Python
python -m http.server 8080 --directory docs/showcase

# Avec Node
npx serve docs/showcase -p 8080
```

Puis ouvrez http://localhost:8080/.

## Arborescence

```
docs/showcase/
├─ index.html                  ← Home (16 sections, hero compact, drone, atlas, etc.)
├─ assets/
│  ├─ styles.css               ← Design system complet (variables, sections, page stubs)
│  ├─ app.js                   ← Theme, langue, loader, reveal-on-scroll
│  ├─ logo-dark.svg            ← Logo blanc (mode sombre)
│  ├─ logo-light.svg           ← Logo noir (mode clair)
│  ├─ wordmark-dark.svg
│  └─ wordmark-light.svg
├─ pages/
│  ├─ services.html            ← Catalogue détaillé 8 services
│  ├─ projets.html             ← Liste éditoriale (texte uniquement, comme demandé)
│  ├─ contact.html             ← Formulaire devis + canaux directs
│  ├─ auth.html                ← Connexion / création de compte
│  ├─ dashboard.html           ← Espace apprenant (parcours, sessions, certificats)
│  └─ admin.html               ← Espace admin (CRUD formations, devis, stats)
├─ game/
│  ├─ index.html               ← Mini-jeu agritech (Tailwind CDN + ES6 modulaire)
│  ├─ main.js                  ← Container racine
│  └─ modules/
│     ├─ gameState.js          ← État + persistance localStorage
│     ├─ production.js         ← Cultures / animaux / pêche
│     ├─ market.js             ← Vendre au marché
│     ├─ upgrades.js           ← Smartphone, e-commerce
│     └─ ui.js                 ← Bindings DOM (disparait à la migration React)
├─ MIGRATION.md                ← Guide complet pour porter vers Next.js 16
└─ README.md                   ← (ce fichier)
```

## Direction visuelle

- **Aesthetic** : *Field Report Editorial* — un dossier technique typeset, mi-magazine mi-terminal de pilotage agritech.
- **Typographie** : Fraunces (display, variable optical-size + SOFT axis) + Instrument Sans (corps) + JetBrains Mono (labels).
- **Couleurs** : ink `#0A1410`, mint `#43AA8B`, bone `#E8DFC8`, paper `#F2EFE6`. Dark et light avec la même ADN visuelle.
- **Différenciants** :
  - Numéraux serif italiques massifs (`№ 01`, `№ 02`...) en ancrage de section
  - Hero drone-eye avec scan satellite (overlays NDVI, coordonnées GPS, beam animé)
  - Marquee 3D à deux profondeurs (clients/cibles)
  - Atlas géospatial Afrique de l'Ouest stylisé (pas Mapbox, pas générique)
  - Sections terrain : pâturage avec capteurs, serre avec irrigation goutte-à-goutte animée, tracteur connecté qui traverse, timeline de digitalisation, widget météo
  - Loader leaf-stem qui pousse, jamais agressif

## Sections de la home (16)

| № | Section                          | But                                              |
| - | -------------------------------- | ------------------------------------------------ |
| — | Hero                             | Pitch en 5 secondes + scène drone scan          |
| — | Proof bar                        | Année / filières / ODD / engagement              |
| 01| Services bento                   | 8 lignes de services en grille asymétrique       |
| — | Depth marquee                    | Bande clients/cibles 3D à deux profondeurs       |
| 02| Cibles pills                     | 14 cibles tagguées                               |
| 03| Automation flow                  | 5 cas réels + pipeline live                      |
| 04| Pasture / livestock              | Vache, chèvre, poule + capteurs RFID animés      |
| 05| Greenhouse / irrigation          | 6 plantes qui poussent + irrigation gouttes      |
| 06| Tractor sweep                    | Tracteur connecté traversant la parcelle         |
| 07| Digital timeline                 | 5 jalons de digitalisation                       |
| 08| Climate / météo                  | Widget météo 5 jours + alertes climatiques       |
| 09| Personas IA                      | 4 profils types + tâches/avantages               |
| 10| Atlas géospatial                 | Carte Afrique de l'Ouest + 12 nœuds animés       |
| 11| Produits digitaux                | 6 produits livrables                             |
| 12| Projets phares                   | lerural.bj, ididong.org + 3 cas privés (texte)   |
| 13| ODD                              | 8 objectifs Nations Unies                        |
| 14| Académie                         | 6 parcours de formation                          |
| 15| Mini-jeu CTA                     | Pont vers `game/`                                |
| 16| FAQ                              | 5 questions fréquentes                           |
| — | Final CTA                        | Devis + WhatsApp + 4 canaux                     |
| — | Footer                           | Liens, promoteur, mentions                       |

## Conventions internes

- Chaque chaîne traduisible porte `data-fr="..." data-en="..."`. Le toggle FR/EN remplace `textContent` au runtime.
- Pour les chaînes contenant du HTML inline (gras, etc.), utiliser `data-fr-html` et `data-en-html`.
- Les logos sont remplacés selon le thème via les attributs `data-logo` (chemin racine) ou `data-logo-rel` (chemin `../`).
- Le grain de papier est en SVG inline en `body::before` (pas de fichier image).

## Migration React/Next.js

Voir [`MIGRATION.md`](./MIGRATION.md) — chaque section a un mapping direct vers un composant `components/sections/*`, le mini-jeu a une architecture déjà prête pour `useReducer`, le theming est compatible `next-themes`.

## Promoteur

**Georgeo AGBAHUNGBA** — Agroéconomiste & Software Engineer
contact@kijanilab.com · +229 01 67 65 97 17
