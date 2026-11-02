import { useI18n } from '@/lib/i18n'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Flame, Lock, Target, Zap } from 'lucide-react'
import { CourseIcon } from '@/components/bacit/course-icon'
import { GoalRing } from '@/components/bacit/goal-ring'
import { PageHeader } from '@/components/bacit/page-header'
import { Button } from '@/components/ui/button'
import { courseColor, courses, type Course } from '@/data/courses'
import { questionsFor } from '@/data/questions'
import {
  answeredToday,
  answeredTodayTotal,
  history,
  mastery,
  setDailyGoal,
  streak,
  useProgress,
} from '@/lib/progress'
import { cn } from '@/lib/utils'
export const Route = createFileRoute('/practica/')({
  head: () => ({ meta: [{ title: 'Practica zilnică · BacIt' }] }),
  component: PracticePage,
})
const goals = [10, 20, 30]
function PracticePage() {
  const { t, format, locale } = useI18n()
  const progress = useProgress()
  const days = streak(progress)
  const week = history(progress, 7, locale)
  const today = answeredTodayTotal(progress)
  const possible = progress.dailyGoal * courses.length
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={t('Practica zilnică')}
        title={t('Câte puțin, în fiecare zi')}
        description={format(
          'Răspunde la până la {0} de întrebări pe zi în fiecare curs. Greșelile revin primele, apoi întrebările noi — așa progresul se adună singur.',
          [progress.dailyGoal],
        )}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-[color-mix(in_oklch,var(--streak)_15%,transparent)] text-streak">
              <Flame className="size-8" aria-hidden />
            </span>
            <div>
              <p className="text-3xl font-extrabold">
                {t(days)}
                {t(' zile')}
              </p>
              <p className="text-sm text-muted-foreground">{t('seria curentă')}</p>
            </div>
          </div>
          <ol className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[11px]">
            {week.map((d) => (
              <li key={d.day} className="space-y-1">
                <span
                  className={cn(
                    'mx-auto grid size-8 place-items-center rounded-full border',
                    d.count > 0 && 'border-streak bg-streak text-white',
                  )}
                >
                  {d.count > 0 ? <Flame className="size-4" /> : null}
                </span>
                <span className="text-muted-foreground capitalize">{t(d.label)}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-4">
            <GoalRing value={today} max={possible} size={72}>
              {t(today)}
            </GoalRing>
            <div>
              <p className="text-lg font-bold">{t('Răspunsuri azi')}</p>
              <p className="text-sm text-muted-foreground">
                {t('din ')}
                {t(possible)}
                {t(' posibile în toate cursurile')}
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Zap className="size-4" aria-hidden /> {t(progress.xp)}
            {t(' XP în total · +10 XP pentru fiecare răspuns corect')}
          </p>
        </div>

        <fieldset className="rounded-2xl border bg-card p-5 shadow-xs">
          <legend className="sr-only">{t('Obiectivul zilnic')}</legend>
          <p className="flex items-center gap-2 font-bold">
            <Target className="size-5 text-primary" aria-hidden />
            {t(' Obiectiv pe curs, pe zi')}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {goals.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setDailyGoal(goal)}
                aria-pressed={progress.dailyGoal === goal}
                className={cn(
                  'rounded-xl border-2 px-2 py-3 text-center transition-colors motion-reduce:transition-none',
                  progress.dailyGoal === goal
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'hover:border-primary/40',
                )}
              >
                <span className="block text-2xl font-extrabold">{t(goal)}</span>
                <span className="text-xs text-muted-foreground">
                  {t(goal === 10 ? 'lejer' : goal === 20 ? 'constant' : 'intens')}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold">{t('Cursurile tale de azi')}</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => {
          const done = answeredToday(progress, course.id)
          const complete = done >= progress.dailyGoal
          const ids = questionsFor(course.id).map((q) => q.id)
          return (
            <li
              key={course.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border bg-card p-5 shadow-xs"
            >
              <GoalRing value={done} max={progress.dailyGoal} color={courseColor(course)}>
                {t(
                  complete ? (
                    <Check className="size-5 text-success" />
                  ) : (
                    `${done}/${progress.dailyGoal}`
                  ),
                )}
              </GoalRing>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <CourseIcon course={course} className="size-7 rounded-lg" />
                  <h3 className="font-bold">{t(course.title)}</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('Stăpânire ')}
                  {t(mastery(progress, ids))}% · {t(ids.length)}
                  {t(' întrebări în bancă')}
                </p>
                <ModuleSteps course={course} />
              </div>
              {t(
                complete ? (
                  <Button variant="secondary" disabled>
                    <Lock />
                    {t(' Revino mâine')}
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/practica/$courseId" params={{ courseId: course.id }}>
                      {t(done ? 'Continuă' : 'Începe')}
                    </Link>
                  </Button>
                ),
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
function ModuleSteps({ course }: { course: Course }) {
  const { t, format } = useI18n()
  const progress = useProgress()
  const color = courseColor(course)
  return (
    <ol className="mt-3 flex items-center gap-1" aria-label={t('Progres pe module')}>
      {course.modules.map((module, i) => {
        const percent = mastery(
          progress,
          questionsFor(course.id, module.id).map((q) => q.id),
        )
        return (
          <li
            key={module.id}
            className="flex items-center gap-1"
            title={format('{0}: {1}%', [module.title, percent])}
          >
            {i > 0 && <span className="h-0.5 w-3 rounded bg-border" aria-hidden />}
            <span
              className="grid size-6 place-items-center rounded-full border-2 text-[10px] font-bold"
              style={{
                borderColor: color,
                background:
                  percent >= 80
                    ? color
                    : `color-mix(in oklch, ${color} ${Math.round(percent * 0.4)}%, transparent)`,
                color: percent >= 80 ? 'white' : undefined,
              }}
            >
              {t(i + 1)}
            </span>
            <span className="sr-only">
              {t(module.title)}: {t(percent)}%
            </span>
          </li>
        )
      })}
    </ol>
  )
}
