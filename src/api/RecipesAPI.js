const useMock = import.meta.env.VITE_USE_MOCK === "true";
const BASE_URL = useMock ? "/api/recipes" : import.meta.env.VITE_RECIPES_API_URL;

const buildHeaders = (token) =>
  useMock
    ? {}
    : {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

export const fetchRecipes = async ({ token } = {}) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: buildHeaders(token),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("🛑 fetchRecipes failed:", res.status, text);
      throw new Error("Failed to fetch recipes.");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("🛑 fetchRecipes error:", err);
    throw err;
  }
};

export const createRecipe = async (recipe, { token }) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(recipe),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("🛑 createRecipe failed:", res.status, text);
      throw new Error("Failed to create recipe.");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("🛑 createRecipe error:", err);
    throw err;
  }
};

export const updateRecipe = async (id, recipe, { token }) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(recipe),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("🛑 updateRecipe failed:", res.status, text);
      throw new Error("Failed to update recipe.");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("🛑 updateRecipe error:", err);
    throw err;
  }
};

export const deleteRecipe = async (id, { token }) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("🛑 deleteRecipe failed:", res.status, text);
      throw new Error("Failed to delete recipe.");
    }
  } catch (err) {
    console.error("🛑 deleteRecipe error:", err);
    throw err;
  }
};
