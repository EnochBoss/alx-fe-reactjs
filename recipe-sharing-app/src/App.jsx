import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import useRecipeStore from './components/recipeStore'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'


const RecipeDetailsPage = () => {
  const { id } = useParams();
  return <RecipeDetails recipeId={id} />;
};

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RecipeDetails />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          </Routes>
        </BrowserRouter>

        <FavoritesList />
        <RecommendationsList />

        <AddRecipeForm />
        <RecipeList />

        
      </div>
    </>
  )
}

export default App
