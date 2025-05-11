import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('<Button />', () => {
  test('Debería renderizar el botón', () => {
    render(<Button label='click' />)

    const button = screen.getByRole('button', { name: /click/i })

    expect(button).toBeInTheDocument()
  })

  test('Debería llamar a la función onClick', () => {
    // GIVEN
    const handleClick = vi.fn()

    render(<Button label='Click' onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /click/i })

    // WHEN
    fireEvent.click(button)

    // THEN
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})