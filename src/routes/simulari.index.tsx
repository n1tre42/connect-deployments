import { useI18n } from '@/lib/i18n'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, FileCheck, Flag, ListChecks, Target, Trophy } from 'lucide-react'
import { CourseIcon } from '@/components/bacit/course-icon'
import { PageHeader } from '@/components/bacit/page-header'
import { Button } from '@/components/ui/button'
import { courseColor, courses } from '@/data/courses'
import { buildExam, examMinutes, examScore, examVariants } from '@/lib/exam'
import { useProgress } from '@/lib/progress'
export const Route = createFileRoute('/simulari/')({
  head: () => ({ meta: [{ title: 'Simulări de examen · BacIt' }] }),
  component: ExamsPage,
})
const features = [
  { icon: Clock, text: 'Timp limitat, cu cronometru vizibil' },
  { icon: ListChecks, text: 'Alegere unică, multiplă, cod și drag and drop' },
  { icon: Flag, text: 'Marchezi întrebările pentru revizuire' },
  { icon: Target, text: 'Scor pe scara 0–1000, promovare de la 700' },
]
function ExamsPage() {
  const { t } = useI18n()
  const progress = useProgress()
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={t('Simulări de examen')}
        title={t('Trei simulări pentru fiecare examen')}
        description={t(
          'La finalul cursului, verifică-te în condiții de examen: fără indicii până la predare, apoi raport detaliat pe fiecare domeniu.',
        )}
      />
      <ul className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <li
            key={f.text}
            className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm"
          >
            <f.icon className="size-5 shrink-0 text-primary" aria-hidden />
            {t(f.text)}
          </li>
        ))}
      </ul>
      <div className="space-y-10">
        {courses.map((course) => (
          <section key={course.id} id={course.id} className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <CourseIcon course={course} />
              <div>
                <h2 className="text-xl font-bold">{t(course.examTitle)}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('Curs: ')}
                  {t(course.title)} · {t(course.modules.length)}
                  {t(' domenii')}
                </p>
              </div>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {examVariants.map((variant) => {
                const count = buildExam(course, variant).length
                const attempts = progress.exams.filter(
                  (e) => e.course === course.id && e.variant === variant,
                )
                const best = attempts.reduce((max, e) => Math.max(max, e.percent), -1)
                return (
                  <li
                    key={variant}
                    className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs"
                    style={{ borderLeft: `4px solid ${courseColor(course)}` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">
                          {t('Simularea ')}
                          {t(variant)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t(count)}
                          {t(' întrebări · ')}
                          {t(examMinutes(course, count))}
                          {t(' min · promovare ')}
                          {t(' ')}
                          {t(course.exam.passPercent)}%
                        </p>
                      </div>
                      <FileCheck className="size-5 text-muted-foreground" aria-hidden />
                    </div>
                    {t(
                      best >= 0 ? (
                        <p className="flex flex-wrap items-center gap-x-2 text-sm">
                          <Trophy
                            className={
                              best >= course.exam.passPercent
                                ? 'size-4 text-warning'
                                : 'size-4 text-muted-foreground'
                            }
                            aria-hidden
                          />
                          {t(' Cel mai bun scor: ')}
                          <strong>{t(examScore(best))}/1000</strong>
                          <span className="text-muted-foreground">
                            ({t(attempts.length)}{' '}
                            {t(attempts.length === 1 ? 'încercare' : 'încercări')})
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {t('Încă nu ai susținut această simulare.')}
                        </p>
                      ),
                    )}
                    <Button asChild className="mt-auto">
                      <Link
                        to="/simulari/$courseId/$variant"
                        params={{
                          courseId: course.id,
                          variant: String(variant),
                        }}
                      >
                        {t(best >= 0 ? 'Reia simularea' : 'Începe simularea')}
                      </Link>
                    </Button>
                  </li>
                )
              })}
            </ul>
            {course.id === 'python-next-generation' && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-accent p-5">
                <p className="text-sm font-semibold">
                  {t('Simulare combinată · 12 întrebări + 3 laburi Python · 45 min')}
                </p>
                <Button asChild>
                  <Link to="/python-next-generation" search={{ mode: 'combined' }}>
                    {t('Începe simularea combinată')}
                  </Link>
                </Button>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
