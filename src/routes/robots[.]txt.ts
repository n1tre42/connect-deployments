import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(
          `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', request.url).href}\n`,
          { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
        ),
    },
  },
})
