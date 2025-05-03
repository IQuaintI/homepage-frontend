import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (!res.ok) {
          console.error(`❌ Recipes fetch failed: HTTP ${res.status}`);
          return;
        }
        const data = await res.json();
        console.log("✅ Recipes fetched successfully:", data);
      } catch (err) {
        console.error("❌ Recipes fetch threw error:", err);
      }
    };

    fetchRecipes();
  }, []);

  return <h1>Hello World</h1>;
}

export default App;
