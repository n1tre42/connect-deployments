import { createFileRoute, Link } from '@tanstack/react-router'
import {
  BookOpen,
  CalendarCheck,
  CirclePlay,
  Flame,
  GraduationCap,
  ListChecks,
  Timer,
} from 'lucide-react'

import { CourseCard } from '@/components/bacit/course-card'
import { Button } from '@/components/ui/button'
import { courses } from '@/data/courses'
import { glossary } from '@/data/glossary'
import { totalQuestions } from '@/data/questions'

export const Route = createFileRoute('/')({
  component: Home,
})

const questionTarget = courses.reduce((sum, c) => sum + c.questionTarget, 0)

const steps = [
  {
    icon: CirclePlay,
    title: 'Urmărește lecția',
    text: 'Video și lecturi selectate pentru fiecare obiectiv al examenului.',
  },
  {
    icon: ListChecks,
    title: 'Răspunde la 5–10 întrebări',
    text: 'Imediat după lecție, cu explicație pentru fiecare răspuns.',
  },
  {
    icon: Flame,
    title: 'Practică zilnic',
    text: 'Până la 30 de întrebări pe zi în fiecare curs. Păstrează seria!',
  },
  {
    icon: Timer,
    title: 'Dă simularea',
    text: 'Trei variante de examen pe curs, cu timp și format ca la Certiport.',
  },
]

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_28rem_at_85%_-10%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_65%),radial-gradient(40rem_24rem_at_-10%_10%,color-mix(in_oklch,var(--warning)_16%,transparent),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-content items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
              <GraduationCap className="size-4 text-primary" aria-hidden />
              Pregătire gratuită pentru IT Specialist (Certiport)
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Învață puțin în fiecare zi.{' '}
              <span className="text-primary">Promovează certificarea.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              BacIt te pregătește pentru examenele Python, Baze de date, Rețelistică, HTML5
              și Dispozitive: lecții, întrebări după fiecare video, practică zilnică și
              simulări de examen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/practica">Începe practica de azi</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/cursuri">Vezi cursurile</Link>
              </Button>
            </div>
            <dl className="flex flex-wrap gap-8 pt-2">
              <Stat label="Cursuri" value={courses.length} />
              <Stat label="Întrebări acum" value={totalQuestions} />
              <Stat label="Simulări" value={courses.length * 3} />
              <Stat label="Definiții" value={glossary.length} />
            </dl>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Cinci examene, un singur loc
            </h2>
            <p className="mt-1 text-muted-foreground">
              Banca de întrebări crește spre {questionTarget.toLocaleString('ro-RO')} de
              întrebări originale.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/cursuri">Toate cursurile →</Link>
          </Button>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
          <li className="flex flex-col justify-between gap-4 rounded-2xl border border-dashed bg-muted/40 p-5">
            <div className="space-y-2">
              <BookOpen className="size-8 text-primary" aria-hidden />
              <h3 className="text-lg font-bold">Glosar Certiport</h3>
              <p className="text-sm text-muted-foreground">
                {glossary.length} de definiții pentru termenii din obiectivele oficiale,
                grupate pe cursuri și module.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link to="/glosar">Deschide glosarul</Link>
            </Button>
          </li>
        </ul>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">
            Cum funcționează
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border bg-background p-5">
                <div className="flex items-center justify-between">
                  <step.icon className="size-7 text-primary" aria-hidden />
                  <span className="font-mono text-sm font-bold text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Obiectivul tău de azi: 20 de întrebări
            </h2>
            <p className="max-w-xl opacity-85">
              Zece minute pe zi sunt suficiente. Alege-ți ritmul — 10, 20 sau 30 de
              întrebări — și urmărește-ți seria în cabinet.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link to="/practica">
              <CalendarCheck /> Începe acum
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-3xl font-extrabold tracking-tight">{value}</dd>
    </div>
  )
}

function HeroPreview() {
  const rows: [string, string][] = [
    ['Căști', 'AUDIO'],
    ['Imprimantă', 'USB'],
    ['Televizor', ''],
  ]
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border bg-card p-5 shadow-xl lg:rotate-1">
        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="rounded-md bg-primary px-2 py-0.5 font-semibold text-primary-foreground">
            Drag and drop
          </span>
          <span className="font-mono font-semibold text-primary">⏱ 32:14</span>
        </div>
        <p className="font-semibold">
          Potrivește fiecare conector cu dispozitivul pe care îl atașează.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['HDMI', 'USB TYPE C', 'ETHERNET'].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-primary/25 bg-accent px-3 py-1 font-mono text-[11px] font-semibold text-accent-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border text-sm">
          {rows.map(([device, chip], i) => (
            <div
              key={device}
              className={`grid grid-cols-2 items-center px-3 py-2 ${i ? 'border-t' : ''} ${chip ? 'bg-success-soft' : ''}`}
            >
              <span>{device}</span>
              {chip ? (
                <span className="w-fit rounded-full border bg-card px-2.5 py-0.5 font-mono text-[11px] font-semibold">
                  {chip}
                </span>
              ) : (
                <span className="rounded-md border border-dashed px-2 py-1 text-xs text-muted-foreground">
                  Apasă aici
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Întrebarea 12 din 40</span>
          <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Verifică răspunsul
          </span>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm font-semibold shadow-lg sm:flex">
        <Flame className="size-5 text-streak" aria-hidden /> Seria: 7 zile
      </div>
    </div>
  )
}
