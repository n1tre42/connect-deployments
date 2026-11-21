import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Code2, FlaskConical, ListChecks, Timer } from 'lucide-react'
import { PageHeader } from '@/components/bacit/page-header'
import { PythonEditor } from '@/components/bacit/python-editor'
import { QuizSession } from '@/components/bacit/quiz-session'
import { Button } from '@/components/ui/button'
import { pythonLabs } from '@/data/python-labs'
import { pythonNextModules } from '@/data/python-next'
import { questionsFor } from '@/data/questions'
import { useI18n } from '@/lib/i18n'
import { useProgress } from '@/lib/progress'
import { seededRandom, shuffle } from '@/lib/random'
import { NgRehearsal } from '@/components/bacit/ng-rehearsal'
import { cn } from '@/lib/utils'
type Mode = 'questions' | 'labs' | 'combined' | 'rehearsal'
export const Route = createFileRoute('/python-next-generation')({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    mode: Mode
    lab?: string
  } => ({
    mode:
      search.mode === 'questions' ||
      search.mode === 'combined' ||
      search.mode === 'rehearsal'
        ? search.mode
        : 'labs',
    lab: typeof search.lab === 'string' ? search.lab.slice(0, 30) : undefined,
  }),
  head: () => ({ meta: [{ title: 'Python Next Generation · BacIt' }] }),
  component: PythonNextPage,
})
function PythonNextPage() {
  const { pick, t } = useI18n()
  const { mode, lab: labId } = Route.useSearch()
  const progress = useProgress()
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () =>
      shuffle(questionsFor('python-next-generation'), seededRandom(2026 + round)).slice(
        0,
        20,
      ),
    [round],
  )
  const lab = pythonLabs.find((x) => x.id === labId) ?? pythonLabs[0]
  const completed = pythonLabs.filter((x) => progress.labs[x.id]?.passed).length
  const modes = [
    {
      id: 'questions',
      label: pick('Întrebări', 'Questions'),
      icon: ListChecks,
    },
    { id: 'labs', label: pick('Laboratoare', 'Labs'), icon: Code2 },
    {
      id: 'combined',
      label: pick('Antrenament scurt', 'Short practice'),
      icon: Timer,
    },
    {
      id: 'rehearsal',
      label: pick('Repetiție pe secțiuni', 'Section rehearsal'),
      icon: Timer,
    },
  ] as const
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={pick('Învață. Execută. Verifică.', 'Learn. Run. Check.')}
        title="Python Next Generation"
        description={pick(
          'Întrebări cu explicații, 21 de laburi și repetiție Python NG pe secțiuni. Scorurile sunt pentru antrenament.',
          'Explained questions, 21 labs and a section-based Python NG rehearsal. Scores are for practice.',
        )}
        actions={
          <Button asChild variant="outline">
            <Link to="/cursuri/$courseId" params={{ courseId: 'python-next-generation' }}>
              {pick('Lecții video', 'Video lessons')}
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          [
            String(questionsFor('python-next-generation').length),
            pick('întrebări de studiu', 'study questions'),
          ],
          ['21', pick('laburi executabile', 'executable labs')],
          [`${completed}/21`, pick('laburi rezolvate', 'labs completed')],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border bg-card p-4">
            <p className="text-2xl font-extrabold text-primary">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <nav
        className="mb-6 flex flex-wrap gap-2"
        aria-label={pick('Mod de practică', 'Practice mode')}
      >
        {modes.map((item) => (
          <Button
            asChild
            variant={mode === item.id ? 'default' : 'outline'}
            key={item.id}
          >
            <Link
              to="/python-next-generation"
              search={{ mode: item.id }}
              aria-current={mode === item.id ? 'page' : undefined}
            >
              <item.icon />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      {mode === 'questions' && (
        <section className="rounded-2xl border bg-card p-5 sm:p-8">
          <h2 className="mb-5 text-xl font-bold">
            {pick(
              'Practică separată — 20 de întrebări',
              'Separate practice — 20 questions',
            )}
          </h2>
          <QuizSession
            key={round}
            course="python-next-generation"
            questions={questions}
            onRestart={() => setRound((x) => x + 1)}
          />
        </section>
      )}
      {mode === 'labs' && (
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border bg-card p-3">
            <h2 className="flex items-center gap-2 p-2 font-bold">
              <FlaskConical className="size-4" />
              {pick('21 de laboratoare', '21 labs')}
            </h2>
            {pythonNextModules.map(([id, title]) => (
              <div key={id} className="mt-3">
                <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {t(title)}
                </h3>
                {pythonLabs
                  .filter((x) => x.module === id)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to="/python-next-generation"
                      search={{ mode: 'labs', lab: item.id }}
                      aria-current={item.id === lab.id ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent',
                        item.id === lab.id &&
                          'bg-accent font-semibold text-accent-foreground',
                      )}
                    >
                      {t(item.title)}
                      {progress.labs[item.id]?.passed && (
                        <Check className="size-4 shrink-0 text-success" />
                      )}
                    </Link>
                  ))}
              </div>
            ))}
          </aside>
          <PythonEditor key={lab.id} lab={lab} />
        </div>
      )}
      {mode === 'combined' && <NgRehearsal key="short" kind="short" />}
      {mode === 'rehearsal' && <NgRehearsal key="exam" kind="exam" />}
    </div>
  )
}
