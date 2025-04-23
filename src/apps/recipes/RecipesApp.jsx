import { useEffect, useState } from "react";
import { fetchRecipes } from "../../api/RecipesAPI";

function RecipesApp() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    const useMock = import.meta.env.VITE_USE_MOCK === "true";

    if (!useMock && !token) {
      setError("No access token found. Please log in.");
      return;
    }

    fetchRecipes({ token })
      .then(setRecipes)
      .catch((err) => setError(err.message));
  }, []);

  const apiUrl = import.meta.env.VITE_RECIPES_API_URL || "";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      {error && <p className="text-red-500">{error}</p>}
      {!error && recipes.length === 0 && <p>Loading recipes...</p>}

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {recipe.title}
            </h2>

            <p className="text-gray-600 italic mb-2">{recipe.description}</p>

            {recipe.image && (
              <img
                src={
                  recipe.image.startsWith("http")
                    ? recipe.image
                    : `${apiUrl}${recipe.image}`
                }
                alt={recipe.title}
                className="w-full max-w-md rounded mt-2 mb-4"
              />
            )}

            <p className="mb-1">
              <strong>Ingredients:</strong>{" "}
              <span className="text-gray-700">{recipe.ingredients}</span>
            </p>

            <p className="mb-1">
              <strong>Steps:</strong>{" "}
              <span className="text-gray-700">{recipe.steps}</span>
            </p>

            <p className="text-xs text-gray-500 mt-3">
              Created by user{" "}
              <span className="font-mono">{recipe.created_by}</span> on{" "}
              {new Date(recipe.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesApp;
