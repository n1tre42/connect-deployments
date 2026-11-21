import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/bacit/page-header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { functionCards } from '@/data/function-cards'
import { CodePlayground } from '@/components/bacit/code-playground'
import { useI18n } from '@/lib/i18n'
export const Route = createFileRoute('/instrumente')({
  component: FunctionGuide,
  head: () => ({ meta: [{ title: 'Funcții explicate · BacIt' }] }),
})
function FunctionGuide() {
  const { pick, language } = useI18n()
  const [search, setSearch] = useState('')
  const cards = functionCards.filter((c) =>
    JSON.stringify(c).toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <div className="mx-auto max-w-content px-4 pb-12 sm:px-6">
      <PageHeader
        eyebrow={pick('Ghid practic', 'Practical guide')}
        title={pick('Ce face fiecare funcție?', 'What does each function do?')}
        description={pick(
          'Explicații RO/EN, rezultate și greșeli frecvente. Rulează exemplele direct în browser.',
          'RO/EN explanations, results and common mistakes. Run examples directly in your browser.',
        )}
      />
      <div className="mb-6 max-w-xl space-y-2">
        <Label htmlFor="function-search">
          {pick('Caută o funcție sau un concept', 'Search for a function or concept')}
        </Label>
        <div className="relative">
          <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
          <Input
            id="function-search"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="sort, return, unittest…"
          />
        </div>
      </div>
      <p role="status" className="mb-4 text-sm text-muted-foreground">
        {cards.length} {pick('explicații', 'explanations')}
      </p>
      <div className="space-y-4">
        {cards.map((c) => (
          <details key={c.id} className="rounded-2xl border bg-card p-5">
            <summary className="cursor-pointer">
              <span className="font-mono text-lg font-bold text-primary">{c.title}</span>
              <span className="ml-3 text-sm text-muted-foreground">
                {pick(...c.category)}
              </span>
            </summary>
            <div className="mt-5 space-y-5">
              <p>{pick(...c.purpose)}</p>
              <CodePlayground id={'card-' + c.id} initialCode={c.code} />
              <div className="rounded-xl bg-muted p-4">
                <h2 className="text-sm font-bold">
                  {pick('Rezultatul exemplului inițial', 'Original example output')}
                </h2>
                <pre className="mt-2 overflow-auto text-sm">{c.output}</pre>
              </div>
              <p className="rounded-xl bg-warning-soft p-4 text-sm">
                {pick(...c.mistake)}
              </p>
              <a
                className="text-sm text-primary underline"
                href="https://certiport.pearsonvue.com/fc/ITS/python"
                target="_blank"
                rel="noreferrer"
              >
                {language === 'ro' ? 'Obiectiv Python' : 'Python objective'} {c.objective}
              </a>
            </div>
          </details>
        ))}
      </div>
      {!cards.length && (
        <p className="rounded-xl border border-dashed p-8 text-center">
          {pick(
            'Nu am găsit o funcție. Încearcă alt termen.',
            'No function found. Try another term.',
          )}
        </p>
      )}
    </div>
  )
}
