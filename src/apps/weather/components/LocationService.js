const API_BASE_URL = import.meta.env.VITE_API_URL || "https://agomez.me/api/weather";

// 🔹 Fetch Location Suggestions
export const fetchLocationSuggestions = async (query) => {
  if (typeof query !== "string" || !query.trim()) return [];

  try {
    const response = await fetch(
      `${API_BASE_URL}/location-suggestions/?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location suggestions");
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (err) {
    console.error("Error fetching location suggestions:", err);
    return [];
  }
};

// 🔹 Fetch Weather Data
export const fetchWeatherData = async (selectedLocation) => {
  if (typeof selectedLocation !== "string" || !selectedLocation.trim()) {
    throw new Error("Please enter a valid location.");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/fetch/?location=${encodeURIComponent(selectedLocation)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
};