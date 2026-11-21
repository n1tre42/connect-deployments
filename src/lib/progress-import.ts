import { z } from 'zod'

const safeKey = z
  .string()
  .min(1)
  .max(200)
  .refine((key) => !['__proto__', 'prototype', 'constructor'].includes(key))
const count = z.number().int().nonnegative().max(100_000_000)
const timestamp = z.number().finite().nonnegative()
const record = <T extends z.ZodType>(value: T) =>
  z.record(safeKey, value).refine((value) => Object.keys(value).length <= 10_000)
const profile = z
  .object({
    name: z.string().max(120).optional(),
    email: z.string().max(254).optional(),
    school: z.string().max(200).optional(),
    grade: z.string().max(50).optional(),
  })
  .strict()
const schema = z
  .object({
    watched: record(z.literal(true)).optional(),
    answers: record(
      z.object({ correct: z.boolean(), attempts: count, at: timestamp }).strict(),
    ).optional(),
    daily: z.record(z.string().regex(/^\d{4}-\d{2}-\d{2}$/), record(count)).optional(),
    dailyGoal: z.union([z.literal(10), z.literal(20), z.literal(30)]).optional(),
    xp: count.optional(),
    flagged: record(z.literal(true)).optional(),
    exams: z
      .array(
        z
          .object({
            id: safeKey,
            course: safeKey,
            variant: z.number().int().min(1).max(1000),
            percent: z.number().min(0).max(100),
            correct: count,
            total: count,
            at: timestamp,
            seconds: count,
            kind: z.literal('combined').optional(),
            domains: z
              .array(z.object({ module: safeKey, correct: count, total: count }).strict())
              .max(100),
          })
          .strict(),
      )
      .max(2000)
      .optional(),
    profile: profile.optional(),
    labs: record(
      z
        .object({ passed: z.boolean(), tests: count, total: count, at: timestamp })
        .strict(),
    ).optional(),
    labDrafts: record(z.string().max(100_000)).optional(),
    lastLesson: z.object({ course: safeKey, lesson: safeKey }).strict().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, 'Empty backup')

export function validateProgressImport(value: unknown) {
  const queue: { value: unknown; depth: number }[] = [{ value, depth: 0 }]
  let visited = 0
  while (queue.length) {
    const item = queue.pop()!
    if (++visited > 50000 || item.depth > 20) throw new Error('Backup is too complex')
    if (item.value && typeof item.value === 'object')
      for (const [key, child] of Object.entries(item.value)) {
        if (['__proto__', 'prototype', 'constructor'].includes(key))
          throw new Error('Unsafe backup key')
        queue.push({ value: child, depth: item.depth + 1 })
      }
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    'version' in value &&
    !('format' in value)
  ) {
    const legacy = z
      .object({
        version: z.literal(1),
        exportedAt: z.string().max(100),
        progress: z.unknown(),
      })
      .strict()
      .parse(value)
    return schema.parse(legacy.progress)
  }
  const candidate =
    typeof value === 'object' && value !== null && 'format' in value
      ? z
          .object({
            format: z.literal('bacit-progress'),
            version: z.literal(1),
            progress: z.unknown(),
          })
          .strict()
          .parse(value).progress
      : value
  return schema.parse(candidate)
}
