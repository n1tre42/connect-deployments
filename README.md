# BacIt

BacIt is a free Romanian / English preparation platform for the Certiport **IT Specialist** exams, built for students in Moldova. Switch RO / EN in the header; your choice is saved in the browser.

Learners can:

- follow six courses with **34 video lessons of 15–20 minutes each**, with no external reading assignments, and answer questions after each lesson;
- practice **296 original questions**, with a fresh bilingual bank for each course;
- learn **Python Next Generation: 137 questions and 21 executable Python labs**, with separate practice or a combined simulation;
- build a daily practice habit with a per-course goal (10/20/30 questions), a streak, and XP — mistakes come back first;
- take three timed exam simulations per course, weighted by exam domain, scored on Certiport's 0–1000 scale with a per-domain report and full answer review;
- search a glossary of exam terms with examples;
- continue learning, set daily goals, see recommended revision topics, track labs, edit a profile, export progress, and review exam history in their personal dashboard.

Progress is saved in the browser, so no account is needed.

## Python Next Generation

Open `/python-next-generation?mode=labs` for the 21 labs, or `?mode=questions` for question practice. Python runs in a dedicated Web Worker with pinned **Pyodide 314.0.7** from jsDelivr. The first run requires internet access. Run / Stop controls and automatic checks are provided; drafts are saved locally, and completing a lab awards 25 XP once.

The combined simulation (`?mode=combined`) has **12 questions + 3 labs, 45 minutes**. Each question or lab is worth one point; a lab passes only when all checks pass. Results and explanations appear after submission. A failed runtime download can be retried without recording an incorrect score. Current simulation answers are not restored after reloading; completed results are saved.

Execution stops after 10 seconds, with a separate 120-second runtime download timeout. This is a local learning environment, not a tamper-resistant certification service. Videos retain their original English audio and creator attribution.

Existing `bacit-progress-v1` data is retained, with defaults merged for new lab fields. New question and video IDs prevent previous answers from incorrectly counting toward the refreshed material. Progress is browser-local; there is no cross-device account sync.

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

On Windows, if the Netlify Deno emulator cannot start, set `BACIT_LOCAL_PREVIEW=1` before `pnpm dev` to run Vite without Netlify emulation. Production builds retain the Netlify plugin.

Set `BACIT_PYTHON` to your CPython executable to run executable-content verification on Windows. Linux defaults to `python3`. This check executes every code-output question against its declared answer and all 21 lab reference solutions against their tests. Other tests do not require a Python installation.

## Project layout

- `src/data/` — course catalogue, question bank and glossary
- `src/lib/progress.ts` — learner progress stored in `localStorage`
- `src/lib/i18n.tsx`, `src/data/messages.ts` — language preference and UI translations
- `src/data/python-labs.ts`, `public/python-worker.js` — lab content and Python execution
- `docs/video-sources.json` — original video URLs, creators, actual durations and verification date (2026-11-02); availability and embed permissions may change
- `src/components/bacit/` — product UI (header, quiz engine, cards…)
- `src/routes/` — pages: `/`, `/cursuri`, `/cursuri/:id`, `/practica`, `/practica/:id`, `/simulari`, `/simulari/:id/:variant`, `/glosar`, `/cabinet`

## Roadmap

- **Grow the question bank** beyond the current 296 questions toward each course's target.
- **Accounts and sync** — optional sign-in (Netlify Identity) so progress follows the learner across devices, with progress stored in Netlify Database.
- **Teacher view** — classes, assignments and group progress for teachers.
- **Content admin** — edit courses, lessons and questions without code changes.
