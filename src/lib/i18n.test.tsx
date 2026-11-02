import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'
import { LanguageProvider, useI18n } from './i18n'
import { LanguageToggle } from '@/components/bacit/language-toggle'
import { questionsFor } from '@/data/questions'

function Example() {
  const { t, format } = useI18n()
  return (
    <>
      <LanguageToggle />
      <h1>{t('Cabinetul meu')}</h1>
      <p>{format('Salut, {0}!', ['Ana'])}</p>
      <p>{t(questionsFor('python')[0].explanation)}</p>
    </>
  )
}
it('switches content and document language, persists the choice, and restores it on mount', async () => {
  localStorage.setItem('bacit-language', 'ro')
  const view = render(
    <LanguageProvider>
      <Example />
    </LanguageProvider>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent('Cabinetul meu')
  fireEvent.click(screen.getByRole('button', { name: 'EN' }))
  await waitFor(() => expect(document.documentElement.lang).toBe('en'))
  expect(screen.getByRole('heading')).toHaveTextContent('My dashboard')
  expect(screen.getByText('Hello, Ana!')).toBeInTheDocument()
  expect(localStorage.getItem('bacit-language')).toBe('en')
  view.unmount()
  render(
    <LanguageProvider>
      <Example />
    </LanguageProvider>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent('My dashboard')
  fireEvent.click(screen.getByRole('button', { name: 'RO' }))
  expect(screen.getByRole('heading')).toHaveTextContent('Cabinetul meu')
})
