# BacIt

BacIt is a free, Romanian-language preparation platform for the Certiport **IT Specialist** exams — Python, Baze de date (databases), Rețelistică (networking), HTML5 and Dispozitive (device configuration) — built for students in Moldova.

Learners can:

- follow each course module by module, with curated video lessons and readings, and answer 5–10 questions right after every lesson;
- build a daily practice habit with a per-course goal (10/20/30 questions), a streak, and XP — mistakes come back first;
- take three timed exam simulations per course, weighted by exam domain, scored on Certiport's 0–1000 scale with a per-domain report and full answer review;
- search a glossary of exam terms with examples;
- track progress, exam history and flagged questions in their personal cabinet.

Progress is saved in the browser, so no account is needed.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router, file-based routes)
- Tailwind CSS 4 with shadcn/ui components and lucide icons
- TypeScript
- Deployed on Netlify via `@netlify/vite-plugin-tanstack-start`

## Running locally

Requires Node 22.13+ or 24+.

```bash
pnpm install
pnpm dev          # http://localhost:3000
# or, with Netlify emulation:
netlify dev
```

Other scripts: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`.

## Project layout

- `src/data/` — course catalogue, question bank and glossary
- `src/lib/progress.ts` — learner progress stored in `localStorage`
- `src/components/bacit/` — product UI (header, quiz engine, cards…)
- `src/routes/` — pages: `/`, `/cursuri`, `/cursuri/:id`, `/practica`, `/practica/:id`, `/simulari`, `/simulari/:id/:variant`, `/glosar`, `/cabinet`

## Roadmap

- **Grow the question bank** toward each course's target (500 Python, 300 Baze de date, 500 Rețelistică, 300 HTML5, 600 Dispozitive; ~180 today).
- **Accounts and sync** — optional sign-in (Netlify Identity) so progress follows the learner across devices, with progress stored in Netlify Database.
- **Teacher view** — classes, assignments and group progress for teachers.
- **Content admin** — edit courses, lessons and questions without code changes.
