import { useState } from "react"

export const Contador = () => {
  const [contador, setContador] = useState(0)

  const handleIncrementar = () => setContador(contador + 1)

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={handleIncrementar}>Incrementar</button>
    </div>
  )
}