import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, GripVertical } from 'lucide-react'
import { PageHeader } from '@/components/bacit/page-header'
import { QuizSession } from '@/components/bacit/quiz-session'
import { Button } from '@/components/ui/button'
import { courses } from '@/data/courses'
import { objectivesByCourse } from '@/data/objectives'
import { questionsFor } from '@/data/questions'
import { useI18n } from '@/lib/i18n'
import { hashString, seededRandom, shuffle } from '@/lib/random'

type ExerciseSearch = {
  curs?: string
  tema?: string
  format?: 'matching' | 'multiple' | 'sequence' | 'fill_blank' | 'all'
}

export const Route = createFileRoute('/exercitii')({
  validateSearch: (s: Record<string, unknown>): ExerciseSearch => ({
    curs: typeof s.curs === 'string' ? s.curs : undefined,
    tema:
      typeof s.tema === 'string' || typeof s.tema === 'number'
        ? String(s.tema)
        : undefined,
    format:
      s.format === 'matching' ||
      s.format === 'multiple' ||
      s.format === 'sequence' ||
      s.format === 'fill_blank' ||
      s.format === 'all'
        ? s.format
        : undefined,
  }),
  head: () => ({ meta: [{ title: 'Exerciții pe teme · BacIt' }] }),
  component: ExercisesPage,
})

function ExercisesPage() {
  const { pick, t } = useI18n()
  const { curs, tema, format } = Route.useSearch()
  const navigate = Route.useNavigate()
  const course = courses.find((c) => c.id === curs) ?? courses[0]
  const objectives = objectivesByCourse[course.id]
  const objective = objectives.find((o) => o.id === tema)
  const type = format ?? (objective ? 'all' : 'matching')
  const types = [
    ['all', 'Toate formatele', 'All formats'],
    ['matching', 'Potrivire · Drag and drop', 'Matching · Drag and drop'],
    ['multiple', 'Alegere multiplă', 'Multiple selection'],
    ['sequence', 'Ordonare', 'Ordering'],
    ['fill_blank', 'Completare', 'Fill in'],
  ] as const
  const pool = questionsFor(course.id).filter(
    (q) =>
      (objective
        ? q.mappingStatus === 'reviewed' && q.objectiveIds?.includes(objective.id)
        : true) &&
      (type === 'all' || type === q.type),
  )
  const filterClass = 'block w-full rounded-lg border bg-background px-3 py-2.5 text-sm'
  const filterKey = [course.id, objective?.id ?? '', type].join(':')
  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
      <PageHeader
        eyebrow={pick('Practică', 'Practice')}
        title={pick('Exerciții pe teme', 'Practice by topic')}
        description={pick(
          'Alege o temă sau un format și primești explicații după fiecare răspuns.',
          'Choose a topic or format and get an explanation after each answer.',
        )}
      />
      <section className="grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-3">
        <label className="min-w-0 space-y-2 text-sm font-semibold">
          <span id="exercise-course-label">{pick('Curs', 'Course')}</span>
          <select
            aria-labelledby="exercise-course-label"
            className={filterClass}
            value={course.id}
            onChange={(e) =>
              void navigate({
                search: { curs: e.target.value, tema: undefined, format: type },
              })
            }
          >
            {courses.map((c) => (
              <option value={c.id} key={c.id}>
                {t(c.title)}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold">
          <span id="exercise-topic-label">{pick('Temă', 'Topic')}</span>
          <select
            aria-labelledby="exercise-topic-label"
            className={filterClass}
            value={objective?.id ?? ''}
            onChange={(e) =>
              void navigate({
                search: {
                  curs: course.id,
                  tema: e.target.value || undefined,
                  format: 'all',
                },
              })
            }
          >
            <option value="">{pick('Toate temele', 'All topics')}</option>
            {objectives.map((o) => (
              <option key={o.id} value={o.id}>
                {o.id} · {pick(o.titleRo, o.titleEn)}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold">
          <span id="exercise-format-label">{pick('Format', 'Format')}</span>
          <select
            aria-labelledby="exercise-format-label"
            className={filterClass}
            value={type}
            onChange={(e) => {
              const next = types.find(([id]) => id === e.target.value)?.[0]
              void navigate({
                search: { curs: course.id, tema: objective?.id, format: next },
              })
            }}
          >
            {types.map(([id, ro, en]) => (
              <option key={id} value={id}>
                {pick(ro, en)}
              </option>
            ))}
          </select>
        </label>
      </section>
      <FocusedPractice
        key={filterKey}
        course={course.id}
        pool={pool}
        filterKey={filterKey}
      />
      <Button asChild variant="ghost" className="mt-4">
        <Link to="/obiective" search={{ curs: course.id }}>
          {pick('Vezi temele examenului', 'See exam topics')} <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}

function FocusedPractice({
  course,
  pool,
  filterKey,
}: {
  course: string
  pool: ReturnType<typeof questionsFor>
  filterKey: string
}) {
  const { pick } = useI18n()
  const [round, setRound] = useState<number | null>(null)
  const [questions] = useState(() => {
    const concepts = new Map<string, typeof pool>()
    for (const q of shuffle(pool, seededRandom(hashString(filterKey)))) {
      const key = q.conceptId ?? q.id
      const variants = concepts.get(key)
      if (variants) variants.push(q)
      else concepts.set(key, [q])
    }
    const groups = [...concepts.values()]
    const ordered: typeof pool = []
    for (let i = 0; ordered.length < pool.length; i++) {
      for (const variants of groups) {
        if (variants[i]) ordered.push(variants[i])
      }
    }
    return ordered
  })
  const size = 6
  const offset = (round ?? 0) * size
  const batch = questions.slice(offset, offset + size)
  return (
    <section className="mt-5 rounded-2xl border bg-card p-5 sm:p-6">
      {round === null ? (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <GripVertical className="size-5 text-primary" />
            {pick('Rundă de antrenament', 'Practice round')}
          </h2>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {questions.length === 1
              ? pick('Un exercițiu disponibil.', 'One exercise available.')
              : questions.length
                ? pick(
                    `${questions.length} exerciții disponibile. Până la ${size} într-o rundă.`,
                    `${questions.length} exercises available. Up to ${size} per round.`,
                  )
                : pick(
                    'Nu sunt exerciții cu aceste filtre. Încearcă alt format sau altă temă.',
                    'No exercises match these filters. Try a different format or topic.',
                  )}
          </p>
          <Button disabled={!questions.length} onClick={() => setRound(0)}>
            {pick('Începe runda', 'Start round')} <ArrowRight />
          </Button>
        </div>
      ) : (
        <QuizSession
          key={round}
          course={course}
          questions={batch}
          onRestart={() => setRound(offset + size < questions.length ? round + 1 : 0)}
        />
      )}
    </section>
  )
}
