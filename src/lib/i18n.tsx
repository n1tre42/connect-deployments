import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { translations } from './translations'
import { messages } from '@/data/messages'

export type Language = 'ro' | 'en'
const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
}>({ language: 'ro', setLanguage: () => {} })

let memoryLanguage: Language = 'ro'
const languageListeners = new Set<() => void>()
function languageSnapshot(): Language {
  try {
    const saved = localStorage.getItem('bacit-language')
    if (saved === 'ro' || saved === 'en') memoryLanguage = saved
  } catch {
    /* Keep the in-memory preference. */
  }
  return memoryLanguage
}
function subscribeLanguage(listener: () => void) {
  languageListeners.add(listener)
  const onStorage = () => listener()
  window.addEventListener('storage', onStorage)
  return () => {
    languageListeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeLanguage,
    languageSnapshot,
    () => 'ro',
  )
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  function setLanguage(value: Language) {
    memoryLanguage = value
    try {
      localStorage.setItem('bacit-language', value)
    } catch {
      /* Session only. */
    }
    languageListeners.forEach((listener) => listener())
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function translate<T>(value: T, language: Language): T {
  if (typeof value !== 'string' || language === 'ro') return value
  const source = value.trim().replace(/\s+/g, ' ')
  const translated = translations[source] ?? messages[source]
  if (!translated) return value
  return (value.match(/^\s*/)?.[0] + translated + (value.match(/\s*$/)?.[0] ?? '')) as T
}

export function useI18n() {
  const context = useContext(LanguageContext)
  const t = useCallback(
    <T,>(value: T) => translate(value, context.language),
    [context.language],
  )
  return {
    ...context,
    locale: context.language === 'en' ? 'en-GB' : 'ro-RO',
    t,
    format: (pattern: string, values: unknown[]) =>
      translate(pattern, context.language).replace(/\{(\d+)\}/g, (_, i) =>
        String(translate(values[Number(i)], context.language)),
      ),
    pick: (ro: string, en: string) => (context.language === 'en' ? en : ro),
  }
}
