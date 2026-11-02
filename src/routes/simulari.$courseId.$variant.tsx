import { useI18n } from '@/lib/i18n'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  CircleX,
  Clock,
  Flag,
  RotateCcw,
  Send,
  Trophy,
} from 'lucide-react'
import { CourseIcon } from '@/components/bacit/course-icon'
import { QuestionView } from '@/components/bacit/question-view'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { courseColor, getCourse, type Course } from '@/data/courses'
import type { Question } from '@/data/questions'
import { buildExam, examMinutes, examScore, examVariants } from '@/lib/exam'
import {
  recordAnswer,
  recordExam,
  toggleFlag,
  useProgress,
  type ExamRecord,
} from '@/lib/progress'
import { isAnswered, isCorrect, type Answer } from '@/lib/quiz'
import { cn } from '@/lib/utils'
export const Route = createFileRoute('/simulari/$courseId/$variant')({
  loader: ({ params }) => {
    const course = getCourse(params.courseId)
    const variant = Number(params.variant)
    if (!course || !examVariants.includes(variant as 1 | 2 | 3)) throw notFound()
    return { course, variant }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Simularea ${loaderData?.variant ?? ''} — ${loaderData?.course.title ?? ''} · BacIt`,
      },
    ],
  }),
  component: ExamPage,
})
type Phase = 'intro' | 'running' | 'done'
function ExamPage() {
  const { t } = useI18n()
  const { course, variant } = Route.useLoaderData()
  const questions = useMemo(() => buildExam(course, variant), [course, variant])
  const minutes = examMinutes(course, questions.length)
  const [phase, setPhase] = useState<Phase>('intro')
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<{
    record: ExamRecord
    answers: Record<string, Answer>
  } | null>(null)
  return (
    <div className="mx-auto max-w-content px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/simulari" hash={course.id}>
            <ArrowLeft />
            {t(' Simulări')}
          </Link>
        </Button>
      </div>
      <div className="mb-6 flex items-center gap-3">
        <CourseIcon course={course} />
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t(course.examTitle)}
            {t(' — Simularea ')}
            {t(variant)}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t(questions.length)}
            {t(' întrebări · ')}
            {t(minutes)}
            {t(' minute · promovare de la ')}
            {t(' ')}
            {t(examScore(course.exam.passPercent))}/1000
          </p>
        </div>
      </div>

      {t(
        phase === 'intro' && (
          <ExamIntro
            course={course}
            count={questions.length}
            minutes={minutes}
            onStart={() => setPhase('running')}
          />
        ),
      )}
      {t(
        phase === 'running' && (
          <ExamRunner
            key={attempt}
            course={course}
            variant={variant}
            questions={questions}
            minutes={minutes}
            onSubmit={(record, answers) => {
              setResult({ record, answers })
              setPhase('done')
              window.scrollTo({ top: 0 })
            }}
          />
        ),
      )}
      {t(
        phase === 'done' && result && (
          <ExamReport
            course={course}
            questions={questions}
            record={result.record}
            answers={result.answers}
            onRetry={() => {
              setAttempt((a) => a + 1)
              setResult(null)
              setPhase('running')
            }}
          />
        ),
      )}
    </div>
  )
}
function ExamIntro({
  course,
  count,
  minutes,
  onStart,
}: {
  course: Course
  count: number
  minutes: number
  onStart: () => void
}) {
  const { t } = useI18n()
  return (
    <section className="max-w-reading space-y-5 rounded-2xl border bg-card p-6 shadow-xs">
      <h2 className="text-lg font-bold">{t('Înainte să începi')}</h2>
      <ul className="grid gap-2 text-sm text-muted-foreground">
        <li>
          • {t(count)}
          {t(' întrebări din toate domeniile examenului, ponderate ca la Certiport.')}
        </li>
        <li>
          {t('• Ai ')}
          {t(minutes)}
          {t(' de minute. La final, examenul se predă automat.')}
        </li>
        <li>
          {t(
            '• Nu vezi răspunsurile corecte până la predare. Poți reveni la orice întrebare.',
          )}
        </li>
        <li>
          {t('• Promovezi cu ')}
          {t(course.exam.passPercent)}
          {t(' % răspunsuri corecte ( ')}
          {t(examScore(course.exam.passPercent))}/1000).
        </li>
      </ul>
      <Button size="lg" onClick={onStart}>
        <Clock />
        {t(' Începe simularea')}
      </Button>
    </section>
  )
}
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
function ExamRunner({
  course,
  variant,
  questions,
  minutes,
  onSubmit,
}: {
  course: Course
  variant: number
  questions: Question[]
  minutes: number
  onSubmit: (record: ExamRecord, answers: Record<string, Answer>) => void
}) {
  const { t, format } = useI18n()
  const progress = useProgress()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [confirming, setConfirming] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const total = minutes * 60
  const left = Math.max(0, total - elapsed)
  const submitted = useRef(false)
  function submit() {
    if (submitted.current) return
    submitted.current = true
    let correct = 0
    for (const q of questions) {
      const ok = isCorrect(q, answers[q.id])
      if (ok) correct++
      recordAnswer(q.id, ok)
    }
    const domains = course.modules.map((m) => {
      const inModule = questions.filter((q) => q.module === m.id)
      return {
        module: m.id,
        total: inModule.length,
        correct: inModule.filter((q) => isCorrect(q, answers[q.id])).length,
      }
    })
    const record = recordExam({
      course: course.id,
      variant,
      correct,
      total: questions.length,
      percent: Math.round((correct / questions.length) * 100),
      seconds: Math.min(elapsed, total),
      domains,
    })
    onSubmit(record, answers)
  }
  // The timer effect needs the latest submit() without restarting the interval.
  const submitRef = useRef(submit)
  useEffect(() => {
    submitRef.current = submit
  })
  useEffect(() => {
    const started = Date.now()
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - started) / 1000))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])
  useEffect(() => {
    if (left === 0) submitRef.current()
  }, [left])
  const question = questions[index]
  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length
  const flagged = !!progress.flagged[question.id]
  const moduleTitle = course.modules.find((m) => m.id === question.module)?.title
  const lowTime = left <= 5 * 60
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section className="min-w-0 space-y-5 rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-mono text-muted-foreground">
            {t('Întrebarea ')}
            {t(index + 1)}
            {t(' din ')}
            {t(questions.length)}
          </span>
          <span
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 font-mono font-semibold',
              lowTime ? 'bg-danger-soft text-destructive' : 'text-primary',
            )}
            role="timer"
            aria-label={format('Timp rămas {0}', [formatTime(left)])}
          >
            <Clock className="size-4" aria-hidden /> {t(formatTime(left))}
          </span>
        </div>
        <QuestionView
          key={question.id}
          question={question}
          answer={answers[question.id]}
          onChange={(a) => setAnswers((prev) => ({ ...prev, [question.id]: a }))}
          revealed={false}
          moduleTitle={moduleTitle}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFlag(question.id)}
            aria-pressed={flagged}
            className={cn(flagged && 'text-warning')}
          >
            <Flag className={cn(flagged && 'fill-current')} />
            {t(flagged ? 'Marcată pentru revizuire' : 'Marchează pentru revizuire')}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              <ArrowLeft />
              {t(' Înapoi')}
            </Button>
            {t(
              index + 1 < questions.length ? (
                <Button onClick={() => setIndex(index + 1)}>
                  {t('Următoarea ')}
                  <ArrowRight />
                </Button>
              ) : (
                <Button onClick={() => setConfirming(true)}>
                  <Send />
                  {t(' Predă examenul')}
                </Button>
              ),
            )}
          </div>
        </div>
      </section>

      <aside className="space-y-4 rounded-2xl border bg-card p-4 shadow-xs lg:sticky lg:top-20">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold">{t('Răspunsuri date')}</span>
            <span className="text-muted-foreground">
              {t(answeredCount)}/{t(questions.length)}
            </span>
          </div>
          <Progress
            value={(answeredCount / questions.length) * 100}
            className="h-1.5 bg-muted"
          />
        </div>
        <ol
          className="grid grid-cols-8 gap-1.5 lg:grid-cols-6"
          aria-label={t('Navigare întrebări')}
        >
          {questions.map((q, i) => {
            const done = isAnswered(q, answers[q.id])
            const marked = !!progress.flagged[q.id]
            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? 'step' : undefined}
                  aria-label={format('Întrebarea {0}{1}{2}', [
                    i + 1,
                    done ? ', răspunsă' : '',
                    marked ? ', marcată' : '',
                  ])}
                  className={cn(
                    'relative grid aspect-square w-full place-items-center rounded-md border text-xs font-semibold transition-colors motion-reduce:transition-none',
                    done && 'border-primary/40 bg-accent text-accent-foreground',
                    i === index && 'ring-2 ring-primary',
                  )}
                >
                  {t(i + 1)}
                  {t(
                    marked && (
                      <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-warning" />
                    ),
                  )}
                </button>
              </li>
            )
          })}
        </ol>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2.5 rounded-full bg-warning" />
          {t(' marcată pentru revizuire')}
        </p>
        <Button className="w-full" onClick={() => setConfirming(true)}>
          <Send />
          {t(' Predă examenul')}
        </Button>
      </aside>

      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Predai examenul?')}</DialogTitle>
            <DialogDescription>
              {t(
                answeredCount < questions.length
                  ? `Ai ${questions.length - answeredCount} întrebări fără răspuns. Ele vor fi considerate greșite.`
                  : 'Ai răspuns la toate întrebările. După predare vei vedea scorul și explicațiile.',
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              {t('Continuă examenul')}
            </Button>
            <Button onClick={submit}>{t('Predă acum')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
function ExamReport({
  course,
  questions,
  record,
  answers,
  onRetry,
}: {
  course: Course
  questions: Question[]
  record: ExamRecord
  answers: Record<string, Answer>
  onRetry: () => void
}) {
  const { t } = useI18n()
  const [onlyWrong, setOnlyWrong] = useState(true)
  const passed = record.percent >= course.exam.passPercent
  const score = examScore(record.percent)
  const color = courseColor(course)
  const reviewed = questions.filter((q) => !onlyWrong || !isCorrect(q, answers[q.id]))
  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-2xl border bg-card p-6 shadow-xs md:grid-cols-[auto_1fr]">
        <div className="text-center md:pr-6 md:border-r">
          <Trophy
            className={cn(
              'mx-auto size-10',
              passed ? 'text-warning' : 'text-muted-foreground',
            )}
            aria-hidden
          />
          <p className="mt-2 text-5xl font-extrabold tracking-tight">{t(score)}</p>
          <p className="text-sm text-muted-foreground">{t('din 1000')}</p>
          <p
            className={cn(
              'mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold',
              passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-destructive',
            )}
          >
            {t(passed ? 'Promovat' : 'Nepromovat')}
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">{t('Raport pe domenii')}</h2>
            <p className="text-sm text-muted-foreground">
              {t(record.correct)}
              {t(' din ')}
              {t(record.total)}
              {t(' corecte · timp folosit ')}
              {t(' ')}
              {t(formatTime(record.seconds))}
              {t(' · pragul de promovare ')}
              {t(' ')}
              {t(examScore(course.exam.passPercent))}
            </p>
          </div>
          <ul className="space-y-3">
            {record.domains
              .filter((d) => d.total > 0)
              .map((d) => {
                const module = course.modules.find((m) => m.id === d.module)
                const percent = Math.round((d.correct / d.total) * 100)
                return (
                  <li key={d.module} className="space-y-1">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="min-w-0 truncate">{t(module?.title)}</span>
                      <span className="shrink-0 font-semibold">
                        {t(d.correct)}/{t(d.total)} · {t(percent)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${percent}%`, background: color }}
                      />
                    </div>
                  </li>
                )
              })}
          </ul>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" onClick={onRetry}>
              <RotateCcw />
              {t(' Reia simularea')}
            </Button>
            <Button asChild variant="outline">
              <Link to="/practica/$courseId" params={{ courseId: course.id }}>
                {t('Exersează greșelile')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/cabinet">{t('Vezi cabinetul')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="font-bold">{t('Revizuire răspunsuri')}</h2>
          <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
            {[
              { value: true, label: 'Doar greșite' },
              { value: false, label: 'Toate' },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                aria-pressed={onlyWrong === opt.value}
                onClick={() => setOnlyWrong(opt.value)}
                className={cn(
                  'rounded-md px-3 py-1 font-medium',
                  onlyWrong === opt.value && 'bg-card shadow-xs',
                )}
              >
                {t(opt.label)}
              </button>
            ))}
          </div>
        </div>
        {t(
          reviewed.length === 0 ? (
            <p className="flex items-center justify-center gap-2 p-8 text-sm text-muted-foreground">
              <CircleCheck className="size-5 text-success" />
              {t(' Niciun răspuns greșit. Felicitări!')}
            </p>
          ) : (
            <ol>
              {reviewed.map((q) => {
                const n = questions.indexOf(q) + 1
                const ok = isCorrect(q, answers[q.id])
                return (
                  <li key={q.id} className="border-t p-5 first:border-t-0">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      {t(
                        ok ? (
                          <CircleCheck className="size-4 text-success" />
                        ) : (
                          <CircleX className="size-4 text-destructive" />
                        ),
                      )}
                      {t(' Întrebarea ')}
                      {t(n)}
                      {t(!isAnswered(q, answers[q.id]) && ' · fără răspuns')}
                    </p>
                    <QuestionView
                      question={q}
                      answer={answers[q.id]}
                      onChange={() => {}}
                      revealed
                      moduleTitle={course.modules.find((m) => m.id === q.module)?.title}
                    />
                  </li>
                )
              })}
            </ol>
          ),
        )}
      </section>
    </div>
  )
}
