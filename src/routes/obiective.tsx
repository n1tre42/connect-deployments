import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/bacit/page-header'
import { CourseAlignment } from '@/components/bacit/course-alignment'
import { courses } from '@/data/courses'
import { useI18n } from '@/lib/i18n'
export const Route = createFileRoute('/obiective')({
  validateSearch: (s: Record<string, unknown>) => ({
    curs: typeof s.curs === 'string' ? s.curs : 'python',
  }),
  component: ObjectivesPage,
})
function ObjectivesPage() {
  const { pick, t } = useI18n()
  const { curs } = Route.useSearch()
  const navigate = Route.useNavigate()
  const selected = courses.find((c) => c.id === curs) ?? courses[0]
  return (
    <div className="mx-auto max-w-content px-4 pb-12 sm:px-6">
      <PageHeader
        eyebrow={pick('Programă și progres', 'Curriculum and progress')}
        title={pick('Ce trebuie să știi la examen', 'What you need to know for the exam')}
        description={pick(
          'Alege cursul, găsește o temă și exersează întrebările pregătite pentru ea.',
          'Choose a course, find a topic, and practice the exercises prepared for it.',
        )}
      />
      <label htmlFor="objective-course" className="mb-2 block text-sm font-semibold">
        {pick('Alege cursul', 'Choose a course')}
      </label>
      <select
        id="objective-course"
        value={selected.id}
        onChange={(e) => void navigate({ search: { curs: e.target.value } })}
        className="mb-6 w-full max-w-xl rounded-lg border bg-card p-3"
      >
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {t(c.title)}
          </option>
        ))}
      </select>
      <CourseAlignment key={selected.id} courseId={selected.id} expanded />
    </div>
  )
}
