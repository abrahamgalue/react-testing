import { renderHook } from '@testing-library/react-hooks'
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useOrders } from './useOrders'
import { SessionProvider, useSession } from '../context/AuthContext'

vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext')

  return {
    ...actual,
    useSession: vi.fn(),
  }
})

describe('useOrders MSW', () => {
  const mockUser = { id: '1', name: 'Abraham Galue' }

  beforeEach(() => {
    ;(useSession as Mock).mockReturnValue({ user: mockUser })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SessionProvider>
  )

  test('debe obtener la data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrders(), {
      wrapper,
    })

    const initialLoading = result.current.loading

    expect(initialLoading).toBe(true)

    await waitForNextUpdate()

    const lengthOrders = result.current.orders.length

    expect(lengthOrders).toBe(1)
  })
})
