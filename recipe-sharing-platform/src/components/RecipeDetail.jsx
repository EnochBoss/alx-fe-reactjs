import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipesData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = recipesData.find(r => String(r.id) === id);
    setRecipe(found);
  }, [id]);

  if (!recipe) {
    return <div className="p-4 text-center">Recipe not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500">&larr; Back to Home</Link>
      <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded" />
        <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
        <p className="text-gray-700 mt-2">{recipe.summary}</p>

        {recipe.ingredients && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;