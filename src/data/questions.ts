import { freshBank } from './fresh-questions'
import { systemsBank } from './systems-questions'
import { extraBank } from './extra-questions'
import { expandedQuestions } from './question-expansion'
import { pythonNextQuestions } from './python-next'

export type QuestionType =
  'single' | 'multiple' | 'true_false' | 'code_output' | 'matching'

export type Option = { id: string; text: string }

type BaseQuestion = {
  id: string
  module: string
  difficulty: 'easy' | 'medium' | 'hard'
  text: string
  code?: string
  explanation: string
}

export type ChoiceQuestion = BaseQuestion & {
  type: Exclude<QuestionType, 'matching'>
  options: Option[]
  correct: string[]
}

export type MatchingQuestion = BaseQuestion & {
  type: 'matching'
  pairs: { target: string; answer: string }[]
  distractors?: string[]
}

export type Question = ChoiceQuestion | MatchingQuestion

const bank: Record<string, Question[]> = {
  ...freshBank,
  ...systemsBank,
  'python-next-generation': pythonNextQuestions,
}
for (const [id, extra] of Object.entries(extraBank)) bank[id] = [...bank[id], ...extra]
for (const [id, extra] of Object.entries(expandedQuestions)) {
  bank[id] = [...(bank[id] ?? []), ...extra]
}

export function questionsFor(courseId: string, moduleId?: string): Question[] {
  const list = bank[courseId] ?? []
  return moduleId ? list.filter((q) => q.module === moduleId) : list
}
export const totalQuestions = Object.values(bank).reduce(
  (sum, list) => sum + list.length,
  0,
)
