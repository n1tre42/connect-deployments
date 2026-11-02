/* global process, fetch, AbortSignal, console */
import fs from 'node:fs'
// Read-only metadata lookup. No video content is downloaded.
fs.mkdirSync('.cache', { recursive: true })
const metadataPath = '.cache/video-verified.json'
const metadata = fs.existsSync(metadataPath)
  ? JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
  : {}
for (const id of process.argv.slice(2)) {
  try {
    const html = await (
      await fetch(`https://www.youtube.com/watch?v=${id}`, {
        signal: AbortSignal.timeout(20000),
      })
    ).text()
    const title = html.match(/"title":"((?:[^"\\]|\\.)*)"/)
    const seconds = html.match(/"lengthSeconds":"(\d+)"/)
    const item = {
      id,
      title: title ? JSON.parse(`"${title[1]}"`) : null,
      seconds: seconds ? Number(seconds[1]) : null,
    }
    metadata[id] = item
    console.log(JSON.stringify(item))
  } catch (error) {
    console.log(JSON.stringify({ id, error: error.message }))
  }
}
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
