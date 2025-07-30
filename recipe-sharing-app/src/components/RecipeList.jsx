import useRecipeStore from './recipeStore';

  const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
    const searchTerm = useRecipeStore((state) => state.searchTerm);
    const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
   };

    return (
      <div>
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search recipes..."
      />
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))},

        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    );
  };

  export default RecipeList