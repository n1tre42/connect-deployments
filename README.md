# BacIt

BacIt is a free Romanian / English preparation platform for the Certiport **IT Specialist** exams, built for students in Moldova. Switch RO / EN in the header; your choice is saved in the browser.

Learners can:

- follow six courses with **34 video lessons of 15–20 minutes each**, with no external reading assignments, and answer questions after each lesson;
- practice **2,357 bilingual questions**, including 289 matching exercises, with filters by course, topic and format at `/exercitii`;
- review exam topics at `/obiective`, read RO/EN highlights under the videos and run Python examples at `/instrumente`;
- learn **Python Next Generation: 157 questions and 21 executable Python labs**;
- build a daily practice habit with a per-course goal (10/20/30 questions), a streak, and XP — mistakes come back first;
- take three timed practice simulations per course, with a BacIt practice score, a per-domain report and full answer review;
- search a glossary of exam terms with examples;
- continue learning, set daily goals, see recommended revision topics, track labs, edit a profile, export progress, and review exam history in their personal dashboard.

Progress is saved in the browser. To switch browsers or site addresses, export a JSON backup from the dashboard and import it at the new address.

## Python Next Generation

Open `/python-next-generation?mode=labs` for the 21 labs, or `?mode=questions` for question practice. Python runs in a dedicated Web Worker with pinned **Pyodide 314.0.7** from jsDelivr. The first run requires internet access. Run / Stop controls and automatic checks are provided; drafts are saved locally, and completing a lab awards 25 XP once.

The section-based rehearsal (`?mode=rehearsal`) has **16 questions, 7 labs, then 8 questions in 50 minutes**. Short practice (`?mode=combined`) has **12 questions and 3 labs in 45 minutes**. Each question or lab is worth one practice point. A lab passes when all its checks pass. Reloading the same tab restores the current attempt.

Execution stops after 10 seconds, with a separate 120-second runtime download timeout. This is a local learning environment, not a tamper-resistant certification service. Videos retain their original English audio and creator attribution.

Existing `bacit-progress-v1` data on the same site address is retained, with defaults merged for new lab fields.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router, file-based routes)
- Tailwind CSS 4 with shadcn/ui components and lucide icons
- TypeScript
- Nitro builds the server for Vercel

## Running locally

Requires Node 22.13+ or 24+.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`.

Set `BACIT_PYTHON` to your CPython executable on Windows. Linux defaults to `python3`. The content checks execute the Python questions and lab solutions, the SQL drills in SQLite, and the JavaScript drills.

## Project layout

- `src/data/` — course catalogue, question bank and glossary
- `src/lib/progress.ts` — learner progress stored in `localStorage`
- `src/lib/i18n.tsx`, `src/data/messages.ts` — language preference and UI translations
- `src/data/python-labs.ts`, `public/python-worker.js` — lab content and Python execution
- `docs/video-sources.json` — original video URLs, creators, actual durations and verification date (2026-11-02); availability and embed permissions may change
- `src/components/bacit/` — product UI (header, quiz engine, cards…)
- `src/routes/` — pages: `/`, `/cursuri`, `/cursuri/:id`, `/practica`, `/practica/:id`, `/simulari`, `/simulari/:id/:variant`, `/glosar`, `/cabinet`

## Roadmap

- **Review content** with students and deepen practice in individual exam subtopics.
- **Accounts and sync** — optional sign-in so progress can follow the learner across devices.
- **Teacher view** — classes, assignments and group progress for teachers.
- **Content admin** — edit courses, lessons and questions without code changes.
