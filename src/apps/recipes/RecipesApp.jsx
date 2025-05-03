import { useEffect, useState } from "react";
import { fetchRecipes, createRecipe, updateRecipe } from "../../api/RecipesAPI";
import imageOptions from "../../assets/recipeImages"; // ✅ import image options

function RecipesApp() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("access");
  const useMock = import.meta.env.VITE_USE_MOCK === "true";

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes({ token });
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (!useMock && !token) {
      setError("No access token found. Please log in.");
      return;
    }

    loadRecipes();
  }, [useMock, token]);

  const openCreatePanel = () => {
    setNewRecipe({ title: "", description: "", ingredients: "", steps: "", image: "" });
    setEditingId(null);
    setPanelOpen(true);
  };

  const openEditPanel = (recipe) => {
    setNewRecipe({
      title: recipe.title,
      description: recipe.description || "",
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image: recipe.image || "",
    });
    setEditingId(recipe.id);
    setPanelOpen(true);
  };

  const handleSubmitRecipe = async () => {
    try {
      if (editingId) {
        await updateRecipe(editingId, newRecipe, { token });
      } else {
        await createRecipe(newRecipe, { token });
      }
      setPanelOpen(false);
      const data = await fetchRecipes({ token });
      setRecipes(data);
    } catch (err) {
      console.error("Failed to submit recipe:", err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      <button
        onClick={openCreatePanel}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        ➕ Add New Recipe
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {!error && recipes.length === 0 && <p>Loading recipes...</p>}

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 relative flex items-start gap-4"
          >
            {recipe.image && (
              <img
                src={recipe.image.startsWith("http") ? recipe.image : `/images/${recipe.image}`}
                alt={recipe.title}
                className="w-32 h-32 object-contain rounded flex-shrink-0"
              />
            )}

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>

              <p className="text-gray-600 italic mb-2">{recipe.description}</p>

              <p className="mb-1">
                <strong>Ingredients:</strong>{" "}
                <span className="text-gray-700">{recipe.ingredients}</span>
              </p>

              <p className="mb-1">
                <strong>Steps:</strong>{" "}
                <span className="text-gray-700">{recipe.steps}</span>
              </p>

              <p className="text-xs text-gray-500 mt-3">
                Created by user <span className="font-mono">{recipe.created_by}</span> on{" "}
                {new Date(recipe.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => openEditPanel(recipe)}
              className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded text-sm"
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg transform ${
          isPanelOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Recipe" : "Create New Recipe"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={newRecipe.description}
            onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
          />

          <textarea
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
            rows="3"
          />

          <textarea
            placeholder="Steps"
            value={newRecipe.steps}
            onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
            rows="4"
          />

          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Select an Image</h3>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {imageOptions
                .filter(
                  (filename) =>
                    typeof filename === "string" &&
                    filename.trim() !== "" &&
                    filename.endsWith(".png")
                )
                .map((filename) => (
                  <img
                    key={filename}
                    src={`/images/${filename}`}
                    alt={filename}
                    onClick={() => setNewRecipe({ ...newRecipe, image: filename })}
                    className={`border-2 rounded cursor-pointer ${
                      newRecipe.image === filename ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                ))}
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleSubmitRecipe}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex-1"
            >
              {editingId ? "Save Changes" : "Create"}
            </button>

            <button
              onClick={() => setPanelOpen(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipesApp;