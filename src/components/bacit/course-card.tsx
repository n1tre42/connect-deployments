import { useI18n } from '@/lib/i18n'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { courseColor, type Course } from '@/data/courses'
import { questionsFor } from '@/data/questions'
import { mastery, useProgress } from '@/lib/progress'
import { CourseIcon } from './course-icon'
export function CourseCard({ course }: { course: Course }) {
  const { t } = useI18n()
  const progress = useProgress()
  const questions = questionsFor(course.id)
  const percent = mastery(
    progress,
    questions.map((q) => q.id),
  )
  const lessons = course.modules.flatMap((m) => m.lessons)
  return (
    <Link
      to="/cursuri/$courseId"
      params={{ courseId: course.id }}
      className="group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs outline-none transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ borderTop: `4px solid ${courseColor(course)}` }}
    >
      <div className="flex items-start gap-3">
        <CourseIcon course={course} />
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-bold">{t(course.title)}</h3>
          <p className="text-xs text-muted-foreground">{t(course.examTitle)}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{t(course.tagline)}</p>
      {course.id === 'python-next-generation' && (
        <span className="w-fit rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
          {t('21 laburi · Python executabil')}
        </span>
      )}
      <dl className="mt-auto grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-muted px-2 py-1.5">
          <dt className="text-muted-foreground">{t('Module')}</dt>
          <dd className="font-bold">{t(course.modules.length)}</dd>
        </div>
        <div className="rounded-lg bg-muted px-2 py-1.5">
          <dt className="text-muted-foreground">{t('Lecții')}</dt>
          <dd className="font-bold">{t(lessons.length)}</dd>
        </div>
        <div className="rounded-lg bg-muted px-2 py-1.5">
          <dt className="text-muted-foreground">{t('Întrebări')}</dt>
          <dd className="font-bold">
            {t(questions.length)}
            <span className="font-normal text-muted-foreground">
              /{t(course.questionTarget)}
            </span>
          </dd>
        </div>
      </dl>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{t('Stăpânire')}</span>
          <span className="font-semibold">{t(percent)}%</span>
        </div>
        <Progress value={percent} className="h-1.5 bg-muted" />
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {t('Deschide cursul ')}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </Link>
  )
}
