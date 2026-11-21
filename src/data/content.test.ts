// @vitest-environment node
import { execFileSync } from 'node:child_process'
import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { courses } from './courses'
import { questionsFor, quarantinedQuestions } from './questions'
import { pythonLabs } from './python-labs'
import { functionCards } from './function-cards'
import { lessonNotes } from './lesson-notes'
import { objectivesByCourse } from './objectives'
import { buildExam } from '@/lib/exam'
import { isCorrect } from '@/lib/quiz'
import { translate } from '@/lib/i18n'
it('quarantines contextless items from every course', () => {
  expect(quarantinedQuestions).toHaveLength(562)
  for (const c of courses)
    expect(questionsFor(c.id).some((q) => /^Răspunsul corect este /i.test(q.text))).toBe(
      false,
    )
})
describe.each(courses)('$id', (course) => {
  it('has valid bilingual questions and objective mappings', () => {
    const qs = questionsFor(course.id)
    expect(qs).toHaveLength(course.questionTarget)
    expect(new Set(qs.map((q) => q.id)).size).toBe(qs.length)
    for (const q of qs) {
      expect(course.modules.some((m) => m.id === q.module)).toBe(true)
      expect(q.explanation.length).toBeGreaterThan(5)
      expect(q.conceptId).toBeTruthy()
      expect(q.objectiveIds?.length).toBeGreaterThan(0)
      expect(
        q.objectiveIds?.every((id) =>
          objectivesByCourse[course.id].some((o) => o.id === id),
        ),
      ).toBe(true)
      const correct =
        q.type === 'matching'
          ? Object.fromEntries(q.pairs.map((p) => [p.target, p.answer]))
          : q.type === 'fill_blank'
            ? [q.acceptedText![0]]
            : q.type === 'sequence'
              ? q.sequence!
              : q.correct
      expect(isCorrect(q, correct), q.id).toBe(true)
      if (q.type === 'matching') {
        expect(new Set(q.pairs.map((p) => p.target)).size, q.id).toBe(q.pairs.length)
        const chips = [...q.pairs.map((p) => p.answer), ...(q.distractors ?? [])]
        expect(new Set(chips).size, q.id).toBe(chips.length)
        expect(new Set(chips.map((text) => translate(text, 'en'))).size, q.id).toBe(
          chips.length,
        )
      }
      if (q.type !== 'matching')
        expect(new Set(q.options.map((o) => o.text)).size, q.id).toBe(q.options.length)
      if (/[ăâîșț]/.test(q.text)) expect(translate(q.text, 'en'), q.id).not.toBe(q.text)
      if (/[ăâîșț]/.test(q.explanation))
        expect(translate(q.explanation, 'en'), q.id).not.toBe(q.explanation)
    }
  })
  it('offers reviewed practice for every published topic in the map', () => {
    const reviewed = questionsFor(course.id).filter((q) => q.mappingStatus === 'reviewed')
    const ids = new Set(reviewed.flatMap((q) => q.objectiveIds ?? []))
    expect(objectivesByCourse[course.id].filter((o) => !ids.has(o.id))).toEqual([])
  })
  it('builds reproducible variants without repeated concepts', () => {
    for (const v of [1, 2, 3]) {
      const e = buildExam(course, v)
      expect(e.length).toBe(course.exam.questions)
      expect(e.filter((q) => q.type === 'matching').length).toBeGreaterThanOrEqual(2)
      expect(new Set(e.map((q) => q.conceptId)).size).toBe(e.length)
      expect(e.map((q) => q.id)).toEqual(buildExam(course, v).map((q) => q.id))
    }
  })
  it('preserves videos with attributed bilingual highlights', () => {
    for (const m of course.modules)
      for (const l of m.lessons) {
        expect(l.kind).toBe('video')
        expect(l.seconds).toBeGreaterThanOrEqual(900)
        expect(l.seconds).toBeLessThanOrEqual(1200)
        const n = lessonNotes[l.youtubeId]
        expect(n.source).toBe(l.youtubeId)
        expect(n.points.length).toBeGreaterThanOrEqual(3)
        expect(n.points.every((p) => p.every(Boolean))).toBe(true)
      }
  })
})
it.skipIf(process.platform === 'win32' && !process.env.BACIT_PYTHON)(
  'executes every Python output, function example, lab reference and SQL drill',
  () => {
    const outputs = courses
      .flatMap((c) => questionsFor(c.id))
      .filter((q) => q.type === 'code_output')
      .map((q) => {
        if (q.type === 'matching') throw Error('Unexpected matching')
        return {
          id: q.id,
          code: q.code,
          expected: q.options.find((o) => o.id === q.correct[0])!.text,
        }
      })
    const examples = functionCards.map((c) => ({
      id: 'function-' + c.id,
      code: c.code,
      expected: c.output,
    }))
    const sql = questionsFor('baze-de-date').flatMap((q) =>
      q.type !== 'matching' && q.code && q.id.includes('-drill-')
        ? [
            {
              id: q.id,
              code: q.code,
              expected: q.options.find((o) => o.id === q.correct[0])!.text,
            },
          ]
        : [],
    )
    const result = execFileSync(
      process.env.BACIT_PYTHON ?? 'python3',
      ['scripts/verify-python.py'],
      {
        encoding: 'utf8',
        input: JSON.stringify({
          questions: [...outputs, ...examples],
          labs: pythonLabs,
          sql,
        }),
        timeout: 30000,
        env: { ...process.env, PYTHONUTF8: '1' },
      },
    )
    expect(JSON.parse(result)).toEqual({
      outputQuestions: outputs.length + examples.length,
      labSolutions: 21,
      sqlQueries: sql.length,
      status: 'passed',
    })
  },
)

it('executes the JavaScript output drills', () => {
  const drills = questionsFor('html5').filter((q) => q.id.includes('-drill-js-'))
  expect(drills.length).toBeGreaterThan(0)
  for (const q of drills) {
    if (q.type === 'matching' || !q.code) throw Error('Expected an executable drill')
    const output: string[] = []
    runInNewContext(
      q.code,
      { console: { log: (value: unknown) => output.push(String(value)) } },
      { timeout: 1000 },
    )
    expect(output, q.id).toEqual([q.options.find((o) => o.id === q.correct[0])!.text])
  }
})
