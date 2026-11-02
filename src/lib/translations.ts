/** Content registers its English counterpart without coupling data to React. */
export const translations: Record<string, string> = {}

export function bilingual(ro: string, en: string) {
  translations[ro] = en
  return ro
}
