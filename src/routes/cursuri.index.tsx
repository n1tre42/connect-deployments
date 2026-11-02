import { useI18n } from '@/lib/i18n'
import { createFileRoute } from '@tanstack/react-router'
import { CourseCard } from '@/components/bacit/course-card'
import { PageHeader } from '@/components/bacit/page-header'
import { courses } from '@/data/courses'
export const Route = createFileRoute('/cursuri/')({
  head: () => ({ meta: [{ title: 'Cursuri · BacIt' }] }),
  component: CoursesPage,
})
function CoursesPage() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow={t('Cursuri')}
        title={t('Alege examenul pentru care te pregătești')}
        description={t(
          'Lecții video de 15–20 de minute, întrebări noi cu explicații și simulări de examen. Python Next Generation adaugă 21 de laboratoare executabile.',
        )}
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  )
}
