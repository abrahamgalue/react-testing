import { describe, test, expect, vi, Mock, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useSession } from '../context/AuthContext'
import { getOrders } from '../services/getOrders'
import { useOrders } from './useOrders'

vi.mock('../context/AuthContext', () => ({
  useSession: vi.fn(),
}))

vi.mock('../services/getOrders', () => ({
  getOrders: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockNavigate = vi.fn()

describe('useOrders', () => {
  const mockUseSession = useSession as Mock
  const mockGetOrders = getOrders as Mock
  // const mockUseNavigate = useNavigate as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('debería obtener las ordenes', async () => {
    const mockOrders = [
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        customer: {
          id: '60d07f61-99bf-4b90-955b-5d3a7c9bb3d4',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        products: [
          {
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a2',
            name: 'Laptop',
            price: 999.99,
            quantity: 1,
          },
          {
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
            name: 'Mouse',
            price: 29.99,
            quantity: 1,
          },
        ],
        total: 1029.98,
        status: 'delivered',
        orderDate: '2023-10-01T10:00:00Z',
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
        },
        paymentMethod: 'credit_card',
      },
    ]

    mockGetOrders.mockResolvedValue(mockOrders)
    mockUseSession.mockReturnValue({ user: { id: 1 } })

    const { result, waitForNextUpdate } = renderHook(() => useOrders())

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.orders).toEqual(mockOrders)
    expect(result.current.error).toBe(null)
    expect(result.current.loading).toBe(false)
  })

  test('debería obtener un error cuando no encuentra las orders', async () => {
    const errorMessage = 'Failed to fetch orders. Please try again later.'
    mockGetOrders.mockRejectedValue(new Error(errorMessage))
    mockUseSession.mockReturnValue({ user: { id: 1 } })

    const { result, waitForNextUpdate } = renderHook(() => useOrders())

    expect(result.current.error).toBe(null)
    expect(result.current.orders).toStrictEqual([])
    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.orders).toStrictEqual([])
    expect(result.current.loading).toBe(false)
  })

  test('debería redirigir a / cuando no hay un user', async () => {
    mockUseSession.mockReturnValue({ user: null })

    renderHook(() => useOrders())

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
