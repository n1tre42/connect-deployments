import { Link } from '@tanstack/react-router'
import { Flame, Menu, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { streak, useProgress } from '@/lib/progress'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { to: '/cursuri', label: 'Cursuri' },
  { to: '/practica', label: 'Practica zilnică' },
  { to: '/simulari', label: 'Simulări examen' },
  { to: '/glosar', label: 'Glosar Certiport' },
] as const

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground motion-reduce:transition-none'
const activeClass = 'bg-accent !text-accent-foreground'

export function SiteHeader() {
  const progress = useProgress()
  const days = streak(progress)
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Sari la conținut
      </a>
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Principal" className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass}
              activeProps={{ className: activeClass }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="hidden items-center gap-3 rounded-full border bg-card px-3 py-1.5 text-sm font-semibold sm:flex"
            aria-label={`Serie de ${days} zile, ${progress.xp} puncte XP`}
          >
            <span className="flex items-center gap-1 text-streak">
              <Flame className="size-4" aria-hidden /> {days}
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Zap className="size-4" aria-hidden /> {progress.xp} XP
            </span>
          </div>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/cabinet">Cabinetul meu</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Deschide meniul"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>BacIt</SheetTitle>
                <SheetDescription>Pregătire pentru IT Specialist</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobil" className="grid gap-1 px-4">
                {[...navItems, { to: '/cabinet', label: 'Cabinetul meu' } as const].map(
                  (item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={linkClass + ' text-base'}
                      activeProps={{ className: activeClass }}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
