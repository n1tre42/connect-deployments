import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'

import { CodeBlock } from '@/components/bacit/question-view'
import { PageHeader } from '@/components/bacit/page-header'
import { Input } from '@/components/ui/input'
import { courseColor, courses } from '@/data/courses'
import { glossary } from '@/data/glossary'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/glosar')({
  head: () => ({ meta: [{ title: 'Glosar Certiport · BacIt' }] }),
  component: GlossaryPage,
})

/** Lowercase and strip diacritics so "retea" finds "rețea". */
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [courseId, setCourseId] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = normalize(query.trim())
    return glossary
      .filter((t) => !courseId || t.course === courseId)
      .filter(
        (t) => !q || normalize(t.term).includes(q) || normalize(t.definition).includes(q),
      )
      .sort((a, b) => a.term.localeCompare(b.term, 'ro'))
  }, [query, courseId])

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow="Glosar Certiport"
        title="Termenii din obiectivele examenelor"
        description={`${glossary.length} de definiții scurte, cu exemple, grupate pe cursuri și module. Caută un termen sau filtrează după curs.`}
      />
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută un termen…"
            aria-label="Caută în glosar"
            className="h-11 bg-card pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrează după curs">
          <FilterChip active={!courseId} onClick={() => setCourseId(null)}>
            Toate ({glossary.length})
          </FilterChip>
          {courses.map((c) => (
            <FilterChip
              key={c.id}
              active={courseId === c.id}
              onClick={() => setCourseId(c.id)}
              color={courseColor(c)}
            >
              {c.title} ({glossary.filter((t) => t.course === c.id).length})
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? 'termen' : 'termeni'}
      </p>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          Niciun termen nu se potrivește căutării. Încearcă alt cuvânt.
        </p>
      ) : (
        <dl className="grid gap-4 md:grid-cols-2">
          {results.map((t) => {
            const course = courses.find((c) => c.id === t.course)
            const module = course?.modules.find((m) => m.id === t.module)
            return (
              <div
                key={`${t.course}-${t.term}`}
                className="space-y-2 rounded-2xl border bg-card p-5 shadow-xs"
                style={course ? { borderLeft: `4px solid ${courseColor(course)}` } : undefined}
              >
                <dt className="text-lg font-bold">{t.term}</dt>
                <dd className="space-y-3">
                  <p className="text-sm text-foreground/85">{t.definition}</p>
                  {t.example && <CodeBlock code={t.example} />}
                  {course && (
                    <p className="text-xs text-muted-foreground">
                      <Link
                        to="/cursuri/$courseId"
                        params={{ courseId: course.id }}
                        className="font-semibold hover:text-foreground"
                      >
                        {course.title}
                      </Link>
                      {module && ` · ${module.title}`}
                    </p>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean
  onClick: () => void
  color?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 motion-reduce:transition-none',
        active && 'border-primary bg-accent text-accent-foreground',
      )}
    >
      {color && <span className="size-2 rounded-full" style={{ background: color }} />}
      {children}
    </button>
  )
}
