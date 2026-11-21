import { questionsFor } from '@/data/questions'
import { pythonLabs } from '@/data/python-labs'
import { seededRandom, shuffle } from './random'
export const ngFormats = {
  exam: { first: 16, labs: 7, last: 8, minutes: 50 },
  short: { first: 12, labs: 3, last: 0, minutes: 45 },
} as const
export function buildNgRehearsal(
  seed: number,
  kind: keyof typeof ngFormats,
  legacy = false,
) {
  const format = ngFormats[kind],
    random = seededRandom(seed)
  const concepts = new Map<string, ReturnType<typeof questionsFor>[number]>()
  const bank = questionsFor('python-next-generation').filter(
    (q) => !legacy || q.type !== 'matching',
  )
  for (const q of shuffle(bank, random))
    if (!concepts.has(q.conceptId ?? q.id)) concepts.set(q.conceptId ?? q.id, q)
  const pool = [...concepts.values()],
    modules = [...new Set(pool.map((q) => q.module))]
  const ordered = modules.flatMap((module) =>
    pool
      .filter((q) => q.module === module)
      .slice(0, Math.ceil((format.first + format.last) / modules.length)),
  )
  const questions = shuffle(
    [...new Map([...ordered, ...pool].map((q) => [q.id, q])).values()].slice(
      0,
      format.first + format.last,
    ),
    random,
  )
  const labModules = [...new Set(pythonLabs.map((l) => l.module))]
  const labs = shuffle(
    labModules.flatMap((module) =>
      shuffle(
        pythonLabs.filter((l) => l.module === module),
        random,
      ).slice(0, 1),
    ),
    random,
  ).slice(0, format.labs)
  return { format, questions, labs }
}
