import { describe, test, expect, vi, Mock } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SessionProvider } from '../../context/AuthContext'
import { Login } from './Login'
import { getAuth } from '../../services/getAuth'

vi.mock('../../services/getAuth', () => ({
  getAuth: vi.fn(),
}))

const mockGetAuth = getAuth as Mock

describe('<Login />', () => {
  test('debería mostrar un mensaje de error', async () => {
    mockGetAuth.mockRejectedValue(new Error('Invalid credentials'))
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const buttonLogin = screen.getByRole('button', { name: 'Login' })

    await act(() => {
      fireEvent.change(usernameInput, { target: { value: 'WrongUser' } })
      fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } })
      fireEvent.click(buttonLogin)
    })

    const errorMessage = screen.getByText('Invalid credentials')
    expect(errorMessage).toBeInTheDocument()
  })
})
