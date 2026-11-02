/* global self */
// Pinned runtime. The editor remains responsive while Python executes here.
let runtime
self.onmessage = async ({ data }) => {
  const { code, tests } = data
  let output = ''
  const append = (line) => {
    if (output.length < 20000) output += `${line}\n`
  }
  try {
    if (!runtime) {
      self.postMessage({ state: 'loading' })
      const { loadPyodide } =
        await import('https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs')
      runtime = await loadPyodide({ stdout: append, stderr: append })
    }
    runtime.setStdout({ batched: append })
    runtime.setStderr({ batched: append })
    const globals = runtime.runPython('dict(__name__="__main__")')
    self.postMessage({ state: 'running' })
    let passed = 0
    try {
      await runtime.runPythonAsync(code, { globals })
      for (const test of tests ?? []) {
        await runtime.runPythonAsync(test, { globals })
        passed++
      }
      self.postMessage({
        state: 'done',
        output,
        passed,
        total: tests?.length ?? 0,
      })
    } catch (error) {
      self.postMessage({
        state: 'done',
        output,
        error: error.message,
        passed,
        total: tests?.length ?? 0,
      })
    } finally {
      globals.destroy()
    }
  } catch (error) {
    runtime = undefined
    self.postMessage({
      state: 'done',
      output,
      error: error.message,
      passed: 0,
      infrastructure: true,
      total: tests?.length ?? 0,
    })
  }
}
