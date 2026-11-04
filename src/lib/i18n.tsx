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
import { russianTranslations } from '@/data/russian-translations'

export type Language = 'ro' | 'ru' | 'en'
const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
}>({ language: 'ro', setLanguage: () => {} })

let memoryLanguage: Language = 'ro'
const languageListeners = new Set<() => void>()

const seoCopy: Record<Language, { title: string; description: string }> = {
  ro: {
    title: 'BacIt — pregătire pentru examenele IT Specialist',
    description:
      'BacIt: lecții video, practică zilnică, glosar Certiport și simulări de examen pentru elevii din Moldova.',
  },
  ru: {
    title: 'BacIt — подготовка к экзаменам IT Specialist',
    description:
      'BacIt: видеоуроки, ежедневная практика, глоссарий Certiport и пробные экзамены для школьников и студентов Молдовы.',
  },
  en: {
    title: 'BacIt — IT Specialist exam preparation',
    description:
      'BacIt offers video lessons, daily practice, a Certiport glossary and exam simulations for learners in Moldova.',
  },
}

const pageSeo: Record<string, Record<Language, [string, string]>> = {
  '/': {
    ro: [seoCopy.ro.title, seoCopy.ro.description],
    ru: [seoCopy.ru.title, seoCopy.ru.description],
    en: [seoCopy.en.title, seoCopy.en.description],
  },
  '/cursuri': {
    ro: [
      'Cursuri IT Specialist · BacIt',
      'Alege cursul IT Specialist și pregătește-te cu lecții video, întrebări și simulări.',
    ],
    ru: [
      'Курсы IT Specialist · BacIt',
      'Выбери курс IT Specialist и готовься по видеоурокам, вопросам и пробным экзаменам.',
    ],
    en: [
      'IT Specialist courses · BacIt',
      'Choose an IT Specialist course and prepare with video lessons, questions and simulations.',
    ],
  },
  '/practica': {
    ro: [
      'Practică zilnică · BacIt',
      'Exersează zilnic întrebări IT Specialist și urmărește-ți progresul.',
    ],
    ru: [
      'Ежедневная практика · BacIt',
      'Решай вопросы IT Specialist каждый день и следи за прогрессом.',
    ],
    en: [
      'Daily practice · BacIt',
      'Practice IT Specialist questions every day and track your progress.',
    ],
  },
  '/simulari': {
    ro: [
      'Simulări de examen · BacIt',
      'Încearcă simulări cronometrate pentru examenele IT Specialist.',
    ],
    ru: [
      'Пробные экзамены · BacIt',
      'Пройди пробные экзамены IT Specialist с ограничением времени.',
    ],
    en: ['Exam simulations · BacIt', 'Try timed simulations for IT Specialist exams.'],
  },
  '/glosar': {
    ro: [
      'Glosar Certiport · BacIt',
      'Caută definiții și exemple pentru termenii din examenele IT Specialist.',
    ],
    ru: [
      'Глоссарий Certiport · BacIt',
      'Ищи определения и примеры терминов из экзаменов IT Specialist.',
    ],
    en: [
      'Certiport glossary · BacIt',
      'Browse definitions and examples for IT Specialist exam terms.',
    ],
  },
  '/cabinet': {
    ro: [
      'Cabinetul meu · BacIt',
      'Urmărește progresul, activitatea și rezultatele simulărilor tale.',
    ],
    ru: [
      'Мой кабинет · BacIt',
      'Следи за прогрессом, активностью и результатами пробных экзаменов.',
    ],
    en: [
      'My dashboard · BacIt',
      'Track your progress, activity and exam simulation results.',
    ],
  },
}

function updateSeo(language: Language) {
  const canonicalPath = window.location.pathname
  const path = canonicalPath.replace(/\/$/, '') || '/'
  const copy = pageSeo[path]?.[language] ?? [
    seoCopy[language].title,
    seoCopy[language].description,
  ]
  document.title = copy[0]
  const setMeta = (selector: string, attribute: string, value: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector)
    if (!element) {
      element = document.createElement('meta')
      const [key, keyValue] = selector.match(/\[(name|property)="([^"]+)"\]/)!.slice(1)
      element.setAttribute(key, keyValue)
      document.head.append(element)
    }
    if (element.getAttribute(attribute) !== value) element.setAttribute(attribute, value)
  }
  setMeta('meta[name="description"]', 'content', copy[1])
  setMeta('meta[property="og:title"]', 'content', copy[0])
  setMeta('meta[property="og:description"]', 'content', copy[1])
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }
  const canonicalHref = `${window.location.origin}${canonicalPath}`
  if (canonical.href !== canonicalHref) canonical.href = canonicalHref
}

function languageSnapshot(): Language {
  try {
    const saved = localStorage.getItem('bacit-language')
    if (saved === 'ro' || saved === 'ru' || saved === 'en') memoryLanguage = saved
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
    updateSeo(language)
    const observer = new MutationObserver(() => {
      if (
        document.title !==
        pageSeo[window.location.pathname.replace(/\/$/, '') || '/']?.[language]?.[0]
      ) {
        updateSeo(language)
      }
    })
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    })
    return () => observer.disconnect()
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
  const translated =
    language === 'ru'
      ? russianTranslations[source]
      : (translations[source] ?? messages[source])
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
    locale:
      context.language === 'en' ? 'en-GB' : context.language === 'ru' ? 'ru-MD' : 'ro-MD',
    t,
    format: (pattern: string, values: unknown[]) =>
      translate(pattern, context.language).replace(/\{(\d+)\}/g, (_, i) =>
        String(translate(values[Number(i)], context.language)),
      ),
    pick: (ro: string, en: string) =>
      context.language === 'en' ? en : translate(ro, context.language),
  }
}
