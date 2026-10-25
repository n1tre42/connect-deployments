import { useEffect, useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowRight, Check, ChevronLeft, Flame } from 'lucide-react'

import { CourseIcon } from '@/components/bacit/course-icon'
import { GoalRing } from '@/components/bacit/goal-ring'
import { QuizSession } from '@/components/bacit/quiz-session'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { courseColor, getCourse } from '@/data/courses'
import { questionsFor, type Question } from '@/data/questions'
import {
  answeredToday,
  getProgress,
  streak,
  useProgress,
  type ProgressState,
} from '@/lib/progress'
import { shuffle } from '@/lib/random'

export const Route = createFileRoute('/practica/$courseId')({
  loader: ({ params }) => {
    const course = getCourse(params.courseId)
    if (!course) throw notFound()
    return { course }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Practica zilnică — ${loaderData?.course.title ?? ''} · BacIt` }],
  }),
  component: PracticeCoursePage,
})

function remainingToday(s: ProgressState, courseId: string) {
  return Math.max(0, s.dailyGoal - answeredToday(s, courseId))
}

/** Up to 10 questions: previous mistakes first, then unseen, then the oldest correct ones. */
function buildRound(s: ProgressState, courseId: string): Question[] {
  const size = Math.min(10, remainingToday(s, courseId))
  const pool = shuffle(questionsFor(courseId))
  const wrong = pool.filter((q) => s.answers[q.id] && !s.answers[q.id].correct)
  const unseen = pool.filter((q) => !s.answers[q.id])
  const known = pool
    .filter((q) => s.answers[q.id]?.correct)
    .sort((a, b) => s.answers[a.id].at - s.answers[b.id].at)
  return [...wrong, ...unseen, ...known].slice(0, size)
}

function PracticeCoursePage() {
  const { course } = Route.useLoaderData()
  const progress = useProgress()
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [round, setRound] = useState(0)

  // The round depends on saved progress, which only exists in the browser.
  useEffect(() => {
    setQuestions(buildRound(getProgress(), course.id))
  }, [course.id, round])

  const done = answeredToday(progress, course.id)
  const left = remainingToday(progress, course.id)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/practica">
            <ChevronLeft /> Practica zilnică
          </Link>
        </Button>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-1 text-streak">
            <Flame className="size-4" aria-hidden /> {streak(progress)} zile
          </span>
          <GoalRing value={done} max={progress.dailyGoal} size={44} color={courseColor(course)}>
            <span className="text-[10px]">{done}</span>
          </GoalRing>
        </div>
      </div>
      <div className="mb-5 flex items-center gap-3">
        <CourseIcon course={course} />
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            {course.title} — runda {round + 1}
          </h1>
          <p className="text-sm text-muted-foreground">
            {done} din {progress.dailyGoal} întrebări azi
          </p>
        </div>
      </div>
      <section className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6">
        {questions === null ? (
          <div className="space-y-4" aria-label="Se încarcă">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : questions.length === 0 ? (
          <div className="space-y-4 py-6 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-success-soft text-success">
              <Check className="size-7" />
            </span>
            <p className="text-2xl font-extrabold">Obiectivul de azi este atins!</p>
            <p className="text-muted-foreground">
              Ai răspuns la {done} întrebări la {course.title}. Revino mâine pentru a-ți
              păstra seria.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="outline">
                <Link to="/practica">Alt curs</Link>
              </Button>
              <Button asChild>
                <Link to="/simulari" hash={course.id}>
                  Încearcă o simulare
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <QuizSession
            key={round}
            course={course.id}
            questions={questions}
            daily
            endActions={() =>
              left > 0 ? (
                <Button onClick={() => setRound((r) => r + 1)}>
                  Runda următoare <ArrowRight />
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/practica">
                    <Check /> Gata pe azi
                  </Link>
                </Button>
              )
            }
          />
        )}
      </section>
    </div>
  )
}
