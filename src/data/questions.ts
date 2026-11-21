import { freshBank } from './fresh-questions'
import { systemsBank } from './systems-questions'
import { extraBank } from './extra-questions'
import { expandedQuestions } from './question-expansion'
import { maximumQuestions } from './maximum-question-expansion'
import { pythonNextQuestions } from './python-next'
import { reviewedQuestions } from './reviewed-questions'
import { objectiveMatching } from './objective-matching'
import { attachLearningMetadata } from './objectives'
import { htmlDrills, pythonDrills } from './programming-drills'
import { databaseDrills } from './database-drills'
import { networkDrills } from './network-drills'
import { deviceDrills } from './device-drills'

export type QuestionType =
  | 'single'
  | 'multiple'
  | 'true_false'
  | 'code_output'
  | 'matching'
  | 'sequence'
  | 'fill_blank'

export type Option = { id: string; text: string }

type BaseQuestion = {
  id: string
  conceptId?: string
  objectiveIds?: string[]
  mappingStatus?: 'reviewed' | 'suggested'
  acceptedText?: string[]
  sequence?: string[]
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
for (const [id, extra] of Object.entries(maximumQuestions)) {
  bank[id] = [...(bank[id] ?? []), ...extra]
}

export const quarantinedQuestions: Question[] = []
const appliedDrills: Record<string, Question[]> = {
  python: pythonDrills,
  'baze-de-date': databaseDrills,
  retelistica: networkDrills,
  html5: htmlDrills,
  'configurare-dispozitive': deviceDrills,
}
for (const [courseId, list] of Object.entries(bank)) {
  quarantinedQuestions.push(
    ...list.filter((q) => /^Răspunsul corect este /i.test(q.text)),
  )
  const seen = new Set<string>()
  bank[courseId] = [
    ...list.filter((q) => !/^Răspunsul corect este /i.test(q.text)),
    ...(reviewedQuestions[courseId] ?? []),
    ...(objectiveMatching[courseId] ?? []),
    ...(appliedDrills[courseId] ?? []),
  ]
    .filter((q) => {
      const options =
        q.type === 'matching' ? q.pairs : q.options.map((o) => o.text).sort()
      const key = JSON.stringify([q.module, q.type, q.text.trim(), q.code, options])
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((q) => attachLearningMetadata(courseId, q))
}
export const questionById = new Map(
  Object.values(bank)
    .flat()
    .map((q) => [q.id, q]),
)
export function questionsFor(courseId: string, moduleId?: string): Question[] {
  const list = bank[courseId] ?? []
  return moduleId ? list.filter((q) => q.module === moduleId) : list
}
export const totalQuestions = Object.values(bank).reduce(
  (sum, list) => sum + list.length,
  0,
)
