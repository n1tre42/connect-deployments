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
  const bank = questionsFor(course.id)
  const size = Math.min(course.exam.questions, bank.length)
  const picked: Question[] = []
  const leftover: Question[] = []
  for (const module of course.modules) {
    const pool = shuffle(
      bank.filter((q) => q.module === module.id),
      random,
    )
    const quota = Math.round((module.weight / 100) * size)
    picked.push(...pool.slice(0, quota))
    leftover.push(...pool.slice(quota))
  }
  return shuffle([...picked, ...shuffle(leftover, random)].slice(0, size), random)
}

/** Exam time scaled to the number of questions actually available. */
export function examMinutes(course: Course, questionCount: number) {
  return Math.max(10, Math.round((course.exam.minutes * questionCount) / course.exam.questions))
}

/** Certiport-style score on a 0–1000 scale. */
export function examScore(percent: number) {
  return Math.round(percent * 10)
}
