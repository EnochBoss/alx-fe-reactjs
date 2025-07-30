import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => state.recipes.find((recipe) => recipe.id === id))
  );

  const allRecipes = useRecipeStore((state) => state.recipes);
  const favoriteIds = useRecipeStore((state) => state.favorites);

  // Extract keywords from favorite titles
  const keywords = favorites
    .flatMap((recipe) => recipe?.title?.toLowerCase().split(' ') || [])
    .filter(Boolean);

  // Recommend recipes not in favorites, but with matching keywords in title
  const recommendations = allRecipes.filter((recipe) => {
    if (favoriteIds.includes(recipe.id)) return false;
    const titleWords = recipe.title.toLowerCase().split(' ');
    return titleWords.some((word) => keywords.includes(word));
  });

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.length > 0 ? (
        recommendations.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations yet. Favorite some recipes to get started!</p>
      )}
    </div>
  );
};

export default RecommendationsList;