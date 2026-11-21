import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, FileCode2, Clock, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { QuestionView } from './question-view'
import { PythonEditor } from './python-editor'
import { useI18n } from '@/lib/i18n'
import { buildNgRehearsal, ngFormats } from '@/lib/ng-rehearsal'
import { runPython, type PythonResult } from '@/lib/python-runner'
import { isAnswered, isCorrect, type Answer } from '@/lib/quiz'
import { recordAnswer, recordExam, recordLab } from '@/lib/progress'
import { z } from 'zod'

const answerSchema = z.union([z.array(z.string()), z.record(z.string(), z.string())])
const draftSchema = z.object({
  version: z.literal(1),
  bank: z.literal('expanded').optional(),
  seed: z.number().int(),
  phase: z.enum(['first', 'labs', 'last', 'loading', 'loadError']),
  index: z.number().int().min(0).max(30),
  deadline: z.number().finite(),
  remaining: z.number().int().min(0).max(3000),
  answers: z.record(z.string(), answerSchema),
  codes: z.record(z.string(), z.string().max(100_000)),
  completed: z.array(z.string()).max(21),
})
type Attempt = z.infer<typeof draftSchema>
type Report = { correct: number; total: number; passed: boolean[]; errors: string[] }
export function NgRehearsal({ kind }: { kind: 'exam' | 'short' }) {
  const { pick, t } = useI18n()
  const [seed, setSeed] = useState(7919)
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [remaining, setRemaining] = useState((ngFormats[kind].minutes * 60) as number)
  const [report, setReport] = useState<Report | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const active = useRef<AbortController | null>(null)
  const submitting = useRef(false)
  const submitRef = useRef<() => void>(() => {})
  const planSeed = attempt?.seed ?? seed
  const legacy = !!attempt && !attempt.bank
  const plan = useMemo(
    () => buildNgRehearsal(planSeed, kind, legacy),
    [planSeed, kind, legacy],
  )
  const key = 'bacit-ng-attempt-' + kind
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key)
      if (raw) {
        const value = draftSchema.parse(JSON.parse(raw))
        if (value.phase === 'loading') value.phase = 'loadError'
        // Hydration of external browser storage; server and first client render remain identical.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAttempt(value)
        setSeed(value.seed)
        setRemaining(value.remaining)
      }
    } catch {
      // Saving is optional when the browser blocks session storage.
    }
    setHydrated(true)
  }, [key])
  useEffect(() => {
    if (!hydrated) return
    try {
      if (attempt && !report) sessionStorage.setItem(key, JSON.stringify(attempt))
      else sessionStorage.removeItem(key)
    } catch {
      /* A storage failure does not interrupt the current attempt. */
    }
  }, [attempt, hydrated, key, report])
  useEffect(() => () => active.current?.abort(), [])
  useEffect(() => {
    if (!attempt || busy || attempt.phase === 'loading' || attempt.phase === 'loadError')
      return
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000)))
    tick()
    const timer = setInterval(tick, 500)
    return () => clearInterval(timer)
  }, [attempt, busy])
  function start() {
    submitting.current = false
    setError('')
    setReport(null)
    setRemaining(plan.format.minutes * 60)
    setAttempt({
      version: 1,
      bank: 'expanded',
      seed,
      phase: 'first',
      index: 0,
      deadline: Date.now() + plan.format.minutes * 60000,
      remaining: plan.format.minutes * 60,
      answers: {},
      codes: {},
      completed: [],
    })
  }
  function update(next: Partial<Attempt>) {
    setAttempt((previous) => (previous ? { ...previous, ...next } : previous))
  }
  async function loadLabs() {
    if (!attempt) return
    const paused =
      attempt.phase === 'loadError'
        ? attempt.remaining
        : Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000))
    update({ phase: 'loading', remaining: paused, index: 0 })
    setError('')
    const controller = new AbortController()
    active.current = controller
    const result = await runPython('print("ready")', [], undefined, controller.signal)
    if (controller.signal.aborted) return
    if (result.infrastructure || result.error) {
      update({ phase: 'loadError', remaining: paused })
      setError(
        pick(
          'Laboratorul nu s-a încărcat. Timpul este oprit; răspunsurile sunt păstrate.',
          'The lab did not load. The timer is paused; your answers are preserved.',
        ),
      )
      return
    }
    setRemaining(paused)
    update({
      phase: 'labs',
      deadline: Date.now() + paused * 1000,
      remaining: paused,
      index: 0,
    })
  }
  async function submit() {
    if (!attempt || submitting.current) return
    submitting.current = true
    setBusy(true)
    setError('')
    setConfirm(false)
    const controller = new AbortController()
    active.current = controller
    const results: PythonResult[] = []
    for (const lab of plan.labs) {
      const value = await runPython(
        attempt.codes[lab.id] ?? lab.starter,
        lab.tests,
        undefined,
        controller.signal,
      )
      if (controller.signal.aborted) return
      results.push(value)
      if (value.infrastructure) {
        setBusy(false)
        submitting.current = false
        setError(
          pick(
            'Verificarea Python nu a putut fi finalizată. Nu s-a înregistrat un rezultat greșit. Reîncearcă predarea.',
            'Python verification could not finish. No failed result was recorded. Retry submission.',
          ),
        )
        return
      }
    }
    const passed = results.map((r) => !r.error && r.total > 0 && r.passed === r.total)
    const correct =
      plan.questions.filter((q) => isCorrect(q, attempt.answers[q.id])).length +
      passed.filter(Boolean).length
    const total = plan.questions.length + plan.labs.length
    plan.questions.forEach((q) => recordAnswer(q.id, isCorrect(q, attempt.answers[q.id])))
    plan.labs.forEach((l, i) => {
      if (passed[i]) recordLab(l.id, results[i].passed, results[i].total)
    })
    recordExam({
      course: 'python-next-generation',
      variant: kind === 'exam' ? 2 : 1,
      kind: 'combined',
      percent: Math.round((correct / total) * 100),
      correct,
      total,
      seconds: Math.max(0, plan.format.minutes * 60 - remaining),
      domains: [
        ...new Set([
          ...plan.questions.map((q) => q.module),
          ...plan.labs.map((l) => l.module),
        ]),
      ].map((module) => ({
        module,
        total:
          plan.questions.filter((q) => q.module === module).length +
          plan.labs.filter((l) => l.module === module).length,
        correct:
          plan.questions.filter(
            (q) => q.module === module && isCorrect(q, attempt.answers[q.id]),
          ).length + plan.labs.filter((l, i) => l.module === module && passed[i]).length,
      })),
    })
    setReport({ correct, total, passed, errors: results.map((r) => r.error ?? '') })
    setBusy(false)
    setAttempt(null)
  }
  async function advance() {
    setConfirm(false)
    if (!attempt) return
    if (attempt.phase === 'first') await loadLabs()
    else if (attempt.phase === 'labs' && plan.format.last)
      update({ phase: 'last', index: 0 })
    else await submit()
  }
  useEffect(() => {
    submitRef.current = () => {
      void submit()
    }
  })
  useEffect(() => {
    if (
      attempt &&
      remaining === 0 &&
      !busy &&
      !report &&
      attempt.phase !== 'loadError' &&
      attempt.phase !== 'loading'
    )
      submitRef.current()
  }, [attempt, remaining, busy, report])
  if (report)
    return (
      <section className="space-y-5 rounded-2xl border bg-card p-6">
        <h2 className="text-2xl font-bold">
          {pick('Rezultatul antrenamentului', 'Practice result')}
        </h2>
        <p className="text-4xl font-extrabold text-primary">
          {report.correct}/{report.total}{' '}
          <span className="text-xl">
            · {Math.round((report.correct / report.total) * 100)}%
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          {pick(
            'Punctaj BacIt cu pondere egală pe sarcină, pentru studiu. Nu reproduce formula normalizată a examenului Certiport.',
            'BacIt study points with equal task weights. This does not reproduce the Certiport scaled scoring formula.',
          )}
        </p>
        <ul className="space-y-2">
          {plan.labs.map((lab, i) => (
            <li key={lab.id} className="rounded-lg border p-3 text-sm">
              {report.passed[i] ? '✓' : '○'} {t(lab.title)}
              {report.errors[i] && (
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-destructive">
                  {report.errors[i]}
                </pre>
              )}
            </li>
          ))}
        </ul>
        <details>
          <summary className="cursor-pointer font-semibold">
            {pick('Explicațiile întrebărilor', 'Question explanations')}
          </summary>
          <ul className="mt-3 space-y-3">
            {plan.questions.map((q) => (
              <li key={q.id} className="rounded-lg border p-3 text-sm">
                <p className="font-bold">{t(q.text)}</p>
                <p className="mt-1 text-muted-foreground">{t(q.explanation)}</p>
              </li>
            ))}
          </ul>
        </details>
        <Button
          onClick={() => {
            setReport(null)
            setSeed((s) => s + 1)
          }}
        >
          <RotateCcw />
          {pick('Variantă nouă', 'New variant')}
        </Button>
      </section>
    )
  if (!attempt)
    return (
      <section className="space-y-5 rounded-2xl border bg-card p-6">
        <h2 className="text-2xl font-bold">
          {kind === 'exam'
            ? pick('Repetiție Python NG pe secțiuni', 'Section-based Python NG rehearsal')
            : pick('Antrenament scurt combinat', 'Short combined practice')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [
              String(plan.format.first),
              pick('întrebări · secțiunea 1', 'questions · section 1'),
            ],
            [String(plan.format.labs), pick('sarcini Python', 'Python tasks')],
            [
              plan.format.last ? String(plan.format.last) : '—',
              pick('întrebări · secțiunea 2', 'questions · section 2'),
            ],
          ].map(([n, label]) => (
            <div key={label} className="rounded-xl bg-accent p-4">
              <strong className="text-3xl text-primary">{n}</strong>
              <p className="mt-1 text-sm">{label}</p>
            </div>
          ))}
        </div>
        <p>
          {plan.format.minutes}{' '}
          {pick(
            'minute. Confirmi finalizarea fiecărei secțiuni; apoi nu mai poți reveni. Timpul se oprește la încărcarea laboratorului.',
            'minutes. Confirm each section before proceeding; then you cannot return. The timer pauses while the lab loads.',
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {pick(
            'Repetiția urmărește forma din tutorialul public, nu o bază de întrebări oficiale. Laboratorul BacIt rulează în browser, cu fișiere de sarcini și zone protejate; exersează și lucrul în VS Code înainte de examen.',
            'The rehearsal follows the public tutorial format, not an official question bank. The BacIt lab runs in the browser with task files and protected regions; also practice using VS Code before your exam.',
          )}
        </p>
        <a
          href="https://certiport.pearsonvue.com/Educator-resources/Exam-details/Exam-tutorials/IT_Specialist_PythonNG_Tutorial.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-primary underline"
        >
          {pick(
            'Tutorial oficial · forma poate varia',
            'Official tutorial · actual forms may vary',
          )}
        </a>
        <p className="text-xs text-muted-foreground">
          {pick(
            'Încercarea se păstrează în această filă la reîncărcare. Închiderea filei poate elimina încercarea curentă.',
            'The attempt is retained in this tab across reloads. Closing the tab can remove the current attempt.',
          )}
        </p>
        <Button onClick={start} disabled={!hydrated}>
          <Clock />
          {pick('Începe antrenamentul', 'Start practice')}
        </Button>
      </section>
    )
  const first = attempt.phase === 'first'
  const inLab = attempt.phase === 'labs'
  const loading = attempt.phase === 'loading' || attempt.phase === 'loadError'
  const questions = first
    ? plan.questions.slice(0, plan.format.first)
    : plan.questions.slice(plan.format.first)
  const current = questions[attempt.index]
  const lab = plan.labs[attempt.index] ?? plan.labs[0]
  const prefix =
    '# DO NOT MODIFY: BacIt task ' + lab.id + '\n# Add your solution below this line.\n'
  const code = attempt.codes[lab.id] ?? prefix + lab.starter
  return (
    <section className="space-y-5">
      <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
        <span className="font-mono text-lg font-bold" role="timer">
          {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
        </span>
        <span className="text-sm">
          {first
            ? pick('Secțiunea 1', 'Section 1')
            : inLab
              ? pick('Laborator', 'Lab')
              : loading
                ? pick('Încărcare · timp oprit', 'Loading · timer paused')
                : pick('Secțiunea 2', 'Section 2')}
        </span>
        <Button disabled={busy || loading} onClick={() => setConfirm(true)}>
          {pick('Finalizează secțiunea', 'Finish section')}
          <ArrowRight />
        </Button>
      </div>
      {error && (
        <p role="alert" className="rounded-xl bg-danger-soft p-4 text-sm">
          {error}
          {attempt.phase === 'loadError' ? (
            <Button className="ml-3" variant="outline" onClick={() => void loadLabs()}>
              {pick('Reîncearcă încărcarea', 'Retry loading')}
            </Button>
          ) : (
            <Button className="ml-3" variant="outline" onClick={() => void submit()}>
              {pick('Reîncearcă predarea', 'Retry submission')}
            </Button>
          )}
        </p>
      )}
      {loading ? (
        <p role="status" className="rounded-xl border p-8">
          {pick(
            'Pregătim Python. Răspunsurile sunt păstrate.',
            'Preparing Python. Answers are preserved.',
          )}
        </p>
      ) : busy ? (
        <p role="status" className="rounded-xl border p-8">
          {pick('Se verifică soluțiile Python…', 'Verifying Python solutions…')}
        </p>
      ) : inLab ? (
        <div className="grid items-start gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-2 rounded-xl border bg-card p-3">
            <h2 className="mb-3 px-2 font-semibold">
              {pick('Fișiere de sarcini', 'Task files')}
            </h2>
            {plan.labs.map((l, i) => (
              <Button
                key={l.id}
                variant={i === attempt.index ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => update({ index: i })}
              >
                <FileCode2 />
                task-{i + 1}.py
                {attempt.completed.includes(l.id) && (
                  <Check className="ml-auto size-4 text-success" />
                )}
              </Button>
            ))}
          </aside>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              {pick(
                'Antet protejat: păstrează liniile DO NOT MODIFY. Marcarea drept finalizat este o notă personală, nu verificarea corectitudinii.',
                'Protected header: keep the DO NOT MODIFY lines. Marking complete is a personal note, not a correctness check.',
              )}
            </p>
            {codeError && (
              <p role="alert" className="text-sm text-destructive">
                {codeError}
              </p>
            )}
            <PythonEditor
              key={lab.id}
              lab={lab}
              simulation
              code={code}
              onChange={(value) => {
                if (!value.startsWith(prefix)) {
                  setCodeError(
                    pick(
                      'Păstrează antetul protejat. Modifică doar soluția de sub el.',
                      'Keep the protected header. Edit only the solution below it.',
                    ),
                  )
                  return
                }
                setCodeError('')
                update({ codes: { ...attempt.codes, [lab.id]: value } })
              }}
            />
            <Button
              variant="outline"
              aria-pressed={attempt.completed.includes(lab.id)}
              onClick={() =>
                update({
                  completed: attempt.completed.includes(lab.id)
                    ? attempt.completed.filter((id) => id !== lab.id)
                    : [...attempt.completed, lab.id],
                })
              }
            >
              <Check />
              {pick('Marchează drept finalizat', 'Mark complete')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <nav
            className="flex flex-wrap gap-2"
            aria-label={pick('Întrebările secțiunii', 'Section questions')}
          >
            {questions.map((q, i) => (
              <Button
                key={q.id}
                size="sm"
                variant={
                  i === attempt.index
                    ? 'default'
                    : isAnswered(q, attempt.answers[q.id])
                      ? 'secondary'
                      : 'outline'
                }
                aria-current={i === attempt.index ? 'step' : undefined}
                onClick={() => update({ index: i })}
              >
                {i + 1}
              </Button>
            ))}
          </nav>
          {current && (
            <div className="rounded-2xl border bg-card p-5">
              <QuestionView
                key={current.id}
                question={current}
                answer={attempt.answers[current.id] as Answer | undefined}
                onChange={(a) =>
                  update({ answers: { ...attempt.answers, [current.id]: a } })
                }
                revealed={false}
              />
            </div>
          )}
        </div>
      )}
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pick('Finalizezi această secțiune?', 'Finish this section?')}
            </DialogTitle>
            <DialogDescription>
              {pick(
                'După confirmare, răspunsurile secțiunii sunt blocate. Nu poți reveni. Întrebările fără răspuns rămân necompletate.',
                'After confirmation, this section is locked. You cannot return. Unanswered questions remain unanswered.',
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              {pick('Continuă lucrul', 'Keep working')}
            </Button>
            <Button onClick={() => void advance()}>
              {pick('Confirmă și continuă', 'Confirm and continue')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
