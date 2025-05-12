import { describe, test, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Contador } from './Contador'

describe('<Contador />', () => {
  test('debería mostrar el valor inicial', () => { 
      render(<Contador />)
      const contador = screen.getByText('Contador: 0')

      expect(contador).toBeInTheDocument()
   })
  
  test('debería incrementar el contador', () => { 
    render(<Contador />)
    const btn = screen.getByRole('button', { name: 'Incrementar' })
    
    fireEvent.click(btn)
    
    const contador = screen.getByText('Contador: 1')

    expect(contador).toBeInTheDocument()
  })
})