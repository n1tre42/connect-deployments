import { useI18n } from '@/lib/i18n'
export function ScoreNote() {
  const { pick } = useI18n()
  return (
    <aside className="mb-5 rounded-xl border bg-accent p-4 text-sm">
      {pick(
        'Scor de antrenament BacIt. Scala afișată nu reproduce formula Certiport: 700 oficial nu înseamnă automat 70% răspunsuri corecte.',
        'BacIt practice score. This display does not reproduce the Certiport formula: an official 700 does not necessarily mean 70% correct answers.',
      )}{' '}
      <a
        className="font-semibold underline"
        href="https://certiport.pearsonvue.com/Educator-resources/Exam-policies/Scoring.aspx"
        target="_blank"
        rel="noreferrer"
      >
        {pick('Cum se calculează oficial', 'Official scoring policy')}
      </a>
    </aside>
  )
}
