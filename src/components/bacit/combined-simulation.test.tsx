import { beforeEach, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CombinedSimulation } from '@/routes/python-next-generation'
import { LanguageProvider } from '@/lib/i18n'
import { getProgress, resetProgress } from '@/lib/progress'
import { runPython } from '@/lib/python-runner'
import { questionsFor } from '@/data/questions'
import { pythonLabs } from '@/data/python-labs'
import { seededRandom, shuffle } from '@/lib/random'

vi.mock('@/lib/python-runner', () => ({ runPython: vi.fn() }))
beforeEach(() => {
  resetProgress()
  localStorage.setItem('bacit-language', 'en')
  vi.mocked(runPython).mockReset()
})
it('grades theory and all three executable labs together and records one result', async () => {
  vi.mocked(runPython).mockImplementation(async (_code, tests = []) => ({
    output: '',
    passed: tests.length,
    total: tests.length,
  }))
  render(
    <LanguageProvider>
      <CombinedSimulation />
    </LanguageProvider>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Start combined simulation' }))
  const questions = shuffle(
    questionsFor('python-next-generation'),
    seededRandom(7919),
  ).slice(0, 12)
  for (const question of questions) {
    if (question.type === 'matching') throw new Error('Unexpected matching question')
    for (const id of question.correct)
      fireEvent.click(
        screen.getByRole('radio', {
          name: question.options.find((o) => o.id === id)!.text,
        }),
      )
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  }
  const labs = shuffle(pythonLabs, seededRandom(7920)).slice(0, 3)
  for (let i = 0; i < labs.length; i++) {
    fireEvent.change(screen.getByLabelText('Your Python code'), {
      target: { value: labs[i].solution },
    })
    if (i < labs.length - 1) fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  }
  fireEvent.click(screen.getByRole('button', { name: 'Submit simulation' }))
  await screen.findByText('1000/1000')
  expect(runPython).toHaveBeenCalledTimes(3)
  expect(getProgress().exams).toHaveLength(1)
  expect(getProgress().exams[0]).toMatchObject({
    kind: 'combined',
    percent: 100,
    correct: 15,
    total: 15,
  })
  expect(getProgress().xp).toBe(195)
})
it('does not grade download failures and allows retrying without duplicating progress', async () => {
  vi.mocked(runPython).mockResolvedValue({
    output: '',
    error: 'Network failure',
    infrastructure: true,
    passed: 0,
    total: 3,
  })
  render(
    <LanguageProvider>
      <CombinedSimulation />
    </LanguageProvider>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Start combined simulation' }))
  fireEvent.click(screen.getByRole('button', { name: 'Submit simulation' }))
  await screen.findByRole('alert')
  expect(getProgress().exams).toHaveLength(0)
  expect(getProgress().xp).toBe(0)
  vi.mocked(runPython).mockImplementation(async (_code, tests = []) => ({
    output: '',
    error: 'NotImplementedError',
    passed: 0,
    total: tests.length,
  }))
  fireEvent.click(screen.getByRole('button', { name: 'Retry checking' }))
  await waitFor(() => expect(getProgress().exams).toHaveLength(1))
  expect(getProgress().exams[0].correct).toBe(0)
})
