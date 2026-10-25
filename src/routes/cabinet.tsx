import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Flag, Flame, ListChecks, RotateCcw, Trophy, UserRound, Zap } from 'lucide-react'
import { toast } from 'sonner'

import { CourseIcon } from '@/components/bacit/course-icon'
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
  const progress = useProgress()
  const days = history(progress, 14)
  const maxDay = Math.max(1, ...days.map((d) => d.count))
  const answered = Object.keys(progress.answers).length
  const correct = Object.values(progress.answers).filter((a) => a.correct).length
  const flagged = allQuestions.filter(({ question }) => progress.flagged[question.id])
  const exams = [...progress.exams].sort((a, b) => b.at - a.at)

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow="Cabinetul meu"
        title={`Salut, ${progress.profile.name || 'elev'}!`}
        description="Progresul tău la toate cursurile, istoricul simulărilor și întrebările marcate pentru revizuire. Datele se păstrează în acest browser."
        actions={<ProfileDialog profile={progress.profile} />}
      />

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Flame className="size-5 text-streak" />} label="Seria curentă">
          {streak(progress)} zile
        </StatCard>
        <StatCard icon={<Zap className="size-5 text-primary" />} label="Puncte XP">
          {progress.xp}
        </StatCard>
        <StatCard icon={<ListChecks className="size-5 text-success" />} label="Răspunsuri corecte">
          {correct}
          <span className="text-base font-normal text-muted-foreground"> / {answered}</span>
        </StatCard>
        <StatCard icon={<Trophy className="size-5 text-warning" />} label="Simulări susținute">
          {progress.exams.length}
        </StatCard>
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border bg-card p-5 shadow-xs">
          <h2 className="font-bold">Activitate — ultimele 14 zile</h2>
          <p className="text-sm text-muted-foreground">Întrebări rezolvate la practica zilnică</p>
          <ol className="mt-5 flex h-36 items-end gap-1.5" aria-label="Activitate zilnică">
            {days.map((d) => (
              <li
                key={d.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                title={`${d.day}: ${d.count} întrebări`}
              >
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {d.count || ''}
                </span>
                <span
                  className={cn(
                    'w-full rounded-t-md',
                    d.count ? 'bg-primary' : 'bg-muted',
                  )}
                  style={{ height: d.count ? `${(d.count / maxDay) * 100}%` : '4px' }}
                />
                <span className="text-[10px] text-muted-foreground capitalize">{d.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-xs">
          <h2 className="mb-4 font-bold">Stăpânire pe cursuri</h2>
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
                        {course.title}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {watched}/{lessons.length} lecții · {percent}%
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
        <h2 className="border-b px-5 py-4 font-bold">Istoricul simulărilor</h2>
        {exams.length === 0 ? (
          <div className="space-y-3 p-8 text-center text-sm text-muted-foreground">
            <p>Încă nu ai susținut nicio simulare.</p>
            <Button asChild variant="outline" size="sm">
              <Link to="/simulari">Alege o simulare</Link>
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
                    <strong>{course.title}</strong> · Simularea {exam.variant}
                    <span className="block text-xs text-muted-foreground">
                      {new Date(exam.at).toLocaleString('ro-RO', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}{' '}
                      · {exam.correct}/{exam.total} corecte
                    </span>
                  </span>
                  <span className="font-mono font-semibold">{examScore(exam.percent)}/1000</span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-destructive',
                    )}
                  >
                    {passed ? 'Promovat' : 'Nepromovat'}
                  </span>
                  <Button asChild variant="ghost" size="sm">
                    <Link
                      to="/simulari/$courseId/$variant"
                      params={{ courseId: course.id, variant: String(exam.variant) }}
                    >
                      Reia
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-2xl border bg-card shadow-xs">
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="font-bold">Marcate pentru revizuire</h2>
          <span className="text-sm text-muted-foreground">{flagged.length}</span>
        </div>
        {flagged.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Marchează întrebările dificile în timpul practicii și le găsești aici.
          </p>
        ) : (
          <ul>
            {flagged.map(({ question, courseId }) => (
              <FlaggedItem key={question.id} question={question} courseId={courseId} />
            ))}
          </ul>
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
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-xs">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-2 text-3xl font-extrabold tracking-tight">{children}</dd>
    </div>
  )
}

function FlaggedItem({ question, courseId }: { question: Question; courseId: string }) {
  const course = getCourse(courseId)
  const progress = useProgress()
  const last = progress.answers[question.id]
  return (
    <li className="flex flex-wrap items-center gap-3 border-t px-5 py-3 text-sm first:border-t-0">
      <span className="min-w-0 flex-1">
        {question.text}
        <span className="block text-xs text-muted-foreground">
          {course?.title} ·{' '}
          {last ? (last.correct ? 'ultima dată corect' : 'ultima dată greșit') : 'nerezolvată'}
        </span>
      </span>
      {course && (
        <Button asChild variant="outline" size="sm">
          <Link to="/practica/$courseId" params={{ courseId: course.id }}>
            Exersează
          </Link>
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => toggleFlag(question.id)}
        aria-label="Scoate marcajul"
        title="Scoate marcajul"
        className="text-warning"
      >
        <Flag className="fill-current" />
      </Button>
    </li>
  )
}

function ProfileDialog({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(profile)

  const fields: { key: keyof Profile; label: string; type?: string }[] = [
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
          <UserRound /> Profilul meu
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            updateProfile({ ...draft, name: draft.name.trim() || 'Elev BacIt' })
            setOpen(false)
            toast.success('Profilul a fost salvat')
          }}
        >
          <DialogHeader>
            <DialogTitle>Profilul meu</DialogTitle>
            <DialogDescription>
              Datele rămân doar în acest browser și apar în cabinet.
            </DialogDescription>
          </DialogHeader>
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={`profile-${f.key}`}>{f.label}</Label>
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
                Anulează
              </Button>
            </DialogClose>
            <Button type="submit">Salvează</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ResetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <RotateCcw /> Resetează progresul
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resetezi tot progresul?</DialogTitle>
          <DialogDescription>
            Se șterg lecțiile vizionate, răspunsurile, seria, XP-ul, simulările și profilul din
            acest browser. Acțiunea nu poate fi anulată.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Anulează</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                resetProgress()
                toast('Progresul a fost resetat')
              }}
            >
              Resetează
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
