import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Check, Code2, Download, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { courses, getCourse } from '@/data/courses'
import { questionsFor } from '@/data/questions'
import { pythonLabs } from '@/data/python-labs'
import { useI18n } from '@/lib/i18n'
import { answeredTodayTotal, mastery, setDailyGoal, useProgress } from '@/lib/progress'
export function LearningOverview() {
  const { pick, t } = useI18n()
  const progress = useProgress()
  const last = progress.lastLesson && getCourse(progress.lastLesson.course)
  const nextCourse =
    last ??
    courses.find((c) =>
      c.modules.some((m) => m.lessons.some((l) => !progress.watched[l.id])),
    ) ??
    courses[0]
  const lessons = nextCourse.modules.flatMap((m) => m.lessons)
  const nextLesson =
    lessons.find((l) => l.id === progress.lastLesson?.lesson) ??
    lessons.find((l) => !progress.watched[l.id]) ??
    lessons[0]
  const weak = courses
    .flatMap((course) =>
      course.modules.map((module) => {
        const ids = questionsFor(course.id, module.id).map((q) => q.id)
        const attempts = ids.filter((id) => progress.answers[id]).length
        return { course, module, attempts, percent: mastery(progress, ids) }
      }),
    )
    .filter((x) => x.attempts > 0)
    .sort((a, b) => a.percent - b.percent)[0]
  const doneLabs = pythonLabs.filter((l) => progress.labs[l.id]?.passed).length
  const nextLab = pythonLabs.find((l) => !progress.labs[l.id]?.passed) ?? pythonLabs[0]
  const today = answeredTodayTotal(progress)
  const todayGoal = progress.dailyGoal * courses.length
  function backup() {
    const blob = new Blob(
      [
        JSON.stringify(
          { version: 1, exportedAt: new Date().toISOString(), progress },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bacit-progress.json'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className="mb-6 space-y-5">
      <section className="grid gap-6 overflow-hidden rounded-3xl border bg-accent p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
            <BookOpen className="size-4" />
            {pick('Următorul tău pas', 'Your next step')}
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {t(nextCourse.title)}
          </h2>
          <p className="text-sm text-muted-foreground">{t(nextLesson.title)}</p>
          <Button asChild>
            <Link
              to="/cursuri/$courseId"
              params={{ courseId: nextCourse.id }}
              search={{ lectie: nextLesson.id }}
            >
              {pick('Continuă învățarea', 'Continue learning')}
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="min-w-52 space-y-3 rounded-2xl border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Target className="size-4 text-primary" />
            {pick('Obiectivul de azi', 'Today’s goal')}
          </p>
          <p className="text-2xl font-bold">
            {today}
            <span className="text-sm font-normal text-muted-foreground">
              {' '}
              / {todayGoal}
            </span>
          </p>
          <Progress value={Math.min(100, (today / todayGoal) * 100)} />
          <div className="flex gap-1">
            {[10, 20, 30].map((goal) => (
              <Button
                key={goal}
                size="sm"
                variant={progress.dailyGoal === goal ? 'default' : 'outline'}
                onClick={() => setDailyGoal(goal)}
                aria-pressed={progress.dailyGoal === goal}
              >
                {goal}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {pick('întrebări pe curs, pe zi', 'questions per course per day')}
          </p>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="space-y-3 rounded-2xl border bg-card p-5">
          <h2 className="flex items-center gap-2 font-bold">
            <Code2 className="size-5 text-primary" />
            Python Next Generation
          </h2>
          <p className="text-sm text-muted-foreground">
            {doneLabs}/21 {pick('laboratoare rezolvate', 'labs completed')}
          </p>
          <Progress value={(doneLabs / 21) * 100} />
          <Button asChild variant="outline" size="sm">
            <Link to="/python-next-generation" search={{ mode: 'labs', lab: nextLab.id }}>
              {doneLabs === 21 ? <Check /> : <ArrowRight />}
              {pick('Deschide laboratoarele', 'Open labs')}
            </Link>
          </Button>
        </section>
        <section className="space-y-3 rounded-2xl border bg-card p-5">
          <h2 className="font-bold">{pick('Concentrează-te pe', 'Focus on')}</h2>
          <p className="text-sm text-muted-foreground">
            {weak
              ? `${t(weak.course.title)} · ${t(weak.module.title)}`
              : pick(
                  'Începe o rundă pentru a primi recomandări bazate pe răspunsurile tale.',
                  'Complete a round to get recommendations based on your answers.',
                )}
          </p>
          <Button asChild variant="outline" size="sm">
            <Link
              to="/practica/$courseId"
              params={{ courseId: weak?.course.id ?? nextCourse.id }}
            >
              {pick('Exersează acum', 'Practice now')}
              <ArrowRight />
            </Link>
          </Button>
        </section>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {pick(
            'Datele tale sunt salvate în acest browser. Descarcă o copie pentru siguranță.',
            'Your data is saved in this browser. Download a copy for safekeeping.',
          )}
        </p>
        <Button size="sm" variant="outline" onClick={backup}>
          <Download />
          {pick('Exportă progresul', 'Export progress')}
        </Button>
      </div>
    </div>
  )
}
