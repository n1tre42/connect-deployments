import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  const user = userEvent.setup()
  localStorage.setItem('bacit-language', 'ro')
  const view = render(
    <LanguageProvider>
      <Example />
    </LanguageProvider>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent('Cabinetul meu')
  await user.click(screen.getByRole('button', { name: 'Mai multe limbi' }))
  await user.click(screen.getByRole('menuitem', { name: 'English (EN)' }))
  await waitFor(() => expect(document.documentElement.lang).toBe('en'))
  expect(screen.getByRole('heading')).toHaveTextContent('My dashboard')
  expect(screen.getByText('Hello, Ana!')).toBeInTheDocument()
  expect(localStorage.getItem('bacit-language')).toBe('en')
  localStorage.setItem('bacit-progress-v1', '{"xp":12}')
  fireEvent.click(screen.getByRole('button', { name: 'RU' }))
  expect(document.documentElement.lang).toBe('ru')
  expect(screen.getByRole('heading')).toHaveTextContent('Мой кабинет')
  expect(localStorage.getItem('bacit-language')).toBe('ru')
  expect(localStorage.getItem('bacit-progress-v1')).toBe('{"xp":12}')
  view.unmount()
  render(
    <LanguageProvider>
      <Example />
    </LanguageProvider>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent('Мой кабинет')
  fireEvent.click(screen.getByRole('button', { name: 'RO' }))
  expect(screen.getByRole('heading')).toHaveTextContent('Cabinetul meu')
})
