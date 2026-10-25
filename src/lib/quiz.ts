import type { Question } from '@/data/questions'

/** Choice questions store selected option ids; matching questions map target → placed answer. */
export type Answer = string[] | Record<string, string>

export const questionTypeLabels: Record<Question['type'], string> = {
  single: 'Alegere unică',
  multiple: 'Alegere multiplă',
  true_false: 'Adevărat / Fals',
  code_output: 'Analiză de cod',
  matching: 'Drag and drop',
}

export function isAnswered(q: Question, answer: Answer | undefined) {
  if (!answer) return false
  if (q.type === 'matching') {
    const placed = answer as Record<string, string>
    return q.pairs.every((p) => !!placed[p.target])
  }
  return (answer as string[]).length > 0
}

export function isCorrect(q: Question, answer: Answer | undefined) {
  if (!answer) return false
  if (q.type === 'matching') {
    const placed = answer as Record<string, string>
    return q.pairs.every((p) => placed[p.target] === p.answer)
  }
  return [...(answer as string[])].sort().join(',') === [...q.correct].sort().join(',')
}
