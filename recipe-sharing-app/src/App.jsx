import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import useRecipeStore from './components/recipeStore'

function App() {
  return (
    <>
      <div>
        <AddRecipeForm />
        <RecipeList />
      </div>
    </>
  )
}

export default App
