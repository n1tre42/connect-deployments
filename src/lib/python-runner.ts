export type PythonResult = {
  output: string
  error?: string
  infrastructure?: boolean
  passed: number
  total: number
}

/** One worker per request: no variables or files leak between lab attempts. */
export function runPython(
  code: string,
  tests: string[] = [],
  onState?: (state: string) => void,
  signal?: AbortSignal,
): Promise<PythonResult> {
  return new Promise((resolve) => {
    const worker = new Worker('/python-worker.js', { type: 'module' })
    let timer: ReturnType<typeof setTimeout>
    let settled = false
    function finish(result: PythonResult) {
      if (settled) return
      settled = true
      clearTimeout(timer)
      signal?.removeEventListener('abort', abort)
      worker.terminate()
      resolve(result)
    }
    function abort() {
      finish({
        output: '',
        error: 'Execution stopped',
        passed: 0,
        total: tests.length,
      })
    }
    signal?.addEventListener('abort', abort, { once: true })
    worker.onerror = () =>
      finish({
        output: '',
        error: 'Python could not load. Check your connection and try again.',
        infrastructure: true,
        passed: 0,
        total: tests.length,
      })
    worker.onmessage = ({ data }) => {
      if (data.state === 'done') finish(data)
      else {
        onState?.(data.state)
        if (data.state === 'running') {
          clearTimeout(timer)
          timer = setTimeout(
            () =>
              finish({
                output: '',
                error: 'Execution time limit exceeded (10 s)',
                passed: 0,
                total: tests.length,
              }),
            10000,
          )
        }
      }
    }
    timer = setTimeout(
      () =>
        finish({
          output: '',
          error: 'Python download timed out. Check your connection and try again.',
          infrastructure: true,
          passed: 0,
          total: tests.length,
        }),
      120000,
    )
    if (signal?.aborted) abort()
    else worker.postMessage({ code, tests })
  })
}
