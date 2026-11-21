import type { Course } from '@/data/courses'
import { questionsFor, type Question } from '@/data/questions'
import { seededRandom, shuffle } from './random'

export const examVariants = [1, 2, 3] as const

/**
 * Builds a reproducible exam variant: each module contributes questions in
 * proportion to its exam weight, then the rest of the bank fills the gaps.
 */
export function buildExam(course: Course, variant: number): Question[] {
  const random = seededRandom(variant * 7919 + course.hue)
  const concepts = new Map<string, Question>()
  for (const question of shuffle(questionsFor(course.id), random)) {
    const key = question.conceptId ?? question.id
    if (!concepts.has(key)) concepts.set(key, question)
  }
  const bank = [...concepts.values()]
  const size = Math.min(course.exam.questions, bank.length)
  const picked: Question[] = []
  const leftover: Question[] = []
  const quotas = course.modules
    .map((module) => {
      const exact = (module.weight / 100) * size
      return { id: module.id, seats: Math.floor(exact), remainder: exact % 1 }
    })
    .sort((a, b) => b.remainder - a.remainder)
  const free = size - quotas.reduce((total, item) => total + item.seats, 0)
  quotas.slice(0, Math.max(0, free)).forEach((item) => item.seats++)
  const matchingModules = new Set(
    shuffle(
      quotas.filter(
        ({ id, seats }) =>
          seats > 0 && bank.some((q) => q.module === id && q.type === 'matching'),
      ),
      random,
    )
      .slice(0, 2)
      .map(({ id }) => id),
  )
  for (const module of course.modules) {
    const pool = shuffle(
      bank.filter((q) => q.module === module.id),
      random,
    )
    const quota = quotas.find((item) => item.id === module.id)?.seats ?? 0
    if (matchingModules.has(module.id)) {
      const match = pool.findIndex((q) => q.type === 'matching')
      pool.unshift(...pool.splice(match, 1))
    }
    picked.push(...pool.slice(0, quota))
    leftover.push(...pool.slice(quota))
  }
  const ordered = [...picked, ...shuffle(leftover, random)]
  const unique = [...new Map(ordered.map((q) => [q.id, q])).values()]
  return shuffle(unique.slice(0, size), random)
}

/** Exam time scaled to the number of questions actually available. */
export function examMinutes(course: Course, questionCount: number) {
  return Math.max(
    10,
    Math.round((course.exam.minutes * questionCount) / course.exam.questions),
  )
}

/** BacIt practice percentage expressed on a 0–1000 scale. */
export function examScore(percent: number) {
  return Math.round(percent * 10)
}
