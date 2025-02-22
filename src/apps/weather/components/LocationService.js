const API_BASE_URL = "http://64.225.30.91/api"; // ✅ Use your backend server IP

// 🔹 Fetch Location Suggestions
export const fetchLocationSuggestions = async (query) => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/location-suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to fetch location suggestions");

    return await response.json();
  } catch (err) {
    console.error("Error fetching location suggestions:", err);
    return [];
  }
};

// 🔹 Fetch Weather Data
export const fetchWeatherData = async (selectedLocation) => {
  if (!selectedLocation.trim()) {
    throw new Error("Please enter a valid location.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/weather?location=${encodeURIComponent(selectedLocation)}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    return await response.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
};

