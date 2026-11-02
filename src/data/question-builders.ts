import { bilingual as b } from '@/lib/translations'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import type { Question } from './questions'

export type Text = string | readonly [string, string]
export const text = (value: Text) =>
  typeof value === 'string' ? value : b(value[0], value[1])
export type QuestionSpec = {
  prompt: Text
  answers: Text[]
  explanation: Text
  code?: string
  multiple?: number[]
  difficulty?: 'easy' | 'medium' | 'hard'
}

export function makeQuestions(
  course: string,
  module: string,
  specs: QuestionSpec[],
): Question[] {
  return specs.map((spec, i) => {
    const id = `${course}-${module.slice(0, 2)}-ng${String(i + 1).padStart(2, '0')}`
    const options = spec.answers.map((answer, n) => ({
      id: String(n),
      text: text(answer),
    }))
    return {
      id,
      module,
      text: text(spec.prompt),
      code: spec.code,
      difficulty: spec.difficulty ?? (i % 3 === 0 ? 'easy' : 'medium'),
      type: spec.multiple ? 'multiple' : spec.code ? 'code_output' : 'single',
      options: shuffle(options, seededRandom(hashString(id))),
      correct: (spec.multiple ?? [0]).map(String),
      explanation: text(spec.explanation),
    }
  })
}

export function q(prompt: Text, answers: Text[], explanation: Text): QuestionSpec {
  return { prompt, answers, explanation }
}
export function output(
  code: string,
  correct: string,
  alternatives: string[],
  explanation: Text,
): QuestionSpec {
  return {
    prompt: ['Ce afișează programul?', 'What does the program print?'],
    code,
    answers: [correct, ...alternatives],
    explanation,
  }
}
