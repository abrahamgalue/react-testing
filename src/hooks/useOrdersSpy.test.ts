import {
  describe,
  test,
  expect,
  vi,
  MockInstance,
  beforeEach,
  Mock,
  afterEach,
} from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useOrders } from './useOrders'
import * as AuthContext from '../context/AuthContext'
import * as ReactRouter from 'react-router-dom'
import * as OrderService from '../services/getOrders'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('useOrdersSpy', () => {
  let useSessionSpy: MockInstance
  let getOrdersSpy: MockInstance
  const mockNavigate = vi.fn()

  beforeEach(() => {
    useSessionSpy = vi.spyOn(AuthContext, 'useSession')
    getOrdersSpy = vi.spyOn(OrderService, 'getOrders')
    ;(ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate)

    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('debería mostrar un error', async () => {
    useSessionSpy.mockReturnValue({ user: { id: 1 } })
    getOrdersSpy.mockRejectedValue(new Error('API error'))
    const { result, waitForNextUpdate } = renderHook(() => useOrders())

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeNull()

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(
      'Failed to fetch orders. Please try again later.'
    )
    expect(getOrdersSpy).toHaveBeenCalledTimes(1)
  })
})
