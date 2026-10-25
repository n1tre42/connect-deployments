import { useState, type ReactNode } from 'react'
import { ArrowRight, Flag, PartyPopper, RotateCcw, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getCourse } from '@/data/courses'
import type { Question } from '@/data/questions'
import { recordAnswer, toggleFlag, useProgress } from '@/lib/progress'
import { isAnswered, isCorrect, type Answer } from '@/lib/quiz'
import { cn } from '@/lib/utils'
import { QuestionView } from './question-view'

export type QuizResult = { correct: number; total: number; xp: number }

/** A round of questions with instant feedback after each answer. */
export function QuizSession({
  course,
  questions,
  daily = false,
  onRestart,
  endActions,
}: {
  course: string
  questions: Question[]
  /** Count answers toward today's practice goal for this course. */
  daily?: boolean
  onRestart?: () => void
  endActions?: (result: QuizResult) => ReactNode
}) {
  const progress = useProgress()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [checked, setChecked] = useState<Record<string, true>>({})
  const [finished, setFinished] = useState(false)
  const courseData = getCourse(course)

  if (!questions.length) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        Întrebările pentru această secțiune sunt în pregătire.
      </p>
    )
  }

  const correctCount = questions.filter(
    (q) => checked[q.id] && isCorrect(q, answers[q.id]),
  ).length
  const checkedCount = Object.keys(checked).length
  const xp = questions.reduce(
    (sum, q) => (checked[q.id] ? sum + (isCorrect(q, answers[q.id]) ? 10 : 2) : sum),
    0,
  )

  if (finished) {
    const result = { correct: correctCount, total: questions.length, xp }
    const percent = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="space-y-5 py-4 text-center">
        <PartyPopper className="mx-auto size-12 text-warning" aria-hidden />
        <div>
          <p className="text-3xl font-extrabold tracking-tight">
            {correctCount} / {questions.length} corecte
          </p>
          <p className="mt-1 text-muted-foreground">
            {percent >= 80
              ? 'Excelent! Ești pe drumul cel bun.'
              : percent >= 50
                ? 'Bine! Mai repetă explicațiile greșelilor.'
                : 'Revezi lecția și încearcă din nou — așa se învață.'}
          </p>
        </div>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
          <Zap className="size-4" aria-hidden /> +{xp} XP
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {onRestart && (
            <Button variant="outline" onClick={onRestart}>
              <RotateCcw /> Încă o rundă
            </Button>
          )}
          {endActions?.(result)}
        </div>
      </div>
    )
  }

  const question = questions[index]
  const revealed = !!checked[question.id]
  const flagged = !!progress.flagged[question.id]
  const moduleTitle = courseData?.modules.find((m) => m.id === question.module)?.title

  function check() {
    const correct = isCorrect(question, answers[question.id])
    setChecked((c) => ({ ...c, [question.id]: true }))
    recordAnswer(question.id, correct, daily ? { daily: course } : {})
  }

  function next() {
    if (index + 1 >= questions.length) setFinished(true)
    else setIndex(index + 1)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Progress
          value={(checkedCount / questions.length) * 100}
          className="h-3 bg-muted"
          aria-label="Progresul rundei"
        />
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {index + 1}/{questions.length}
        </span>
      </div>
      <QuestionView
        key={question.id}
        question={question}
        answer={answers[question.id]}
        onChange={(a) => setAnswers((prev) => ({ ...prev, [question.id]: a }))}
        revealed={revealed}
        moduleTitle={moduleTitle}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFlag(question.id)}
          aria-pressed={flagged}
          className={cn(flagged && 'text-warning')}
        >
          <Flag className={cn(flagged && 'fill-current')} />
          {flagged ? 'Marcată pentru revizuire' : 'Marchează pentru revizuire'}
        </Button>
        <div className="flex gap-2">
          {index > 0 && (
            <Button variant="outline" onClick={() => setIndex(index - 1)}>
              Înapoi
            </Button>
          )}
          {revealed ? (
            <Button onClick={next}>
              {index + 1 >= questions.length ? 'Vezi rezultatul' : 'Următoarea'}
              <ArrowRight />
            </Button>
          ) : (
            <Button onClick={check} disabled={!isAnswered(question, answers[question.id])}>
              Verifică răspunsul
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
