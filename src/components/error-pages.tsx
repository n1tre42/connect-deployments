import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

export function NotFoundPage() {
  const { t } = useI18n()
  return (
    <div className="grid min-h-[60svh] place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('Pagina nu a fost găsită')}
        </h1>
        <p className="text-muted-foreground">
          {t(
            'Această pagină nu există. Verifică adresa sau revino la pagina principală.',
          )}
        </p>
        <Button asChild>
          <Link to="/">{t('Acasă')}</Link>
        </Button>
      </div>
    </div>
  )
}

export function RouteErrorPage({ reset }: ErrorComponentProps) {
  const router = useRouter()
  const { t } = useI18n()

  return (
    <div className="grid min-h-[60svh] place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('Pagina nu s-a încărcat')}
        </h1>
        <p role="alert" className="text-muted-foreground">
          {t('Încearcă din nou sau revino la pagina principală.')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              void router.invalidate()
              reset()
            }}
          >
            {t('Încearcă din nou')}
          </Button>
          <Button variant="outline" asChild>
            <a href="/">{t('Acasă')}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
