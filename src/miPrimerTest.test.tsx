import { describe, test, expect  } from 'vitest'

describe('Mi primer test', () => {
  test('la suma de dos números', () => {
    const sum = (a: number, b: number) => a + b

    expect(sum(2, 3)).toBe(5)
  })

  test('dos textos iguales', () => {
    const text1 = 'Chanchito Feliz'
    const text2 = 'Chanchito Feliz'

    expect(text1).toBe(text2)
  })
})