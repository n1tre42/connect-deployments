import { useSyncExternalStore } from 'react'

/**
 * Learner progress, kept in localStorage so it works without an account.
 * All screens read it through `useProgress()` and update it through the
 * action functions below, which notify every subscribed component.
 */

export type AnswerRecord = { correct: boolean; attempts: number; at: number }

export type ExamDomainResult = { module: string; correct: number; total: number }

export type ExamRecord = {
  id: string
  course: string
  variant: number
  percent: number
  correct: number
  total: number
  at: number
  seconds: number
  domains: ExamDomainResult[]
}

export type Profile = {
  name: string
  email: string
  school: string
  grade: string
}

export type ProgressState = {
  watched: Record<string, true>
  answers: Record<string, AnswerRecord>
  /** Answers per day (YYYY-MM-DD) per course id. */
  daily: Record<string, Record<string, number>>
  dailyGoal: number
  xp: number
  flagged: Record<string, true>
  exams: ExamRecord[]
  profile: Profile
}

const STORAGE_KEY = 'bacit-progress-v1'

const defaultProfile: Profile = {
  name: 'Elev BacIt',
  email: '',
  school: '',
  grade: '',
}

const initialState: ProgressState = {
  watched: {},
  answers: {},
  daily: {},
  dailyGoal: 20,
  xp: 0,
  flagged: {},
  exams: [],
  profile: defaultProfile,
}

let state = initialState
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) state = { ...initialState, ...JSON.parse(raw) }
  } catch {
    state = initialState
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full or disabled: progress stays in memory for this visit.
  }
}

function update(fn: (s: ProgressState) => ProgressState) {
  load()
  state = fn(state)
  save()
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  load()
  return state
}

/** Current progress outside React (e.g. inside effects). */
export function getProgress() {
  return getSnapshot()
}

/** Progress as React state; the server render uses the empty initial state. */
export function useProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialState)
}

export function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function toggleWatched(lessonId: string) {
  update((s) => {
    const watched = { ...s.watched }
    if (watched[lessonId]) delete watched[lessonId]
    else watched[lessonId] = true
    return { ...s, watched }
  })
}

export function recordAnswer(
  questionId: string,
  correct: boolean,
  options: { daily?: string } = {},
) {
  update((s) => {
    const prev = s.answers[questionId]
    const answers = {
      ...s.answers,
      [questionId]: { correct, attempts: (prev?.attempts ?? 0) + 1, at: Date.now() },
    }
    let daily = s.daily
    if (options.daily) {
      const key = dayKey()
      const today = { ...(daily[key] ?? {}) }
      today[options.daily] = (today[options.daily] ?? 0) + 1
      daily = { ...daily, [key]: today }
    }
    return { ...s, answers, daily, xp: s.xp + (correct ? 10 : 2) }
  })
}

export function toggleFlag(questionId: string) {
  update((s) => {
    const flagged = { ...s.flagged }
    if (flagged[questionId]) delete flagged[questionId]
    else flagged[questionId] = true
    return { ...s, flagged }
  })
}

export function setDailyGoal(goal: number) {
  update((s) => ({ ...s, dailyGoal: goal }))
}

export function recordExam(exam: Omit<ExamRecord, 'id' | 'at'>) {
  const record: ExamRecord = {
    ...exam,
    id: `${exam.course}-${exam.variant}-${Date.now()}`,
    at: Date.now(),
  }
  // XP and mastery come from recordAnswer() calls for each exam question.
  update((s) => ({ ...s, exams: [...s.exams, record] }))
  return record
}

export function updateProfile(profile: Profile) {
  update((s) => ({ ...s, profile }))
}

export function resetProgress() {
  update(() => initialState)
}

export function answeredToday(s: ProgressState, courseId: string) {
  return s.daily[dayKey()]?.[courseId] ?? 0
}

export function answeredTodayTotal(s: ProgressState) {
  return dayTotal(s, dayKey())
}

function dayTotal(s: ProgressState, key: string) {
  return Object.values(s.daily[key] ?? {}).reduce((sum, n) => sum + (n ?? 0), 0)
}

/** Consecutive days with at least one practice answer, ending today or yesterday. */
export function streak(s: ProgressState) {
  let count = 0
  const day = new Date()
  if (!dayTotal(s, dayKey(day))) day.setDate(day.getDate() - 1)
  while (dayTotal(s, dayKey(day))) {
    count++
    day.setDate(day.getDate() - 1)
  }
  return count
}

export function history(s: ProgressState, days = 14) {
  const out: { day: string; label: string; count: number }[] = []
  const d = new Date()
  d.setDate(d.getDate() - (days - 1))
  for (let i = 0; i < days; i++) {
    const key = dayKey(d)
    out.push({
      day: key,
      label: d.toLocaleDateString('ro-RO', { weekday: 'short' }).slice(0, 2),
      count: dayTotal(s, key),
    })
    d.setDate(d.getDate() + 1)
  }
  return out
}

/** Percent of the given questions whose latest answer was correct. */
export function mastery(s: ProgressState, questionIds: string[]) {
  if (!questionIds.length) return 0
  const correct = questionIds.filter((id) => s.answers[id]?.correct).length
  return Math.round((correct / questionIds.length) * 100)
}
