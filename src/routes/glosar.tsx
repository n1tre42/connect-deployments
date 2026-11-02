import { useI18n } from '@/lib/i18n'
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
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}
function GlossaryPage() {
  const { t, format, locale } = useI18n()
  const [query, setQuery] = useState('')
  const [courseId, setCourseId] = useState<string | null>(null)
  const results = useMemo(() => {
    const q = normalize(query.trim())
    return glossary
      .filter((term) => !courseId || term.course === courseId)
      .filter(
        (term) =>
          !q ||
          normalize(t(term.term)).includes(q) ||
          normalize(t(term.definition)).includes(q),
      )
      .sort((a, b) => t(a.term).localeCompare(t(b.term), locale))
  }, [query, courseId, t, locale])
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={t('Glosar Certiport')}
        title={t('Termenii din obiectivele examenelor')}
        description={format(
          '{0} de definiții scurte, cu exemple, grupate pe cursuri și module. Caută un termen sau filtrează după curs.',
          [glossary.length],
        )}
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
            placeholder={t('Caută un termen…')}
            aria-label={t('Caută în glosar')}
            className="h-11 bg-card pl-9"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t('Filtrează după curs')}
        >
          <FilterChip active={!courseId} onClick={() => setCourseId(null)}>
            {t('Toate ( ')}
            {t(glossary.length)})
          </FilterChip>
          {courses.map((c) => (
            <FilterChip
              key={c.id}
              active={courseId === c.id}
              onClick={() => setCourseId(c.id)}
              color={courseColor(c)}
            >
              {t(c.title)} ({t(glossary.filter((term) => term.course === c.id).length)})
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {t(results.length)} {t(results.length === 1 ? 'termen' : 'termeni')}
      </p>

      {t(
        results.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            {t('Niciun termen nu se potrivește căutării. Încearcă alt cuvânt.')}
          </p>
        ) : (
          <dl className="grid gap-4 md:grid-cols-2">
            {results.map((term) => {
              const course = courses.find((c) => c.id === term.course)
              const module = course?.modules.find((m) => m.id === term.module)
              return (
                <div
                  key={`${term.course}-${term.term}`}
                  className="space-y-2 rounded-2xl border bg-card p-5 shadow-xs"
                  style={
                    course
                      ? { borderLeft: `4px solid ${courseColor(course)}` }
                      : undefined
                  }
                >
                  <dt className="text-lg font-bold">{t(term.term)}</dt>
                  <dd className="space-y-3">
                    <p className="text-sm text-foreground/85">{t(term.definition)}</p>
                    {term.example && <CodeBlock code={term.example} />}
                    {t(
                      course && (
                        <p className="text-xs text-muted-foreground">
                          <Link
                            to="/cursuri/$courseId"
                            params={{ courseId: course.id }}
                            className="font-semibold hover:text-foreground"
                          >
                            {t(course.title)}
                          </Link>
                          {t(module && ` · ${module.title}`)}
                        </p>
                      ),
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        ),
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
  const { t } = useI18n()
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
      {t(children)}
    </button>
  )
}
