import { useRef, useState } from 'react'
import { Upload, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useI18n } from '@/lib/i18n'
import { importProgress } from '@/lib/progress'
import { validateProgressImport } from '@/lib/progress-import'
import { toast } from 'sonner'

export function ProgressRestore() {
  const { pick } = useI18n()
  const input = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<ReturnType<
    typeof validateProgressImport
  > | null>(null)
  const [error, setError] = useState('')
  async function read(file?: File) {
    setError('')
    if (!file) return
    try {
      if (file.size > 2_000_000) throw new Error('size')
      setPending(validateProgressImport(JSON.parse(await file.text())))
    } catch {
      setError(
        pick(
          'Fișier invalid. Alege o copie BacIt JSON mai mică de 2 MB. Progresul nu a fost schimbat.',
          'Invalid file. Choose a BacIt JSON backup smaller than 2 MB. Your progress has not changed.',
        ),
      )
    }
    if (input.current) input.current.value = ''
  }
  return (
    <section className="rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold">
            {pick('Restabilește progresul', 'Restore progress')}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {pick(
              'Importă o copie BacIt pentru a continua pe acest dispozitiv sau la o adresă nouă a site-ului.',
              'Import a BacIt backup to continue on this device or at a new site address.',
            )}
          </p>
        </div>
        <Button variant="outline" onClick={() => input.current?.click()}>
          <Upload />
          {pick('Importă JSON', 'Import JSON')}
        </Button>
        <input
          ref={input}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label={pick('Copie de siguranță BacIt', 'BacIt backup')}
          onChange={(event) => void read(event.target.files?.[0])}
        />
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Dialog
        open={!!pending}
        onOpenChange={(open) => {
          if (!open) setPending(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pick('Înlocuiești progresul salvat?', 'Replace saved progress?')}
            </DialogTitle>
            <DialogDescription>
              {pick(
                'Importul înlocuiește progresul salvat în acest browser. Poți exporta o copie înainte de import.',
                'Importing replaces your saved progress in this browser. You can export a backup before importing.',
              )}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm">
            <FileCheck className="mr-2 inline size-4" />
            {Object.keys(pending?.answers ?? {}).length} {pick('răspunsuri', 'answers')} ·{' '}
            {pending?.exams?.length ?? 0} {pick('simulări', 'attempts')}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPending(null)}>
              {pick('Anulează', 'Cancel')}
            </Button>
            <Button
              onClick={() => {
                if (pending) importProgress(pending)
                setPending(null)
                toast.success(pick('Progres restabilit.', 'Progress restored.'))
              }}
            >
              {pick('Restabilește', 'Restore')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
