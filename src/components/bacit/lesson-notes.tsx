import { Link } from '@tanstack/react-router'
import { BookOpen, Languages, ArrowRight } from 'lucide-react'
import { lessonNotes } from '@/data/lesson-notes'
import { functionCards } from '@/data/function-cards'
import type { Lesson } from '@/data/courses'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { CodePlayground } from './code-playground'
export function LessonNotes({
  lesson,
  courseId,
  moduleId,
}: {
  lesson: Lesson
  courseId: string
  moduleId: string
}) {
  const { pick } = useI18n()
  const notes = lessonNotes[lesson.youtubeId]
  const ng = courseId === 'python-next-generation'
  const featured = ng
    ? [
        'conversions',
        'range',
        'append-extend',
        'print-return',
        'with-open',
        'exceptions',
        'math',
      ]
    : ['conversions', 'range', 'with-open', 'print-return', 'exceptions', 'math']
  const card =
    functionCards.find(
      (c) => c.id === featured[Math.max(0, Number(moduleId.slice(0, 2)) - 1)],
    ) ?? functionCards[0]
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="border-b bg-accent/40 p-5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="size-5 text-primary" />
          {pick('Pe scurt, în română', 'Video essentials, in English')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {pick(
            'Repere selectate din transcrierea videoclipului. Explicațiile și exercițiile BacIt de mai jos sunt materiale proprii.',
            'Selected highlights from the video transcript. The BacIt explanations and exercises below are original material.',
          )}
        </p>
      </div>
      <div className="space-y-5 p-5">
        <ol className="space-y-3">
          {notes?.points.map((point, i) => (
            <li className="flex gap-3" key={i}>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-primary">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{pick(...point)}</p>
            </li>
          ))}
        </ol>
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Languages className="size-4 shrink-0" />
          {pick(
            'Sursă: videoclipul original și subtitrări ',
            'Source: original video and ',
          )}
          {notes?.captionKind === 'manual'
            ? pick('publicate de autor', 'uploader captions')
            : pick(
                'generate automat; pot conține erori',
                'automatically generated captions, which may contain errors',
              )}
          . {pick('Autor: ', 'Creator: ')}
          {lesson.source}.{' '}
          <a href={lesson.url} target="_blank" rel="noreferrer" className="underline">
            {pick('Deschide originalul', 'Open original')}
          </a>
        </p>
        {courseId.startsWith('python') && (
          <details className="rounded-xl border p-4">
            <summary className="cursor-pointer font-semibold">
              {pick('Exemplu BacIt: ', 'BacIt example: ')}
              {card.title}
            </summary>
            <div className="mt-4 space-y-4">
              <p className="text-sm">{pick(...card.purpose)}</p>
              <CodePlayground
                key={card.id}
                id={'lesson-' + lesson.id + '-code'}
                initialCode={card.code}
              />
              <p className="text-sm text-muted-foreground">{pick(...card.mistake)}</p>
              <Button asChild variant="outline">
                <Link to="/instrumente">
                  {pick('Toate funcțiile explicate', 'All function explanations')}
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </details>
        )}
        <p className="text-sm text-muted-foreground">
          {pick(
            'Aplică ideile în întrebările de după lecție. Explică de ce alternativa aleasă este corectă, nu doar memora răspunsul.',
            'Apply these ideas in the questions after the lesson. Explain why your choice is correct instead of only memorizing the answer.',
          )}
        </p>
      </div>
    </section>
  )
}
