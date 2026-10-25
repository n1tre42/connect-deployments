import { createFileRoute } from '@tanstack/react-router'

import { CourseCard } from '@/components/bacit/course-card'
import { PageHeader } from '@/components/bacit/page-header'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/cursuri/')({
  head: () => ({ meta: [{ title: 'Cursuri · BacIt' }] }),
  component: CoursesPage,
})

function CoursesPage() {
  return (
    <div className="mx-auto max-w-content px-4 sm:px-6">
      <PageHeader
        eyebrow="Cursuri"
        title="Alege examenul pentru care te pregătești"
        description="Fiecare curs urmează obiectivele oficiale IT Specialist: lecții video și lecturi, 5–10 întrebări după fiecare lecție, resurse și trei simulări de examen."
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
