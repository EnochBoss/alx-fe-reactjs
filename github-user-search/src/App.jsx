import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './components/Search';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>GitHub User Search</h1>
        <Search />
      </div>
    </>
  )
}

export default App
