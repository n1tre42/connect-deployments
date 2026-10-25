import { useEffect, useState } from 'react'

const STORAGE_KEY = 'bacit-theme'
const EVENT = 'bacit-theme'

/** Inline script for <head>: applies the saved theme before first paint. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`

export type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore: the theme still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => {
    const sync = () =>
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    sync()
    window.addEventListener(EVENT, sync)
    return () => window.removeEventListener(EVENT, sync)
  }, [])
  return {
    theme,
    setTheme: applyTheme,
    toggle: () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}
