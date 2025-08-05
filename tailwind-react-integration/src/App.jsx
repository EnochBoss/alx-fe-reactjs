import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="bg-red-400 hover:bg-green-400 hover:text-white hover:text-md hover:cursor-pointer">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
