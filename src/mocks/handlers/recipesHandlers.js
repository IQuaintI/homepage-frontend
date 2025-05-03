// src/mocks/handlers/recipesHandlers.js
import { rest } from "msw";
import recipesData from "../data/recipesData";

// Create a mutable copy of mock data
let mockRecipes = [...recipesData];
console.log("🔵 [MSW] Recipes handler loaded:", mockRecipes);

// Helper: Clean undefined values
function removeUndefined(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (value === undefined ? null : value))
  );
}

export const recipesHandlers = [
  // GET all recipes
  rest.get("/api/recipes", (req, res, ctx) => {
    console.log("🧭 [MSW] GET /api/recipes hit");
    try {
      const cleaned = mockRecipes.map((r) => ({
        ...r,
        created_at: typeof r.created_at === "string"
          ? r.created_at
          : new Date(r.created_at).toISOString(),
      }));

      const safeData = removeUndefined(cleaned);
      console.log("✅ Responding with cleaned recipes:", safeData);
      return res(ctx.status(200), ctx.json(safeData));
    } catch (error) {
      console.error("🔥 Error serializing recipes:", error);
      return res(ctx.status(500), ctx.json({ error: "Failed to fetch recipes" }));
    }
  }),

  // POST a new recipe
  rest.post("/api/recipes", async (req, res, ctx) => {
    try {
      const newRecipe = await req.json();
      newRecipe.id = Date.now();
      newRecipe.created_at = new Date().toISOString();
      mockRecipes.push(newRecipe);

      console.log("🧪 Created new recipe:", newRecipe);
      return res(ctx.status(201), ctx.json(newRecipe));
    } catch (error) {
      console.error("🔥 Error creating recipe:", error);
      return res(ctx.status(500), ctx.json({ error: "Failed to create recipe" }));
    }
  }),

  // PUT update a recipe
  rest.put("/api/recipes/:id", async (req, res, ctx) => {
    const { id } = req.params;
    try {
      const updates = await req.json();
      const index = mockRecipes.findIndex(r => r.id == id);
      if (index !== -1) {
        mockRecipes[index] = { ...mockRecipes[index], ...updates };
        console.log("🧪 Updated recipe:", mockRecipes[index]);
        return res(ctx.status(200), ctx.json(mockRecipes[index]));
      } else {
        return res(ctx.status(404), ctx.json({ error: "Recipe not found" }));
      }
    } catch (error) {
      console.error("🔥 Error updating recipe:", error);
      return res(ctx.status(500), ctx.json({ error: "Failed to update recipe" }));
    }
  }),

  // DELETE a recipe
  rest.delete("/api/recipes/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = mockRecipes.findIndex(r => r.id == id);
    if (index !== -1) {
      mockRecipes.splice(index, 1);
      console.log(`🧪 Deleted recipe with id ${id}`);
      return res(ctx.status(204));
    } else {
      return res(ctx.status(404), ctx.json({ error: "Recipe not found" }));
    }
  }),
];
