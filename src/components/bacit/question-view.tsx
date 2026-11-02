import { useI18n } from '@/lib/i18n'
import { useMemo, useState } from 'react'
import { CircleCheck, CircleX, GripVertical, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ChoiceQuestion, MatchingQuestion, Question } from '@/data/questions'
import { isCorrect, questionTypeLabels, type Answer } from '@/lib/quiz'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import { cn } from '@/lib/utils'
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-code-bg p-4 text-[13px] leading-relaxed text-code-fg">
      <code>{code}</code>
    </pre>
  )
}
/** One question with its answer controls; `revealed` shows correctness and the explanation. */
export function QuestionView({
  question,
  answer,
  onChange,
  revealed,
  moduleTitle,
}: {
  question: Question
  answer: Answer | undefined
  onChange: (answer: Answer) => void
  revealed: boolean
  moduleTitle?: string
}) {
  const { t } = useI18n()
  const correct = revealed && isCorrect(question, answer)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-md">{t(questionTypeLabels[question.type])}</Badge>
        {moduleTitle && (
          <span className="text-xs text-muted-foreground">{t(moduleTitle)}</span>
        )}
      </div>
      <h3 className="text-lg leading-snug font-semibold text-balance">
        {t(question.text)}
      </h3>
      {question.code && <CodeBlock code={question.code} />}
      {t(
        question.type === 'matching' ? (
          <MatchingInput
            question={question}
            value={(answer as Record<string, string>) ?? {}}
            onChange={onChange}
            revealed={revealed}
          />
        ) : (
          <ChoiceInput
            question={question}
            value={(answer as string[]) ?? []}
            onChange={onChange}
            revealed={revealed}
          />
        ),
      )}
      {t(
        revealed && (
          <div
            role="status"
            className={cn(
              'flex gap-3 rounded-xl p-4 text-sm',
              correct ? 'bg-success-soft' : 'bg-danger-soft',
            )}
          >
            {t(
              correct ? (
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" />
              ) : (
                <CircleX className="mt-0.5 size-5 shrink-0 text-destructive" />
              ),
            )}
            <div className="space-y-1">
              <p className="font-semibold">{t(correct ? 'Corect!' : 'Nu chiar.')}</p>
              <p className="flex gap-1.5 text-foreground/85">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
                {t(question.explanation)}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  )
}
function ChoiceInput({
  question,
  value,
  onChange,
  revealed,
}: {
  question: ChoiceQuestion
  value: string[]
  onChange: (answer: string[]) => void
  revealed: boolean
}) {
  const { t } = useI18n()
  const multiple = question.type === 'multiple'
  const code = question.type === 'code_output'
  return (
    <fieldset className="grid gap-2">
      <legend className="sr-only">{t('Variante de răspuns')}</legend>
      {t(
        multiple && (
          <p className="text-xs text-muted-foreground">
            {t('Alege toate variantele corecte ( ')}
            {t(question.correct.length)}).
          </p>
        ),
      )}
      {question.options.map((option) => {
        const selected = value.includes(option.id)
        const right = question.correct.includes(option.id)
        return (
          <label
            key={option.id}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-card px-4 py-3 text-sm transition-colors hover:border-primary/40 motion-reduce:transition-none',
              selected && !revealed && 'border-primary bg-accent',
              revealed && right && 'border-success bg-success-soft',
              revealed && selected && !right && 'border-destructive bg-danger-soft',
              revealed && 'cursor-default',
            )}
          >
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={question.id}
              value={option.id}
              checked={selected}
              disabled={revealed}
              onChange={() =>
                onChange(
                  multiple
                    ? selected
                      ? value.filter((id) => id !== option.id)
                      : [...value, option.id]
                    : [option.id],
                )
              }
              className="size-4 accent-[var(--primary)]"
            />
            <span className={cn('flex-1', code && 'font-mono')}>{t(option.text)}</span>
            {t(
              revealed && right && (
                <CircleCheck className="size-4 text-success" aria-label={t('Corect')} />
              ),
            )}
          </label>
        )
      })}
    </fieldset>
  )
}
function MatchingInput({
  question,
  value,
  onChange,
  revealed,
}: {
  question: MatchingQuestion
  value: Record<string, string>
  onChange: (answer: Record<string, string>) => void
  revealed: boolean
}) {
  const { t, format } = useI18n()
  const chips = useMemo(
    () =>
      shuffle(
        [...question.pairs.map((p) => p.answer), ...(question.distractors ?? [])],
        seededRandom(hashString(question.id)),
      ),
    [question],
  )
  const [picked, setPicked] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const used = new Set(Object.values(value))
  const available = chips.filter((c) => !used.has(c))
  function place(target: string, chip: string) {
    const next = { ...value }
    for (const [t, c] of Object.entries(next)) if (c === chip) delete next[t]
    next[target] = chip
    onChange(next)
    setPicked(null)
  }
  function remove(target: string) {
    const next = { ...value }
    delete next[target]
    onChange(next)
  }
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {t(
          'Trage fiecare element în rândul potrivit sau apasă pe un element, apoi pe rând.',
        )}
      </p>
      <div
        className="flex min-h-11 flex-wrap gap-2"
        aria-label={t('Elemente disponibile')}
      >
        {t(
          available.length === 0 && !revealed && (
            <span className="text-sm text-muted-foreground">
              {t('Toate elementele au fost plasate.')}
            </span>
          ),
        )}
        {available.map((chip) => (
          <button
            key={chip}
            type="button"
            draggable={!revealed}
            disabled={revealed}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', chip)
              e.dataTransfer.effectAllowed = 'move'
            }}
            onClick={() => setPicked(picked === chip ? null : chip)}
            aria-pressed={picked === chip}
            className={cn(
              'inline-flex cursor-grab items-center gap-1 rounded-full border border-primary/25 bg-accent px-3.5 py-1.5 font-mono text-xs font-semibold text-accent-foreground shadow-xs transition-colors hover:border-primary active:cursor-grabbing motion-reduce:transition-none',
              picked === chip && 'border-primary bg-primary text-primary-foreground',
            )}
          >
            <GripVertical className="size-3 opacity-60" aria-hidden />
            {t(chip)}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border">
        {question.pairs.map((pair, i) => {
          const placed = value[pair.target]
          const right = revealed && placed === pair.answer
          const wrong = revealed && placed !== pair.answer
          return (
            <div
              key={pair.target}
              onDragOver={(e) => {
                if (revealed) return
                e.preventDefault()
                setHover(pair.target)
              }}
              onDragLeave={() => setHover(null)}
              onDrop={(e) => {
                e.preventDefault()
                setHover(null)
                const chip = e.dataTransfer.getData('text/plain')
                if (chip) place(pair.target, chip)
              }}
              className={cn(
                'grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-3 px-4 py-2.5 text-sm',
                i > 0 && 'border-t',
                hover === pair.target && 'bg-accent',
                right && 'bg-success-soft',
                wrong && 'bg-danger-soft',
              )}
            >
              <span className="font-medium">{t(pair.target)}</span>
              {t(
                placed ? (
                  <button
                    type="button"
                    disabled={revealed}
                    onClick={() => remove(pair.target)}
                    className="inline-flex w-fit items-center gap-1.5 rounded-full border bg-card px-3 py-1 font-mono text-xs font-semibold"
                    aria-label={format('{0} — apasă pentru a scoate', [placed])}
                  >
                    {right && <CircleCheck className="size-3.5 text-success" />}
                    {wrong && <CircleX className="size-3.5 text-destructive" />}
                    {t(placed)}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={revealed || !picked}
                    onClick={() => picked && place(pair.target, picked)}
                    className={cn(
                      'h-8 rounded-md border border-dashed px-3 text-left text-xs text-muted-foreground',
                      picked && 'border-primary text-primary',
                    )}
                  >
                    {t(picked ? `Plasează „${picked}”` : 'Apasă aici')}
                  </button>
                ),
              )}
              {t(
                wrong && (
                  <span className="col-start-2 text-xs text-success">
                    {t('Corect: ')}
                    <strong className="font-mono">{t(pair.answer)}</strong>
                  </span>
                ),
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
