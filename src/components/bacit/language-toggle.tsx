import { Languages } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
export function LanguageToggle() {
  const { language, setLanguage, pick } = useI18n()
  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border bg-card p-0.5"
      role="group"
      aria-label={pick('Limba interfeței', 'Interface language')}
    >
      <Languages
        className="mx-1 hidden size-3.5 text-muted-foreground sm:block"
        aria-hidden
      />
      {(['ro', 'en'] as const).map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-pressed={language === value}
          onClick={() => setLanguage(value)}
          className={`rounded-md px-2 py-1.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring ${language === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
