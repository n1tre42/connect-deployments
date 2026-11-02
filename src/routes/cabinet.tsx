import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Flag, Flame, ListChecks, RotateCcw, Trophy, UserRound, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { CourseIcon } from '@/components/bacit/course-icon'
import { LearningOverview } from '@/components/bacit/learning-overview'
import { PageHeader } from '@/components/bacit/page-header'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { courseColor, courses, getCourse } from '@/data/courses'
import { questionsFor, type Question } from '@/data/questions'
import { examScore } from '@/lib/exam'
import {
  history,
  mastery,
  resetProgress,
  streak,
  toggleFlag,
  updateProfile,
  useProgress,
  type Profile,
} from '@/lib/progress'
import { cn } from '@/lib/utils'
export const Route = createFileRoute('/cabinet')({
  head: () => ({ meta: [{ title: 'Cabinetul meu · BacIt' }] }),
  component: CabinetPage,
})
const allQuestions = courses.flatMap((c) =>
  questionsFor(c.id).map((q) => ({ question: q, courseId: c.id })),
)
function CabinetPage() {
  const { t, format, locale } = useI18n()
  const progress = useProgress()
  const days = history(progress, 14, locale)
  const maxDay = Math.max(1, ...days.map((d) => d.count))
  const answered = Object.keys(progress.answers).length
  const correct = Object.values(progress.answers).filter((a) => a.correct).length
  const flagged = allQuestions.filter(({ question }) => progress.flagged[question.id])
  const exams = [...progress.exams].sort((a, b) => b.at - a.at)
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={t('Cabinetul meu')}
        title={format('Salut, {0}!', [progress.profile.name || 'elev'])}
        description={t(
          'Progresul tău la toate cursurile, istoricul simulărilor și întrebările marcate pentru revizuire. Datele se păstrează în acest browser.',
        )}
        actions={<ProfileDialog profile={progress.profile} />}
      />

      <LearningOverview />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Flame className="size-5 text-streak" />}
          label={t('Seria curentă')}
        >
          {t(streak(progress))}
          {t(' zile')}
        </StatCard>
        <StatCard icon={<Zap className="size-5 text-primary" />} label={t('Puncte XP')}>
          {t(progress.xp)}
        </StatCard>
        <StatCard
          icon={<ListChecks className="size-5 text-success" />}
          label={t('Răspunsuri corecte')}
        >
          {t(correct)}
          <span className="text-base font-normal text-muted-foreground">
            {' '}
            / {t(answered)}
          </span>
        </StatCard>
        <StatCard
          icon={<Trophy className="size-5 text-warning" />}
          label={t('Simulări susținute')}
        >
          {t(progress.exams.length)}
        </StatCard>
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border bg-card p-5 shadow-xs">
          <h2 className="font-bold">{t('Activitate — ultimele 14 zile')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('Întrebări rezolvate la practica zilnică')}
          </p>
          <ol
            className="mt-5 flex h-36 items-end gap-1.5"
            aria-label={t('Activitate zilnică')}
          >
            {days.map((d) => (
              <li
                key={d.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                title={format('{0}: {1} întrebări', [d.day, d.count])}
              >
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {t(d.count || '')}
                </span>
                <span
                  className={cn(
                    'w-full rounded-t-md',
                    d.count ? 'bg-primary' : 'bg-muted',
                  )}
                  style={{
                    height: d.count ? `${(d.count / maxDay) * 100}%` : '4px',
                  }}
                />
                <span className="text-[10px] text-muted-foreground capitalize">
                  {t(d.label)}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-xs">
          <h2 className="mb-4 font-bold">{t('Stăpânire pe cursuri')}</h2>
          <ul className="space-y-4">
            {courses.map((course) => {
              const lessons = course.modules.flatMap((m) => m.lessons)
              const watched = lessons.filter((l) => progress.watched[l.id]).length
              const percent = mastery(
                progress,
                questionsFor(course.id).map((q) => q.id),
              )
              return (
                <li key={course.id} className="flex items-center gap-3">
                  <CourseIcon course={course} className="size-9 rounded-lg" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex justify-between gap-2 text-sm">
                      <Link
                        to="/cursuri/$courseId"
                        params={{ courseId: course.id }}
                        className="font-semibold hover:underline"
                      >
                        {t(course.title)}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {t(watched)}/{t(lessons.length)}
                        {t(' lecții · ')}
                        {t(percent)}%
                      </span>
                    </div>
                    <Progress value={percent} className="h-1.5 bg-muted" />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border bg-card shadow-xs">
        <h2 className="border-b px-5 py-4 font-bold">{t('Istoricul simulărilor')}</h2>
        {t(
          exams.length === 0 ? (
            <div className="space-y-3 p-8 text-center text-sm text-muted-foreground">
              <p>{t('Încă nu ai susținut nicio simulare.')}</p>
              <Button asChild variant="outline" size="sm">
                <Link to="/simulari">{t('Alege o simulare')}</Link>
              </Button>
            </div>
          ) : (
            <ul>
              {exams.map((exam) => {
                const course = getCourse(exam.course)
                if (!course) return null
                const passed = exam.percent >= course.exam.passPercent
                return (
                  <li
                    key={exam.id}
                    className="flex flex-wrap items-center gap-3 border-t px-5 py-3 text-sm first:border-t-0"
                  >
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: courseColor(course) }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <strong>{t(course.title)}</strong>
                      {t(' · Simularea ')}
                      {t(exam.variant)}
                      <span className="block text-xs text-muted-foreground">
                        {t(
                          new Date(exam.at).toLocaleString(locale, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }),
                        )}
                        {t(' ')}· {t(exam.correct)}/{t(exam.total)}
                        {t(' corecte')}
                      </span>
                    </span>
                    <span className="font-mono font-semibold">
                      {t(examScore(exam.percent))}/1000
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        passed
                          ? 'bg-success-soft text-success'
                          : 'bg-danger-soft text-destructive',
                      )}
                    >
                      {t(passed ? 'Promovat' : 'Nepromovat')}
                    </span>
                    {exam.kind === 'combined' ? (
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/python-next-generation" search={{ mode: 'combined' }}>
                          {t('Reia')}
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild variant="ghost" size="sm">
                        <Link
                          to="/simulari/$courseId/$variant"
                          params={{
                            courseId: course.id,
                            variant: String(exam.variant),
                          }}
                        >
                          {t('Reia')}
                        </Link>
                      </Button>
                    )}
                  </li>
                )
              })}
            </ul>
          ),
        )}
      </section>

      <section className="mt-6 rounded-2xl border bg-card shadow-xs">
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="font-bold">{t('Marcate pentru revizuire')}</h2>
          <span className="text-sm text-muted-foreground">{t(flagged.length)}</span>
        </div>
        {t(
          flagged.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              {t(
                'Marchează întrebările dificile în timpul practicii și le găsești aici.',
              )}
            </p>
          ) : (
            <ul>
              {flagged.map(({ question, courseId }) => (
                <FlaggedItem key={question.id} question={question} courseId={courseId} />
              ))}
            </ul>
          ),
        )}
      </section>

      <div className="mt-8 flex justify-end">
        <ResetDialog />
      </div>
    </div>
  )
}
function StatCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  const { t } = useI18n()
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-xs">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        {t(icon)}
        {t(label)}
      </dt>
      <dd className="mt-2 text-3xl font-extrabold tracking-tight">{t(children)}</dd>
    </div>
  )
}
function FlaggedItem({ question, courseId }: { question: Question; courseId: string }) {
  const { t } = useI18n()
  const course = getCourse(courseId)
  const progress = useProgress()
  const last = progress.answers[question.id]
  return (
    <li className="flex flex-wrap items-center gap-3 border-t px-5 py-3 text-sm first:border-t-0">
      <span className="min-w-0 flex-1">
        {t(question.text)}
        <span className="block text-xs text-muted-foreground">
          {t(course?.title)} ·{t('')}
          {t(
            last
              ? last.correct
                ? 'ultima dată corect'
                : 'ultima dată greșit'
              : 'nerezolvată',
          )}
        </span>
      </span>
      {t(
        course && (
          <Button asChild variant="outline" size="sm">
            <Link to="/practica/$courseId" params={{ courseId: course.id }}>
              {t('Exersează')}
            </Link>
          </Button>
        ),
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => toggleFlag(question.id)}
        aria-label={t('Scoate marcajul')}
        title={t('Scoate marcajul')}
        className="text-warning"
      >
        <Flag className="fill-current" />
      </Button>
    </li>
  )
}
function ProfileDialog({ profile }: { profile: Profile }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(profile)
  const fields: {
    key: keyof Profile
    label: string
    type?: string
  }[] = [
    { key: 'name', label: 'Nume' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'school', label: 'Instituția de învățământ' },
    { key: 'grade', label: 'Clasa / anul de studiu' },
  ]
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(profile)
        setOpen(next)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserRound />
          {t(' Profilul meu')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            updateProfile({
              ...draft,
              name: draft.name.trim() || 'Elev BacIt',
            })
            setOpen(false)
            toast.success(t('Profilul a fost salvat'))
          }}
        >
          <DialogHeader>
            <DialogTitle>{t('Profilul meu')}</DialogTitle>
            <DialogDescription>
              {t('Datele rămân doar în acest browser și apar în cabinet.')}
            </DialogDescription>
          </DialogHeader>
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={`profile-${f.key}`}>{t(f.label)}</Label>
              <Input
                id={`profile-${f.key}`}
                type={f.type ?? 'text'}
                value={draft[f.key]}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t('Anulează')}
              </Button>
            </DialogClose>
            <Button type="submit">{t('Salvează')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
function ResetDialog() {
  const { t } = useI18n()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <RotateCcw />
          {t(' Resetează progresul')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Resetezi tot progresul?')}</DialogTitle>
          <DialogDescription>
            {t(
              'Se șterg lecțiile vizionate, răspunsurile, seria, XP-ul, simulările și profilul din acest browser. Acțiunea nu poate fi anulată.',
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t('Anulează')}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                resetProgress()
                toast(t('Progresul a fost resetat'))
              }}
            >
              {t('Resetează')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
