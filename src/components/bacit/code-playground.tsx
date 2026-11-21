import { useRef, useState, useEffect } from 'react'
import { Play, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n'
import { runPython, type PythonResult } from '@/lib/python-runner'
export function CodePlayground({ initialCode, id }: { initialCode: string; id: string }) {
  const { pick } = useI18n()
  const [code, setCode] = useState(initialCode)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<PythonResult | null>(null)
  const active = useRef<AbortController | null>(null)
  useEffect(() => () => active.current?.abort(), [])
  async function run() {
    const controller = new AbortController()
    active.current = controller
    setStatus('loading')
    setResult(null)
    const value = await runPython(code, [], setStatus, controller.signal)
    if (!controller.signal.aborted) setResult(value)
    setStatus('idle')
  }
  return (
    <div className="space-y-3">
      <Label htmlFor={id}>
        {pick('Modifică și rulează exemplul Python', 'Edit and run the Python example')}
      </Label>
      <textarea
        id={id}
        aria-label={pick('Editor Python pentru exemplu', 'Python example editor')}
        className="min-h-40 w-full rounded-xl border bg-code-bg p-4 font-mono text-sm text-code-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        spellCheck={false}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={status !== 'idle'}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled={status !== 'idle'} onClick={() => void run()}>
          <Play />
          {pick('Rulează exemplul', 'Run example')}
        </Button>
        {status !== 'idle' && (
          <Button
            variant="outline"
            onClick={() => {
              active.current?.abort()
              setStatus('idle')
            }}
          >
            <Square />
            {pick('Oprește', 'Stop')}
          </Button>
        )}
        <span role="status" className="text-xs text-muted-foreground">
          {status === 'loading'
            ? pick('Se încarcă Python…', 'Loading Python…')
            : status === 'running'
              ? pick('Se execută…', 'Running…')
              : pick(
                  'Fișierele exemplului există doar în mediul Python din browser.',
                  'Example files exist only in the browser Python environment.',
                )}
        </span>
      </div>
      {result && (
        <pre
          role="status"
          className="overflow-x-auto rounded-xl border bg-muted p-4 text-sm whitespace-pre-wrap"
        >
          {result.error ??
            (result.output ||
              pick('Executat fără text afișat.', 'Executed without printed output.'))}
        </pre>
      )}
    </div>
  )
}
