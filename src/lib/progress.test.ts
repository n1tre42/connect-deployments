import { beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})
it('loads existing learner data and merges new lab defaults', async () => {
  localStorage.setItem(
    'bacit-progress-v1',
    JSON.stringify({ xp: 42, watched: { old: true }, profile: { name: 'Ana' } }),
  )
  const { getProgress } = await import('./progress')
  const progress = getProgress()
  expect(progress.xp).toBe(42)
  expect(progress.watched.old).toBe(true)
  expect(progress.profile).toEqual({ name: 'Ana', email: '', school: '', grade: '' })
  expect(progress.labs).toEqual({})
  expect(progress.labDrafts).toEqual({})
})
it('saves drafts and awards lab XP only once without erasing a completed lab', async () => {
  const { recordLab, saveLabDraft, getProgress, resetProgress } =
    await import('./progress')
  saveLabDraft('lab-1', 'print(42)')
  recordLab('lab-1', 1, 3)
  expect(getProgress().xp).toBe(0)
  recordLab('lab-1', 3, 3)
  recordLab('lab-1', 3, 3)
  recordLab('lab-1', 0, 3)
  expect(getProgress().xp).toBe(25)
  expect(getProgress().labs['lab-1'].passed).toBe(true)
  expect(JSON.parse(localStorage.getItem('bacit-progress-v1')!).labDrafts['lab-1']).toBe(
    'print(42)',
  )
  resetProgress()
  expect(getProgress().labs).toEqual({})
  expect(getProgress().labDrafts).toEqual({})
})
