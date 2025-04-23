import { rest } from "msw";
import recipesData from "../data/recipesData";

// Create a mutable mock array
let mockRecipes = [...recipesData];
console.log("🔵 recipesHandlers loaded, recipesData:", mockRecipes);

// Deep clean function to remove undefined values
function removeUndefined(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (value === undefined ? null : value))
  );
}

export const recipesHandlers = [
  rest.get("/api/recipes", (req, res, ctx) => {
    console.log("🧭 [MSW] GET /api/recipes hit");
    try {
      if (!Array.isArray(mockRecipes)) throw new Error("mockRecipes is not an array");

      const cleaned = mockRecipes.map((r) => ({
        ...r,
        created_at: typeof r.created_at === "string"
          ? r.created_at
          : new Date(r.created_at).toISOString(),
      }));

      const safeData = removeUndefined(cleaned);

      console.log("✅ Responding with cleaned data:", safeData);
      return res(ctx.status(200), ctx.json(safeData));
    } catch (err) {
      console.error("🔥 Error in GET /api/recipes handler:", err);
      return res(
        ctx.status(500),
        ctx.json({ error: "Mock handler failed to serialize recipes." })
      );
    }
  }),

  rest.post("/api/recipes", async (req, res, ctx) => {
    try {
      const newRecipe = await req.json();
      newRecipe.id = Date.now();
      newRecipe.created_at = new Date().toISOString();
      mockRecipes.push(newRecipe);
      console.log("🧪 Created new recipe:", newRecipe);
      return res(ctx.status(201), ctx.json(newRecipe));
    } catch (err) {
      console.error("🧪 Error in POST /api/recipes", err);
      return res(ctx.status(500), ctx.json({ error: "Failed to create recipe" }));
    }
  }),

  rest.put("/api/recipes/:id", async (req, res, ctx) => {
    const { id } = req.params;
    try {
      const updates = await req.json();
      const index = mockRecipes.findIndex((r) => r.id == id);
      if (index !== -1) {
        mockRecipes[index] = { ...mockRecipes[index], ...updates };
        console.log("🧪 Updated recipe:", mockRecipes[index]);
        return res(ctx.status(200), ctx.json(mockRecipes[index]));
      }
      return res(ctx.status(404), ctx.json({ error: "Recipe not found" }));
    } catch (err) {
      console.error("🧪 Error in PUT /api/recipes", err);
      return res(ctx.status(500), ctx.json({ error: "Failed to update recipe" }));
    }
  }),

  rest.delete("/api/recipes/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = mockRecipes.findIndex((r) => r.id == id);
    if (index !== -1) {
      mockRecipes.splice(index, 1);
      console.log(`🧪 Deleted recipe with id ${id}`);
      return res(ctx.status(204));
    }
    return res(ctx.status(404), ctx.json({ error: "Recipe not found" }));
  }),
];