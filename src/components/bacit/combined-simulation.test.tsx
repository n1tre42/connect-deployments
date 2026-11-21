import { beforeEach, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import { NgRehearsal } from './ng-rehearsal'
import { LanguageProvider } from '@/lib/i18n'
import { getProgress, resetProgress } from '@/lib/progress'
import { runPython } from '@/lib/python-runner'
import { buildNgRehearsal } from '@/lib/ng-rehearsal'
vi.mock('@/lib/python-runner', () => ({ runPython: vi.fn() }))
beforeEach(() => {
  cleanup()
  sessionStorage.clear()
  resetProgress()
  localStorage.setItem('bacit-language', 'en')
  vi.mocked(runPython).mockReset()
})
const finish = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Finish section' }))
  fireEvent.click(screen.getByRole('button', { name: 'Confirm and continue' }))
}
it('locks sections, grades every lab and records one attempt', async () => {
  vi.mocked(runPython).mockImplementation(async (_code, tests = []) => ({
    output: '',
    passed: tests.length,
    total: tests.length,
  }))
  render(
    <LanguageProvider>
      <NgRehearsal kind="short" />
    </LanguageProvider>,
  )
  fireEvent.click(await screen.findByRole('button', { name: 'Start practice' }))
  finish()
  await screen.findByText('Task files')
  expect(
    screen.queryByRole('navigation', { name: 'Section questions' }),
  ).not.toBeInTheDocument()
  const plan = buildNgRehearsal(7919, 'short')
  for (const [i, l] of plan.labs.entries()) {
    fireEvent.click(screen.getByRole('button', { name: 'task-' + (i + 1) + '.py' }))
    const input = screen.getByLabelText('Your Python code') as HTMLTextAreaElement
    const prefix = input.value.split('\n').slice(0, 2).join('\n') + '\n'
    fireEvent.change(input, { target: { value: prefix + l.solution } })
  }
  finish()
  await screen.findByText('Practice result')
  expect(getProgress().exams).toHaveLength(1)
  expect(getProgress().exams[0]).toMatchObject({
    kind: 'combined',
    correct: 3,
    total: 15,
    percent: 20,
  })
  expect(runPython).toHaveBeenCalledTimes(4)
})
it('pauses on failed loading and retries without recording failure', async () => {
  vi.mocked(runPython).mockResolvedValueOnce({
    output: '',
    error: 'Network failure',
    infrastructure: true,
    passed: 0,
    total: 0,
  })
  render(
    <LanguageProvider>
      <NgRehearsal kind="exam" />
    </LanguageProvider>,
  )
  fireEvent.click(await screen.findByRole('button', { name: 'Start practice' }))
  finish()
  await screen.findByRole('alert')
  expect(getProgress().exams).toHaveLength(0)
  expect(getProgress().xp).toBe(0)
  vi.mocked(runPython).mockResolvedValue({ output: 'ready', passed: 0, total: 0 })
  fireEvent.click(screen.getByRole('button', { name: 'Retry loading' }))
  await waitFor(() => expect(screen.getByText('Task files')).toBeInTheDocument())
  expect(screen.getAllByRole('button', { name: /task-\d.py/ })).toHaveLength(7)
})
