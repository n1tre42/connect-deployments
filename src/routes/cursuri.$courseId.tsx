import { useI18n } from '@/lib/i18n'
import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  ExternalLink,
  ListChecks,
  Timer,
} from 'lucide-react'
import { CourseIcon } from '@/components/bacit/course-icon'
import { QuizSession } from '@/components/bacit/quiz-session'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getCourse, type Course, type Lesson, type Module } from '@/data/courses'
import { questionsFor } from '@/data/questions'
import { mastery, rememberLesson, toggleWatched, useProgress } from '@/lib/progress'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import { cn } from '@/lib/utils'
export const Route = createFileRoute('/cursuri/$courseId')({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    lectie?: string
  } => ({
    lectie: typeof search.lectie === 'string' ? search.lectie.slice(0, 40) : undefined,
  }),
  loader: ({ params }) => {
    const course = getCourse(params.courseId)
    if (!course) throw notFound()
    return { course }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.course.title ?? 'Curs'} · BacIt` }],
  }),
  component: CoursePage,
})
function flattenLessons(course: Course) {
  return course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson) => ({ lesson, module, moduleIndex })),
  )
}
function CoursePage() {
  const { t } = useI18n()
  const { course } = Route.useLoaderData()
  const { lectie } = Route.useSearch()
  const progress = useProgress()
  const all = useMemo(() => flattenLessons(course), [course])
  const index = Math.max(
    0,
    all.findIndex((x) => x.lesson.id === lectie),
  )
  const current = all[index]
  const prev = all[index - 1]
  const next = all[index + 1]
  const watchedCount = all.filter((x) => progress.watched[x.lesson.id]).length
  const watched = !!progress.watched[current.lesson.id]
  useEffect(() => {
    rememberLesson(course.id, current.lesson.id)
  }, [course.id, current.lesson.id])
  return (
    <div className="mx-auto max-w-content px-4 py-6 sm:px-6">
      <nav aria-label={t('Navigare')} className="mb-3 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          {t('Acasă')}
        </Link>
        {t(' ')}/{t('')}
        <Link to="/cursuri" className="hover:text-foreground">
          {t('Cursuri')}
        </Link>
        {t(' ')}/ <span className="text-foreground">{t(course.title)}</span>
      </nav>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CourseIcon course={course} />
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t('Curs — ')}
              {t(course.title)}
            </h1>
            <p className="text-sm text-muted-foreground">{t(course.tagline)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {course.id === 'python-next-generation' && (
            <Button asChild variant="outline" size="sm">
              <Link to="/python-next-generation" search={{ mode: 'labs' }}>
                {t('21 laburi Python')}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <Link to="/practica/$courseId" params={{ courseId: course.id }}>
              <ListChecks />
              {t(' Practica zilnică')}
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/simulari" hash={course.id}>
              <Timer />
              {t(' Simulare examen')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section className="overflow-hidden rounded-2xl border bg-card shadow-xs">
            <LessonPlayer key={current.lesson.id} lesson={current.lesson} />
            <div className="flex flex-wrap items-start justify-between gap-4 p-5">
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {t('Modulul ')}
                  {t(current.moduleIndex + 1)} · {t(current.module.title)}
                </p>
                <h2 className="text-xl font-bold">{t(current.lesson.title)}</h2>
                <p className="text-xs text-muted-foreground">
                  {t(current.lesson.source)} · {t(current.lesson.duration)} ·{t('')}
                  {t(current.lesson.license)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={watched ? 'secondary' : 'outline'}
                  onClick={() => toggleWatched(current.lesson.id)}
                  aria-pressed={watched}
                  className={cn(watched && 'text-success')}
                >
                  <Check />
                  {t(watched ? 'Vizionată' : 'Marchează ca vizionată')}
                </Button>
                {t(
                  next && (
                    <Button asChild>
                      <Link
                        to="/cursuri/$courseId"
                        params={{ courseId: course.id }}
                        search={{ lectie: next.lesson.id }}
                      >
                        {t('Următoarea ')}
                        <ChevronRight />
                      </Link>
                    </Button>
                  ),
                )}
              </div>
            </div>
          </section>

          <LessonQuiz
            key={current.lesson.id}
            course={course}
            module={current.module}
            lesson={current.lesson}
            next={next?.lesson}
          />
          <ModuleResources module={current.module} />

          <div className="flex justify-between gap-3">
            {t(
              prev ? (
                <Button asChild variant="ghost">
                  <Link
                    to="/cursuri/$courseId"
                    params={{ courseId: course.id }}
                    search={{ lectie: prev.lesson.id }}
                  >
                    <ChevronLeft /> {t(prev.lesson.title)}
                  </Link>
                </Button>
              ) : (
                <span />
              ),
            )}
            {t(
              next && (
                <Button asChild variant="ghost">
                  <Link
                    to="/cursuri/$courseId"
                    params={{ courseId: course.id }}
                    search={{ lectie: next.lesson.id }}
                  >
                    {t(next.lesson.title)} <ChevronRight />
                  </Link>
                </Button>
              ),
            )}
          </div>
        </div>

        <aside className="rounded-2xl border bg-card shadow-xs lg:sticky lg:top-20">
          <div className="space-y-2 border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">{t('Conținutul cursului')}</h2>
              <span className="text-xs text-muted-foreground">
                {t(watchedCount)}/{t(all.length)}
                {t(' lecții')}
              </span>
            </div>
            <Progress
              value={(watchedCount / all.length) * 100}
              className="h-1.5 bg-muted"
            />
          </div>
          <ol className="max-h-[70vh] overflow-y-auto p-2">
            {course.modules.map((module, mi) => {
              const ids = questionsFor(course.id, module.id).map((q) => q.id)
              return (
                <li key={module.id} className="mb-2">
                  <div className="flex items-center justify-between gap-2 px-2 pt-2 pb-1">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {t(mi + 1)}. {t(module.title)}
                    </p>
                    <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
                      {t(mastery(progress, ids))}%
                    </span>
                  </div>
                  <ul>
                    {module.lessons.map((lesson) => {
                      const active = lesson.id === current.lesson.id
                      const done = !!progress.watched[lesson.id]
                      return (
                        <li key={lesson.id}>
                          <Link
                            to="/cursuri/$courseId"
                            params={{ courseId: course.id }}
                            search={{ lectie: lesson.id }}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent motion-reduce:transition-none',
                              active && 'bg-accent font-semibold text-accent-foreground',
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-muted-foreground',
                                done && 'border-success bg-success text-white',
                              )}
                            >
                              {t(
                                done ? (
                                  <Check className="size-3" />
                                ) : (
                                  <CirclePlay className="size-3" />
                                ),
                              )}
                            </span>
                            <span className="min-w-0 flex-1 leading-snug">
                              {t(lesson.title)}
                              <span className="block text-[11px] font-normal text-muted-foreground">
                                {t('Video · EN · ')}
                                {t(' ')}
                                {t(lesson.duration)}
                              </span>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ol>
        </aside>
      </div>
    </div>
  )
}
function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const { t, format } = useI18n()
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video bg-black">
      {t(
        playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?autoplay=1&rel=0`}
            title={t(lesson.title)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-inset"
            aria-label={format('Pornește videoclipul: {0}', [lesson.title])}
          >
            <img
              src={`https://i.ytimg.com/vi/${lesson.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-80"
            />
            <span className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-105 motion-reduce:transition-none">
              <CirclePlay className="size-8" />
            </span>
          </button>
        ),
      )}
    </div>
  )
}
function LessonQuiz({
  course,
  module,
  lesson,
  next,
}: {
  course: Course
  module: Module
  lesson: Lesson
  next?: Lesson
}) {
  const { t } = useI18n()
  const [round, setRound] = useState(0)
  const questions = useMemo(() => {
    const pool = questionsFor(course.id, module.id)
    return shuffle(pool, seededRandom(hashString(lesson.id) + round)).slice(
      0,
      Math.min(10, Math.max(5, pool.length)),
    )
  }, [course.id, module.id, lesson.id, round])
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold">{t('Verifică-te după lecție')}</h2>
        <p className="text-sm text-muted-foreground">
          {t(questions.length)}
          {t(' întrebări din modulul „ ')}
          {t(module.title)}”
        </p>
      </div>
      <QuizSession
        key={round}
        course={course.id}
        questions={questions}
        onRestart={() => setRound((r) => r + 1)}
        endActions={() =>
          next ? (
            <Button asChild>
              <Link
                to="/cursuri/$courseId"
                params={{ courseId: course.id }}
                search={{ lectie: next.id }}
              >
                Lecția următoare <ArrowRight />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/simulari" hash={course.id}>
                Treci la simulări <ArrowRight />
              </Link>
            </Button>
          )
        }
      />
    </section>
  )
}
function ModuleResources({ module }: { module: Module }) {
  const { t } = useI18n()
  const items = module.lessons.map((l) => ({
    title: l.title,
    format: 'VIDEO',
    url: l.url,
  }))
  return (
    <section className="rounded-2xl border bg-card shadow-xs">
      <h2 className="border-b px-5 py-4 text-sm font-bold">
        {t('Videoclipuri originale')}
      </h2>
      <ul>
        {items.map((item, i) => (
          <li
            key={item.url}
            className={cn(
              'flex items-center gap-3 px-5 py-3 text-sm',
              i > 0 && 'border-t',
            )}
          >
            <span className="inline-flex w-12 shrink-0 justify-center rounded bg-accent py-0.5 text-[10px] font-bold text-accent-foreground">
              {t(item.format)}
            </span>
            <CirclePlay className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="min-w-0 flex-1 truncate">{t(item.title)}</span>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              {t('Deschide ')}
              <ExternalLink className="size-3" />
              <span className="sr-only">{t('(filă nouă)')}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
