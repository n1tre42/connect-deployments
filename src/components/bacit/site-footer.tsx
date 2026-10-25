import { Link } from '@tanstack/react-router'

import { courses } from '@/data/courses'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Pregătire gratuită pentru examenele IT Specialist, pentru elevii și studenții
            din Moldova.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Cursuri</h2>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  to="/cursuri/$courseId"
                  params={{ courseId: course.id }}
                  className="hover:text-foreground"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Învață</h2>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/practica" className="hover:text-foreground">
                Practica zilnică
              </Link>
            </li>
            <li>
              <Link to="/simulari" className="hover:text-foreground">
                Simulări de examen
              </Link>
            </li>
            <li>
              <Link to="/glosar" className="hover:text-foreground">
                Glosar Certiport
              </Link>
            </li>
            <li>
              <Link to="/cabinet" className="hover:text-foreground">
                Cabinetul meu
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-content px-4 pb-8 text-xs text-muted-foreground sm:px-6">
        Proiect educațional independent. Nu este afiliat, sponsorizat sau aprobat de
        Certiport, Pearson VUE sau Microsoft. „Certiport” și „IT Specialist” sunt mărci ale
        proprietarilor lor. Întrebările sunt originale, scrise după obiectivele publice ale
        examenelor.
      </p>
    </footer>
  )
}
