/** Content registers its English counterpart without coupling data to React. */
export const translations: Record<string, string> = {}

export function bilingual(ro: string, en: string) {
  translations[ro] = en
  return ro
}

Object.assign(translations, {
  'Exerciții pe teme și formate': 'Practice by topic or format',
  'Scor pe scara 0–1000, promovare de la 700':
    'BacIt practice score — not an official Certiport score',
  'Scor de antrenament BacIt — nu este scorul oficial Certiport':
    'BacIt practice score — not an official Certiport score',
  'Testează ce ai înțeles': 'Test your understanding',
  '700 de puncte Certiport nu înseamnă automat 70% răspunsuri corecte. Pragul de 70% de aici este doar un obiectiv de antrenament.':
    '700 Certiport points do not necessarily mean 70% correct answers. The 70% threshold here is only a practice target.',
  'Variante de antrenament fără indicii până la predare. Scorul procentual BacIt nu reproduce formula normalizată Certiport. Pentru Python NG, folosește și repetiția pe secțiuni.':
    'Practice variants without hints until submission. The BacIt percentage score does not reproduce the Certiport scaled formula. For Python NG, also use the section-based rehearsal.',
})

Object.assign(translations, {
  Funcții: 'Functions',
  'întrebări de studiu': 'study questions',
  'Concepte exersate': 'Practiced concepts',
})

Object.assign(translations, {
  Scor: 'Practice score',
  Stăpânire: 'Practiced concepts',
  'Stăpânire pe cursuri': 'Practiced concepts',
  'Ordonare / Ordering': 'Ordering',
  'Completează / Fill in': 'Fill in',
})
