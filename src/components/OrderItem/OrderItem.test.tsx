import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { OrderItem } from './OrderItem'
import type { Order } from '../../types/Orders'

vi.mock('../../components/StatusBadge', () => ({
  StatusBadge: ({ status }: { status: string }) => <span>{status}</span>,
}))

const mockOrder: Order = {
  id: '12345678abcdef',
  orderDate: '2023-12-01T15:30:00Z',
  status: 'shipped',
  customer: {
    name: 'Alice Johnson',
    email: 'alice@example.com',
  },
  products: [
    { id: 'p1', name: 'Laptop', quantity: 1, price: 1200 },
    { id: 'p2', name: 'Mouse', quantity: 2, price: 25 },
  ],
  paymentMethod: 'credit_card',
  total: 1250,
}

describe('OrderItem', () => {
  it('muestra el ID de la orden correctamente (primeros 8 caracteres)', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('Order #12345678')).toBeInTheDocument()
  })

  it('muestra la fecha formateada correctamente', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText(/Dec \d{1,2}, 2023/)).toBeInTheDocument()
  })

  it('muestra el estado de la orden', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('shipped')).toBeInTheDocument()
  })

  it('muestra el nombre y correo del cliente', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
  })

  it('muestra los productos con cantidad y precio total', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('Laptop x1')).toBeInTheDocument()
    expect(screen.getByText('$1200.00')).toBeInTheDocument()
    expect(screen.getByText('Mouse x2')).toBeInTheDocument()
    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })

  it('muestra el método de pago formateado', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('credit card')).toBeInTheDocument()
  })

  it('muestra el total correctamente formateado', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('$1250.00')).toBeInTheDocument()
  })
})
