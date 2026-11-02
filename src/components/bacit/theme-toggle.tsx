import { useI18n } from '@/lib/i18n'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
export function ThemeToggle() {
  const { t } = useI18n()
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={t(dark ? 'Activează tema luminoasă' : 'Activează tema întunecată')}
      title={t(dark ? 'Temă luminoasă' : 'Temă întunecată')}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
