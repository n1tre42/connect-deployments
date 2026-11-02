/* global process, fetch, AbortSignal, console */
import fs from 'node:fs'
fs.mkdirSync('.cache', { recursive: true })
for (const query of process.argv.slice(2)) {
  const html = await (
    await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(20000) },
    )
  ).text()
  const raw = html.match(/var ytInitialData = (.*?);<\/script>/s)?.[1]
  if (!raw) {
    console.log('No data: ' + query)
    continue
  }
  const matches = []
  function visit(node) {
    if (!node || typeof node !== 'object') return
    if (node.videoRenderer) {
      const v = node.videoRenderer
      const duration = v.lengthText?.simpleText
      const parts = duration?.split(':').map(Number)
      const seconds = parts?.reduce((a, x) => a * 60 + x, 0)
      if (seconds >= 900 && seconds <= 1200)
        matches.push({
          id: v.videoId,
          title: v.title?.runs?.map((x) => x.text).join(''),
          source: v.ownerText?.runs?.[0]?.text,
          duration,
          seconds,
        })
    }
    for (const value of Object.values(node)) if (typeof value === 'object') visit(value)
  }
  visit(JSON.parse(raw))
  fs.writeFileSync(
    `.cache/${query.replace(/[^a-z0-9]/gi, '-')}.json`,
    JSON.stringify(matches, null, 2),
  )
  console.log(JSON.stringify({ query, matches: matches.slice(0, 6) }))
}
