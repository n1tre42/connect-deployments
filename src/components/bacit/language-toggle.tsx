import { Languages, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
export function LanguageToggle() {
  const { language, setLanguage, pick } = useI18n()
  const activePrimary = language === 'en' ? 'ro' : language
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
      {(['ro', 'ru'] as const).map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-pressed={language === value}
          onClick={() => setLanguage(value)}
          className={`rounded-md px-2 py-1.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring ${activePrimary === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
        >
          {value.toUpperCase()}
        </button>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={pick('Mai multe limbi', 'More languages')}
            className={`h-7 gap-1 px-1.5 text-xs ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            {language === 'en' ? 'EN' : <ChevronDown className="size-3.5" aria-hidden />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-28">
          <DropdownMenuItem lang="en" onSelect={() => setLanguage('en')}>
            English (EN)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
