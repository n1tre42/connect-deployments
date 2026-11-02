import { useEffect, useRef, useState } from 'react'
import { Check, Play, RotateCcw, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { PythonLab } from '@/data/python-labs'
import { useI18n } from '@/lib/i18n'
import { recordLab, saveLabDraft, useProgress } from '@/lib/progress'
import { runPython, type PythonResult } from '@/lib/python-runner'
export function PythonEditor({
  lab,
  code,
  onChange,
  simulation = false,
  disabled = false,
}: {
  lab: PythonLab
  code?: string
  onChange?: (code: string) => void
  simulation?: boolean
  disabled?: boolean
}) {
  const { t, pick } = useI18n()
  const progress = useProgress()
  const source = code ?? progress.labDrafts[lab.id] ?? lab.starter
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<PythonResult | null>(null)
  const controller = useRef<AbortController | null>(null)
  const busy = status !== 'idle'
  useEffect(() => () => controller.current?.abort(), [])
  function change(value: string) {
    if (onChange) onChange(value)
    else saveLabDraft(lab.id, value)
    setResult(null)
  }
  async function run(check: boolean) {
    if (busy) return
    const abort = new AbortController()
    controller.current = abort
    setStatus('loading')
    setResult(null)
    const response = await runPython(
      source,
      check ? lab.tests : [],
      setStatus,
      abort.signal,
    )
    if (!abort.signal.aborted) {
      setResult(response)
      if (check && !simulation && !response.infrastructure)
        recordLab(lab.id, response.passed, response.total)
    }
    setStatus('idle')
  }
  return (
    <section className="space-y-4 rounded-2xl border bg-card p-5 shadow-xs">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{t(lab.title)}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t(lab.task)}</p>
        </div>
        {!simulation && progress.labs[lab.id]?.passed && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
            <Check className="size-3" />
            {pick('Rezolvat', 'Completed')}
          </span>
        )}
      </div>
      <Label htmlFor={`editor-${lab.id}`}>
        {pick('Codul tău Python', 'Your Python code')}
      </Label>
      <textarea
        id={`editor-${lab.id}`}
        value={source}
        disabled={busy || disabled}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="min-h-64 w-full resize-y rounded-xl border bg-code-bg p-4 font-mono text-sm leading-relaxed text-code-fg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
        onChange={(e) => change(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            const input = e.currentTarget
            const start = input.selectionStart
            change(source.slice(0, start) + '    ' + source.slice(input.selectionEnd))
            requestAnimationFrame(() => {
              input.selectionStart = input.selectionEnd = start + 4
            })
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void run(false)} disabled={busy || disabled}>
          <Play />
          {pick('Rulează', 'Run')}
        </Button>
        {!simulation && (
          <Button
            variant="secondary"
            onClick={() => void run(true)}
            disabled={busy || disabled}
          >
            {pick('Verifică soluția', 'Check solution')}
          </Button>
        )}
        {busy && (
          <Button variant="outline" onClick={() => controller.current?.abort()}>
            <Square />
            {pick('Oprește', 'Stop')}
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => change(lab.starter)}
          disabled={busy || disabled}
        >
          <RotateCcw />
          {pick('Cod inițial', 'Starter code')}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {pick(
          'Python rulează în browser. La prima rulare se descarcă mediul Python. Codul se păstrează automat în acest browser.',
          'Python runs in your browser. The first run downloads the Python runtime. Code is saved automatically in this browser.',
        )}
      </p>
      <div
        role="status"
        aria-live="polite"
        className="min-h-12 rounded-xl bg-muted p-3 font-mono text-xs whitespace-pre-wrap break-words"
      >
        {busy ? (
          status === 'loading' ? (
            pick('Se încarcă Python…', 'Loading Python…')
          ) : (
            pick('Se execută…', 'Running…')
          )
        ) : result ? (
          <>
            {result.output ||
              (!result.error && !result.total
                ? pick('Executat fără ieșire.', 'Executed with no output.')
                : '')}
            {result.error && <span className="text-destructive">{result.error}</span>}
            {result.total > 0 && (
              <p
                className={
                  result.passed === result.total && !result.error
                    ? 'text-success'
                    : 'text-destructive'
                }
              >
                {result.passed}/{result.total} {pick('teste trecute', 'tests passed')}
              </p>
            )}
          </>
        ) : (
          pick('Ieșirea programului va apărea aici.', 'Program output will appear here.')
        )}
      </div>
    </section>
  )
}
