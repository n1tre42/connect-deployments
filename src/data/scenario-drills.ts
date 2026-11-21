import { literal, type Bilingual, type drillBuilder } from './drill-builder'

export function readPair(value: string): Bilingual {
  const [ro, en] = value.split('|')
  return en ? [ro, en] : literal(ro)
}
export function readCases(rows: string[]) {
  return rows.map((row) => {
    const parts = row.split(' > ')
    if (parts.length !== 2 || parts.some((part) => !part.trim())) {
      throw new Error('Expected a situation and an answer: ' + row)
    }
    return [readPair(parts[0]), readPair(parts[1])] as const
  })
}
export function addCases(
  bank: ReturnType<typeof drillBuilder>,
  module: string,
  objective: string,
  family: string,
  count: number,
  title: string,
  rows: string[],
) {
  bank.cases(module, objective, family, count, readPair(title), readCases(rows))
}
