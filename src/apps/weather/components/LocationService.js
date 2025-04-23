// src/weather/components/LocationService.js

const baseURL = import.meta.env.VITE_API_URL || "/api/weather";

// 🔹 Fetch Location Suggestions
export const fetchLocationSuggestions = async (query) => {
  if (typeof query !== "string" || !query.trim()) return [];

  try {
    const response = await fetch(
      `${baseURL}/location-suggestions/?query=${encodeURIComponent(query)}`
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
export const fetchWeatherData = async (location) => {
  if (typeof location !== "string" || !location.trim()) {
    throw new Error("Please enter a valid location.");
  }

  try {
    const response = await fetch(
      `${baseURL}/fetch/?location=${encodeURIComponent(location)}`
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
