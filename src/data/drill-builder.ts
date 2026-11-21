import { bilingual } from '@/lib/translations'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import type { Question } from './questions'

export type Bilingual = readonly [ro: string, en: string]
export const literal = (value: string | number): Bilingual => [
  String(value),
  String(value),
]
export const text = (value: Bilingual) => bilingual(...value)

export type AppliedCase = readonly [situation: Bilingual, answer: Bilingual]
export type Drill = {
  prompt: Bilingual
  options: Bilingual[]
  explanation: Bilingual
  code?: string
  type?: 'single' | 'code_output' | 'multiple' | 'fill_blank'
  correct?: number[]
  acceptedText?: string[]
}

export function drillBuilder(course: string) {
  const questions: Question[] = []
  function meta(module: string, objective: string, family: string, variant: number) {
    return {
      id: `${course}-${module.slice(0, 2)}-drill-${family}-${variant + 1}`,
      module,
      objectiveIds: [objective],
      mappingStatus: 'reviewed' as const,
      conceptId: `${course}-drill-${family}`,
      difficulty: 'medium' as const,
    }
  }
  function choices(
    module: string,
    objective: string,
    family: string,
    count: number,
    create: (index: number) => Drill,
  ) {
    for (let i = 0; i < count; i++) {
      const drill = create(i)
      const info = meta(module, objective, family, i)
      questions.push({
        ...info,
        text: text(drill.prompt),
        type: drill.type ?? 'single',
        code: drill.code,
        options: shuffle(
          drill.options.map((o, n) => ({ id: String(n), text: text(o) })),
          seededRandom(hashString(info.id)),
        ),
        correct: (drill.correct ?? [0]).map(String),
        acceptedText: drill.acceptedText,
        explanation: text(drill.explanation),
      })
    }
  }
  function cases(
    module: string,
    objective: string,
    family: string,
    count: number,
    title: Bilingual,
    items: AppliedCase[],
  ) {
    const seed = hashString(course + family)
    const random = seededRandom(seed)
    const triples: AppliedCase[][] = []
    for (let a = 0; a < items.length - 2; a++)
      for (let b = a + 1; b < items.length - 1; b++)
        for (let c = b + 1; c < items.length; c++)
          triples.push([items[a], items[b], items[c]])
    const selections = shuffle(triples, random)
    const direct = Math.min(items.length, Math.floor(count / 3))
    const matches = Math.min(selections.length, Math.ceil((count - direct) / 2))
    const makeExplanation = (rows: AppliedCase[]): Bilingual => [
      rows.map(([s, a]) => `${s[0]} → ${a[0]}`).join(' · '),
      rows.map(([s, a]) => `${s[1]} → ${a[1]}`).join(' · '),
    ]
    choices(module, objective, family, direct, (i) => {
      const item = items[i]
      return {
        prompt: [
          `${title[0]}: ${item[0][0]}. Ce alegi?`,
          `${title[1]}: ${item[0][1]}. What fits?`,
        ],
        options: [
          item[1],
          ...shuffle(
            items.filter((a) => a !== item),
            random,
          )
            .slice(0, 3)
            .map((a) => a[1]),
        ],
        explanation: makeExplanation([item]),
      }
    })
    for (let i = 0; i < matches; i++) {
      const rows = selections[i]
      questions.push({
        ...meta(module, objective, family, direct + i),
        type: 'matching',
        text: text([
          `Potrivește situațiile cu răspunsurile — ${title[0]}.`,
          `Match the situations to their answers — ${title[1]}.`,
        ]),
        pairs: rows.map(([s, a]) => ({ target: text(s), answer: text(a) })),
        explanation: text(makeExplanation(rows)),
      })
    }
    for (let i = 0; i < count - direct - matches; i++) {
      const [a, b, c] = selections[i]
      const info = meta(module, objective, family, direct + matches + i)
      const options = [a, b, [c[0], a[1]], [b[0], c[1]]] as AppliedCase[]
      questions.push({
        ...info,
        type: 'multiple',
        text: text([
          `Selectează cele două asocieri corecte — ${title[0]}.`,
          `Select the two correct associations — ${title[1]}.`,
        ]),
        options: shuffle(
          options.map((row, n) => ({
            id: String(n),
            text: text(makeExplanation([row])),
          })),
          random,
        ),
        correct: ['0', '1'],
        explanation: text(makeExplanation([a, b, c])),
      })
    }
  }
  return { questions, choices, cases }
}

export function numberOptions(correct: number, ...alternatives: number[]) {
  const values = new Set([correct, ...alternatives])
  for (let offset = 1; values.size < 4; offset++) values.add(correct + offset)
  return [...values].slice(0, 4).map(literal)
}
