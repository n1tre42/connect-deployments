import { beforeEach, expect, it, vi } from 'vitest'
import { validateProgressImport } from './progress-import'
import { isAnswered, isCorrect } from './quiz'
import { reviewedQuestions } from '@/data/reviewed-questions'
import { buildNgRehearsal } from './ng-rehearsal'
import { questionsFor } from '@/data/questions'
beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})
it('validates current and legacy backups and rejects unsafe data', () => {
  const p = {
    xp: 42,
    answers: { q: { correct: true, attempts: 1, at: 1 } },
    dailyGoal: 20,
  }
  expect(
    validateProgressImport({ format: 'bacit-progress', version: 1, progress: p }).xp,
  ).toBe(42)
  expect(
    validateProgressImport({
      version: 1,
      exportedAt: '2026-11-06T12:00:00Z',
      progress: p,
    }).xp,
  ).toBe(42)
  expect(() =>
    validateProgressImport({ format: 'bacit-progress', version: 2, progress: p }),
  ).toThrow()
  expect(() => validateProgressImport({ xp: -1 })).toThrow()
  expect(() => validateProgressImport({ dailyGoal: 999 })).toThrow()
  expect(() =>
    validateProgressImport(JSON.parse('{"watched":{"__proto__":true}}')),
  ).toThrow()
})
it('keeps the current save intact on invalid restore and persists a valid backup', async () => {
  const p = await import('./progress')
  p.recordAnswer('q', true)
  const before = JSON.stringify(p.getProgress())
  expect(() => p.importProgress({ xp: -5 })).toThrow()
  expect(JSON.stringify(p.getProgress())).toBe(before)
  p.importProgress({
    format: 'bacit-progress',
    version: 1,
    progress: { xp: 15, profile: { name: 'Ana' } },
  })
  expect(p.getProgress().xp).toBe(15)
  expect(p.getProgress().profile.school).toBe('')
  expect(JSON.parse(localStorage.getItem('bacit-progress-v1')!).xp).toBe(15)
})
it('grades typed answers and ordering without answer-id shortcuts', () => {
  const all = Object.values(reviewedQuestions).flat()
  const s = all.find((q) => q.type === 'sequence')!,
    f = all.find((q) => q.type === 'fill_blank')!
  expect(isAnswered(s, [])).toBe(false)
  expect(isCorrect(s, s.sequence!)).toBe(true)
  expect(isCorrect(s, [...s.sequence!].reverse())).toBe(false)
  expect(isAnswered(f, [' '])).toBe(false)
  expect(isCorrect(f, ['return'])).toBe(true)
  expect(isCorrect(f, ['Return'])).toBe(false)
})
it('builds three sections, 24 unique questions and seven different lab topics', () => {
  const p = buildNgRehearsal(123, 'exam')
  expect(p.format).toEqual({ first: 16, labs: 7, last: 8, minutes: 50 })
  expect(p.questions).toHaveLength(24)
  expect(p.labs).toHaveLength(7)
  expect(new Set(p.questions.map((q) => q.conceptId)).size).toBe(24)
  expect(new Set(p.labs.map((l) => l.module)).size).toBe(7)
  expect(buildNgRehearsal(123, 'exam').questions.map((q) => q.id)).toEqual(
    p.questions.map((q) => q.id),
  )
})
it('counts latest answers once per concept', async () => {
  const p = await import('./progress')
  const b = questionsFor('python')
  const a = b.find((q) => b.some((x) => x.id !== q.id && x.conceptId === q.conceptId))!
  const other = b.find((q) => q.id !== a.id && q.conceptId === a.conceptId)!
  p.recordAnswer(a.id, true)
  expect(p.mastery(p.getProgress(), [a.id, other.id])).toBe(100)
  p.recordAnswer(other.id, false)
  expect(p.mastery(p.getProgress(), [a.id, other.id])).toBe(0)
})
