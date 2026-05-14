# KijaniLab Website V2

Next.js 16 + Tailwind CSS + Firebase (free-tier friendly) for a multilingual agritech website.

## Included in V2

- FR/EN multilingual routing (`/fr`, `/en`)
- Award-style marketing home with 3D-inspired drone scene and interactive cards
- Dark and light mode
- Contact quote form + WhatsApp and phone channels
- Business pages: Services, Projects, Training, Impact, Glossary, Blog, About
- Auth (email/password) with Firebase
- User dashboard and admin training manager
- Structured agritech/agroeconomy content based on project docs

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill Firebase web config values in `.env.local`.

4. Run development server:

```bash
npm run dev
```

5. Validate:

```bash
npm run lint
npm run build
```

## Firebase quick notes

- Use Spark plan to start free.
- Create `users` and `trainings` collections in Firestore.
- First admin user: set `role: "admin"` in `users/<uid>` manually in Firestore console.

## Main routes

- `/fr` or `/en`
- `/fr/services`
- `/fr/projets`
- `/fr/formations`
- `/fr/auth`
- `/fr/dashboard`
- `/fr/admin`
