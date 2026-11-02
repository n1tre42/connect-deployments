// @vitest-environment node
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { courses } from './courses'
import { questionsFor, totalQuestions } from './questions'
import { pythonLabs } from './python-labs'
import { glossary } from './glossary'
import { glossaryEnglish } from './glossary-en'
import { buildExam } from '@/lib/exam'
import { isCorrect } from '@/lib/quiz'
import { translate } from '@/lib/i18n'

describe('learning content', () => {
  it('has 137 Python Next questions, 21 runnable labs, and original new banks for every course', () => {
    expect(courses).toHaveLength(6)
    expect(questionsFor('python-next-generation')).toHaveLength(137)
    expect(pythonLabs).toHaveLength(21)
    expect(totalQuestions).toBe(296)
    const ids = courses.flatMap((c) => questionsFor(c.id).map((q) => q.id))
    expect(new Set(ids).size).toBe(ids.length)
    for (const course of courses) {
      expect(course.modules.reduce((n, m) => n + m.weight, 0)).toBe(100)
      for (const module of course.modules) {
        expect(questionsFor(course.id, module.id).length).toBeGreaterThanOrEqual(5)
        for (const lesson of module.lessons) {
          expect(lesson.kind).toBe('video')
          expect(lesson.seconds).toBeGreaterThanOrEqual(900)
          expect(lesson.seconds).toBeLessThanOrEqual(1200)
          expect(new URL(lesson.url).hostname).toBe('www.youtube.com')
        }
      }
      for (const question of questionsFor(course.id)) {
        expect(course.modules.some((m) => m.id === question.module)).toBe(true)
        expect(question.explanation.length).toBeGreaterThan(5)
        const correct =
          question.type === 'matching'
            ? Object.fromEntries(question.pairs.map((p) => [p.target, p.answer]))
            : question.correct
        expect(isCorrect(question, correct)).toBe(true)
        if (question.type !== 'matching') {
          expect(new Set(question.options.map((o) => o.text)).size).toBe(
            question.options.length,
          )
          expect(
            question.correct.every((id) => question.options.some((o) => o.id === id)),
          ).toBe(true)
        }
        if (/[ăâîșț]/.test(question.text))
          expect(translate(question.text, 'en')).not.toBe(question.text)
        if (/[ăâîșț]/.test(question.explanation))
          expect(translate(question.explanation, 'en')).not.toBe(question.explanation)
      }
      for (const variant of [1, 2, 3]) {
        const exam = buildExam(course, variant)
        expect(exam.length).toBeGreaterThan(0)
        expect(new Set(exam.map((q) => q.id)).size).toBe(exam.length)
        expect(exam.map((q) => q.id)).toEqual(buildExam(course, variant).map((q) => q.id))
      }
    }
    expect(glossaryEnglish.length).toBe(glossary.length)
  })

  it.skipIf(process.platform === 'win32' && !process.env.BACIT_PYTHON)(
    'executes all Python output questions and all 21 reference solutions',
    () => {
      const questions = courses
        .flatMap((c) => questionsFor(c.id))
        .filter((q) => q.type === 'code_output')
        .map((q) => {
          if (q.type === 'matching') throw new Error('Unexpected matching question')
          return {
            id: q.id,
            code: q.code,
            expected: q.options.find((o) => o.id === q.correct[0])!.text,
          }
        })
      const result = execFileSync(
        process.env.BACIT_PYTHON ?? 'python3',
        ['scripts/verify-python.py'],
        {
          encoding: 'utf8',
          input: JSON.stringify({ questions, labs: pythonLabs }),
          timeout: 30000,
          env: { ...process.env, PYTHONUTF8: '1' },
        },
      )
      expect(JSON.parse(result)).toEqual({
        outputQuestions: questions.length,
        labSolutions: 21,
        status: 'passed',
      })
    },
  )
})
