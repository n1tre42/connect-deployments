import { Link } from '@tanstack/react-router'
import { ExternalLink, Map as MapIcon } from 'lucide-react'
import { objectivesByCourse, objectivesCheckedOn } from '@/data/objectives'
import { questionsFor } from '@/data/questions'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export function CourseAlignment({
  courseId,
  expanded = false,
}: {
  courseId: string
  expanded?: boolean
}) {
  const { pick } = useI18n()
  const objectives = objectivesByCourse[courseId] ?? []
  const counts = new Map<string, number>()
  for (const q of questionsFor(courseId)) {
    if (q.mappingStatus !== 'reviewed') continue
    for (const id of q.objectiveIds ?? []) counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return (
    <section className="rounded-2xl border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <MapIcon className="size-5 text-primary" />
          {pick('Temele examenului', 'Exam topics')}
        </h2>
        {!expanded && (
          <Button asChild size="sm" variant="outline">
            <Link to="/obiective" search={{ curs: courseId }}>
              {pick('Vezi toate temele', 'View all topics')}
            </Link>
          </Button>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {pick(
          'Alege o temă din programă și începe un exercițiu.',
          'Choose a topic from the exam outline and start practising.',
        )}
      </p>
      <details open={expanded} className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold">
          {objectives.length}{' '}
          {pick('puncte oficiale · deschide lista', 'official objectives · open list')}
        </summary>
        <ul className="mt-4 divide-y">
          {objectives.map((o) => {
            const reviewed = counts.get(o.id) ?? 0
            return (
              <li
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div className="max-w-xl text-sm">
                  <span className="mr-2 font-mono text-primary">{o.id}</span>
                  {pick(o.titleRo, o.titleEn)}
                </div>
                {reviewed > 0 && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/exercitii" search={{ curs: courseId, tema: o.id }}>
                      {reviewed === 1
                        ? pick('1 exercițiu', '1 exercise')
                        : pick(`${reviewed} exerciții`, `${reviewed} exercises`)}
                    </Link>
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      </details>
      <details className="mt-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold">
          {pick('Sursă și acoperire', 'Source and coverage')}
        </summary>
        <p className="mt-2">
          {pick('Programa a fost consultată la ', 'The exam outline was checked on ')}
          {objectivesCheckedOn}.{' '}
          {pick(
            'Lista include exercițiile BacIt verificate pentru tema indicată. Unele subteme necesită mai multe exemple.',
            'The list includes BacIt exercises reviewed for each topic. Some subtopics need more examples.',
          )}
        </p>
        <a
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
          href={objectives[0]?.source}
          target="_blank"
          rel="noreferrer"
        >
          {pick('Documentul oficial', 'Official document')}
          <ExternalLink className="size-3" />
        </a>
      </details>
    </section>
  )
}
