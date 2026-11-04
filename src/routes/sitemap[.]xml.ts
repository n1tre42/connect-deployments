import { createFileRoute } from '@tanstack/react-router'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin
        const paths = [
          '/',
          '/cursuri/',
          '/practica/',
          '/simulari/',
          '/glosar',
          ...courses.flatMap((course) => [
            `/cursuri/${course.id}`,
            `/practica/${course.id}`,
            ...[1, 2, 3].map((variant) => `/simulari/${course.id}/${variant}`),
          ]),
          '/python-next-generation',
        ]
        const urls = paths
          .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
          .join('\n')
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
          { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
        )
      },
    },
  },
})
