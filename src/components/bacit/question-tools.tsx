import { useState } from 'react'
import { ArrowUp, ArrowDown, Download, MessageSquare } from 'lucide-react'
import type { ChoiceQuestion, Question } from '@/data/questions'
import type { Answer } from '@/lib/quiz'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function ExtendedQuestionInput({
  question,
  answer,
  onChange,
  revealed,
}: {
  question: ChoiceQuestion
  answer: Answer | undefined
  onChange: (a: Answer) => void
  revealed: boolean
}) {
  const { pick, t } = useI18n()
  const values = Array.isArray(answer) ? answer : []
  if (question.type === 'fill_blank')
    return (
      <div className="space-y-2">
        <Label htmlFor={question.id + '-input'}>
          {pick('Răspunsul tău', 'Your answer')}
        </Label>
        <Input
          id={question.id + '-input'}
          autoComplete="off"
          spellCheck={false}
          value={values[0] ?? ''}
          disabled={revealed}
          onChange={(e) => onChange([e.target.value])}
          className="font-mono"
        />
        {revealed && (
          <p className="text-sm text-success">
            {pick('Răspuns acceptat: ', 'Accepted answer: ')}
            <code>{question.acceptedText?.[0]}</code>
          </p>
        )}
      </div>
    )
  const order = values.length ? values : question.options.map((o) => o.id)
  function move(index: number, offset: number) {
    const next = [...order]
    const target = index + offset
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {pick(
          'Mută pașii în ordinea corectă, apoi confirmă ordinea.',
          'Move the steps into the correct order, then confirm the order.',
        )}
      </p>
      <ol className="space-y-2">
        {order.map((id, i) => (
          <li key={id} className="flex items-center gap-2 rounded-lg border bg-card p-3">
            <span className="font-mono text-sm text-muted-foreground">{i + 1}.</span>
            <span className="min-w-0 flex-1 text-sm">
              {t(question.options.find((o) => o.id === id)?.text ?? id)}
            </span>
            <Button
              size="icon"
              variant="outline"
              disabled={revealed || i === 0}
              aria-label={
                pick('Mută în sus: ', 'Move up: ') +
                t(question.options.find((o) => o.id === id)?.text ?? id)
              }
              onClick={() => move(i, -1)}
            >
              <ArrowUp />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={revealed || i === order.length - 1}
              aria-label={
                pick('Mută în jos: ', 'Move down: ') +
                t(question.options.find((o) => o.id === id)?.text ?? id)
              }
              onClick={() => move(i, 1)}
            >
              <ArrowDown />
            </Button>
          </li>
        ))}
      </ol>
      {!revealed && (
        <Button variant="secondary" onClick={() => onChange([...order])}>
          {pick('Confirmă ordinea', 'Confirm order')}
        </Button>
      )}
      {revealed && (
        <p className="text-sm text-success">
          {pick('Ordinea corectă: ', 'Correct order: ')}
          {question.sequence
            ?.map((id) => t(question.options.find((o) => o.id === id)?.text ?? id))
            .join(' → ')}
        </p>
      )}
    </div>
  )
}

export function QuestionNote({ question }: { question: Question }) {
  const { pick, t, language } = useI18n()
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  function download() {
    const value = {
      format: 'bacit-question-note',
      version: 1,
      questionId: question.id,
      language,
      prompt: t(question.text),
      note: note.trim(),
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
    )
    const a = document.createElement('a')
    a.href = url
    a.download = 'bacit-question-' + question.id + '.json'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setSaved(true)
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-2 text-xs text-muted-foreground">
      <span>
        {pick('Obiective asociate: ', 'Related objectives: ')}
        {question.objectiveIds?.join(', ')} ·{' '}
        {question.mappingStatus === 'reviewed'
          ? pick('întrebare nouă verificată', 'new reviewed question')
          : pick('încadrare de revizuit', 'mapping to review')}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setOpen(true)
          setSaved(false)
        }}
      >
        <MessageSquare />
        {pick('Observație', 'Feedback note')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pick('Observație despre întrebare', 'Question feedback')}
            </DialogTitle>
            <DialogDescription>
              {pick(
                'Descarcă observația cu identificatorul întrebării pentru a o putea transmite echipei.',
                'Download your feedback with the question ID so you can share it with the team.',
              )}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm">{t(question.text)}</p>
          <Label htmlFor="question-note">
            {pick('Ce ar trebui corectat?', 'What should be corrected?')}
          </Label>
          <Textarea
            id="question-note"
            maxLength={2000}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button disabled={!note.trim()} onClick={download}>
            <Download />
            {pick('Descarcă nota', 'Download note')}
          </Button>
          {saved && (
            <p role="status" className="text-sm text-success">
              {pick(
                'Nota a fost pregătită pentru descărcare.',
                'The note has been prepared for download.',
              )}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
