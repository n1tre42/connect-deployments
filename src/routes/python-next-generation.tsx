import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  Code2,
  FlaskConical,
  ListChecks,
  Timer,
  Trophy,
} from 'lucide-react'
import { PageHeader } from '@/components/bacit/page-header'
import { PythonEditor } from '@/components/bacit/python-editor'
import { QuestionView } from '@/components/bacit/question-view'
import { QuizSession } from '@/components/bacit/quiz-session'
import { Button } from '@/components/ui/button'
import { pythonLabs } from '@/data/python-labs'
import { pythonNextModules } from '@/data/python-next'
import { questionsFor } from '@/data/questions'
import { useI18n } from '@/lib/i18n'
import { recordAnswer, recordExam, recordLab, useProgress } from '@/lib/progress'
import { isAnswered, isCorrect, type Answer } from '@/lib/quiz'
import { seededRandom, shuffle } from '@/lib/random'
import { runPython, type PythonResult } from '@/lib/python-runner'
import { cn } from '@/lib/utils'
type Mode = 'questions' | 'labs' | 'combined'
export const Route = createFileRoute('/python-next-generation')({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    mode: Mode
    lab?: string
  } => ({
    mode:
      search.mode === 'questions' || search.mode === 'combined' ? search.mode : 'labs',
    lab: typeof search.lab === 'string' ? search.lab.slice(0, 30) : undefined,
  }),
  head: () => ({ meta: [{ title: 'Python Next Generation · BacIt' }] }),
  component: PythonNextPage,
})
function PythonNextPage() {
  const { pick, t } = useI18n()
  const { mode, lab: labId } = Route.useSearch()
  const progress = useProgress()
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () =>
      shuffle(questionsFor('python-next-generation'), seededRandom(2026 + round)).slice(
        0,
        20,
      ),
    [round],
  )
  const lab = pythonLabs.find((x) => x.id === labId) ?? pythonLabs[0]
  const completed = pythonLabs.filter((x) => progress.labs[x.id]?.passed).length
  const modes = [
    {
      id: 'questions',
      label: pick('Întrebări', 'Questions'),
      icon: ListChecks,
    },
    { id: 'labs', label: pick('Laboratoare', 'Labs'), icon: Code2 },
    {
      id: 'combined',
      label: pick('Simulare combinată', 'Combined simulation'),
      icon: Timer,
    },
  ] as const
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={pick('Învață. Execută. Verifică.', 'Learn. Run. Check.')}
        title="Python Next Generation"
        description={pick(
          '137 de întrebări și 21 de laburi cu Python executabil. Simulare combinată sau practică separată.',
          '137 questions and 21 labs with executable Python. Combined simulation or separate practice.',
        )}
        actions={
          <Button asChild variant="outline">
            <Link to="/cursuri/$courseId" params={{ courseId: 'python-next-generation' }}>
              {pick('Lecții video', 'Video lessons')}
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          ['137', pick('întrebări originale', 'original questions')],
          ['21', pick('laburi executabile', 'executable labs')],
          [`${completed}/21`, pick('laburi rezolvate', 'labs completed')],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border bg-card p-4">
            <p className="text-2xl font-extrabold text-primary">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <nav
        className="mb-6 flex flex-wrap gap-2"
        aria-label={pick('Mod de practică', 'Practice mode')}
      >
        {modes.map((item) => (
          <Button
            asChild
            variant={mode === item.id ? 'default' : 'outline'}
            key={item.id}
          >
            <Link
              to="/python-next-generation"
              search={{ mode: item.id }}
              aria-current={mode === item.id ? 'page' : undefined}
            >
              <item.icon />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      {mode === 'questions' && (
        <section className="rounded-2xl border bg-card p-5 sm:p-8">
          <h2 className="mb-5 text-xl font-bold">
            {pick(
              'Practică separată — 20 de întrebări',
              'Separate practice — 20 questions',
            )}
          </h2>
          <QuizSession
            key={round}
            course="python-next-generation"
            questions={questions}
            onRestart={() => setRound((x) => x + 1)}
          />
        </section>
      )}
      {mode === 'labs' && (
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border bg-card p-3">
            <h2 className="flex items-center gap-2 p-2 font-bold">
              <FlaskConical className="size-4" />
              {pick('21 de laboratoare', '21 labs')}
            </h2>
            {pythonNextModules.map(([id, title]) => (
              <div key={id} className="mt-3">
                <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {t(title)}
                </h3>
                {pythonLabs
                  .filter((x) => x.module === id)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to="/python-next-generation"
                      search={{ mode: 'labs', lab: item.id }}
                      aria-current={item.id === lab.id ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent',
                        item.id === lab.id &&
                          'bg-accent font-semibold text-accent-foreground',
                      )}
                    >
                      {t(item.title)}
                      {progress.labs[item.id]?.passed && (
                        <Check className="size-4 shrink-0 text-success" />
                      )}
                    </Link>
                  ))}
              </div>
            ))}
          </aside>
          <PythonEditor key={lab.id} lab={lab} />
        </div>
      )}
      {mode === 'combined' && <CombinedSimulation />}
    </div>
  )
}
export function CombinedSimulation() {
  const { pick, t } = useI18n()
  const progress = useProgress()
  const [seed, setSeed] = useState(() => 7919)
  const questions = useMemo(
    () =>
      shuffle(questionsFor('python-next-generation'), seededRandom(seed)).slice(0, 12),
    [seed],
  )
  const labs = useMemo(
    () => shuffle(pythonLabs, seededRandom(seed + 1)).slice(0, 3),
    [seed],
  )
  const [phase, setPhase] = useState<
    'intro' | 'running' | 'submitting' | 'done' | 'error'
  >('intro')
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [codes, setCodes] = useState<Record<string, string>>({})
  const [deadline, setDeadline] = useState(0)
  const [seconds, setSeconds] = useState(45 * 60)
  const [index, setIndex] = useState(0)
  const [report, setReport] = useState<{
    correct: number
    labs: boolean[]
    errors: string[]
  } | null>(null)
  const submitting = useRef(false)
  const active = useRef<AbortController | null>(null)
  useEffect(() => () => active.current?.abort(), [])
  useEffect(() => {
    if (phase !== 'running') return
    const tick = () => setSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [phase, deadline])
  const submitRef = useRef<() => void>(() => {})
  useEffect(() => {
    submitRef.current = () => {
      void submit()
    }
  })
  useEffect(() => {
    if (phase === 'running' && seconds === 0) submitRef.current()
  }, [phase, seconds])
  function start() {
    submitting.current = false
    setAnswers({})
    setCodes({})
    setIndex(0)
    setReport(null)
    setSeconds(45 * 60)
    setDeadline(Date.now() + 45 * 60000)
    setPhase('running')
  }
  async function submit() {
    if (submitting.current) return
    submitting.current = true
    setPhase('submitting')
    const abort = new AbortController()
    active.current = abort
    const results: PythonResult[] = []
    for (const lab of labs) {
      if (abort.signal.aborted) return
      results.push(
        await runPython(codes[lab.id] ?? lab.starter, lab.tests, undefined, abort.signal),
      )
    }
    if (abort.signal.aborted) return
    if (results.some((r) => r.infrastructure)) {
      submitting.current = false
      setPhase('error')
      return
    }
    const correct = questions.filter((q) => isCorrect(q, answers[q.id])).length
    const passed = results.map((r) => !r.error && r.total > 0 && r.passed === r.total)
    questions.forEach((q) => recordAnswer(q.id, isCorrect(q, answers[q.id])))
    labs.forEach((lab, i) => {
      if (passed[i]) recordLab(lab.id, results[i].passed, results[i].total)
    })
    const totalCorrect = correct + passed.filter(Boolean).length
    recordExam({
      course: 'python-next-generation',
      variant: 1,
      kind: 'combined',
      percent: Math.round((totalCorrect / 15) * 100),
      correct: totalCorrect,
      total: 15,
      seconds: Math.min(
        45 * 60,
        Math.max(0, Math.round((Date.now() - (deadline - 45 * 60000)) / 1000)),
      ),
      domains: pythonNextModules.map(([module]) => ({
        module,
        correct:
          questions.filter((q) => q.module === module && isCorrect(q, answers[q.id]))
            .length + labs.filter((l, i) => l.module === module && passed[i]).length,
        total:
          questions.filter((q) => q.module === module).length +
          labs.filter((l) => l.module === module).length,
      })),
    })
    setReport({
      correct,
      labs: passed,
      errors: results.map((r) => r.error ?? ''),
    })
    setPhase('done')
  }
  const answered = questions.filter((q) => isAnswered(q, answers[q.id])).length
  const score = report
    ? Math.round(((report.correct + report.labs.filter(Boolean).length) / 15) * 100) * 10
    : 0
  if (phase === 'intro')
    return (
      <section className="space-y-5 rounded-2xl border bg-card p-6 sm:p-8">
        <Timer className="size-10 text-primary" />
        <h2 className="text-2xl font-bold">
          {pick(
            'Teorie și cod, într-o singură simulare',
            'Theory and code in one simulation',
          )}
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          {pick(
            '12 întrebări + 3 laboratoare · 45 de minute. Fiecare întrebare și laborator valorează un punct. Laboratorul primește punctul dacă trece toate testele. Rezultatele apar după predare. Progresul simulării curente nu se păstrează la reîncărcare.',
            '12 questions + 3 labs · 45 minutes. Each question and lab is worth one point. A lab earns its point when all tests pass. Results appear after submission. The current simulation is not saved if you reload.',
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {pick(
            'Pregătește conexiunea la internet pentru încărcarea Python. Apasă Rulează într-un laborator de practică pentru a verifica mediul înainte de simulare.',
            'Have an internet connection ready to load Python. Use Run in a practice lab to check the runtime before the simulation.',
          )}
        </p>
        <Button size="lg" onClick={start}>
          {pick('Începe simularea combinată', 'Start combined simulation')}
          <ArrowRight />
        </Button>
      </section>
    )
  if (phase === 'error')
    return (
      <section role="alert" className="space-y-4 rounded-2xl border bg-card p-6">
        <p>
          {pick(
            'Python nu s-a încărcat. Răspunsurile nu au fost punctate. Verifică conexiunea și reîncearcă verificarea.',
            'Python could not load. Your answers have not been scored. Check your connection and retry checking.',
          )}
        </p>
        <Button onClick={() => void submit()}>
          {pick('Reîncearcă verificarea', 'Retry checking')}
        </Button>
      </section>
    )
  if (phase === 'submitting')
    return (
      <p role="status" className="rounded-2xl border bg-card p-10 text-center">
        {pick(
          'Se verifică cele trei laboratoare Python…',
          'Checking the three Python labs…',
        )}
      </p>
    )
  if (phase === 'done' && report)
    return (
      <section className="space-y-6 rounded-2xl border bg-card p-6">
        <Trophy className="size-10 text-warning" />
        <h2 className="text-3xl font-extrabold">{score}/1000</h2>
        <p>
          {report.correct}/12 {pick('întrebări corecte', 'correct questions')} ·{' '}
          {report.labs.filter(Boolean).length}/3{' '}
          {pick('laboratoare rezolvate', 'labs completed')}
        </p>
        <p className={score >= 700 ? 'text-success' : 'text-destructive'}>
          {score >= 700
            ? pick('Promovat', 'Passed')
            : pick(
                'Mai exersează și încearcă din nou.',
                'Keep practicing and try again.',
              )}
        </p>
        <div className="space-y-2">
          {labs.map((lab, i) => (
            <div key={lab.id} className="rounded-xl border p-3">
              <p>
                {t(lab.title)} ·{' '}
                {report.labs[i]
                  ? pick('Rezolvat', 'Completed')
                  : pick('Nerezolvat', 'Incomplete')}
              </p>
              {report.errors[i] && (
                <pre className="mt-2 overflow-auto text-xs whitespace-pre-wrap text-destructive">
                  {report.errors[i]}
                </pre>
              )}
            </div>
          ))}
        </div>
        <details>
          <summary className="cursor-pointer font-semibold">
            {pick('Revizuiește întrebările', 'Review questions')}
          </summary>
          <div className="mt-4 space-y-8">
            {questions.map((q) => (
              <QuestionView
                key={q.id}
                question={q}
                answer={answers[q.id]}
                onChange={() => {}}
                revealed
              />
            ))}
          </div>
        </details>
        <Button
          onClick={() => {
            setSeed(seed + 7919 + progress.exams.length)
            setPhase('intro')
          }}
        >
          {pick('O nouă simulare', 'New simulation')}
        </Button>
      </section>
    )
  const current = index < 12 ? questions[index] : undefined
  const lab = index >= 12 ? labs[index - 12] : undefined
  return (
    <section className="space-y-5">
      <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
        <span className="font-mono text-lg font-bold" role="timer">
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </span>
        <span className="text-sm text-muted-foreground">
          {answered}/12 {pick('răspunsuri', 'answers')}
        </span>
        <Button onClick={() => void submit()}>
          {pick('Predă simularea', 'Submit simulation')}
        </Button>
      </div>
      <nav
        className="flex flex-wrap gap-2"
        aria-label={pick('Sarcinile simulării', 'Simulation tasks')}
      >
        {Array.from({ length: 15 }, (_, n) => (
          <Button
            key={n}
            size="sm"
            variant={index === n ? 'default' : 'outline'}
            onClick={() => setIndex(n)}
            aria-current={index === n ? 'step' : undefined}
          >
            {n < 12 ? n + 1 : `Lab ${n - 11}`}
          </Button>
        ))}
      </nav>
      {current && (
        <div className="rounded-2xl border bg-card p-5">
          <QuestionView
            key={current.id}
            question={current}
            answer={answers[current.id]}
            onChange={(value) => setAnswers((s) => ({ ...s, [current.id]: value }))}
            revealed={false}
          />
        </div>
      )}
      {lab && (
        <PythonEditor
          key={lab.id}
          lab={lab}
          simulation
          code={codes[lab.id] ?? lab.starter}
          onChange={(value) => setCodes((s) => ({ ...s, [lab.id]: value }))}
        />
      )}
      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          {pick('Înapoi', 'Back')}
        </Button>
        <Button disabled={index === 14} onClick={() => setIndex(index + 1)}>
          {pick('Următoarea', 'Next')}
          <ArrowRight />
        </Button>
      </div>
    </section>
  )
}
