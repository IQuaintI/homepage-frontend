const API_BASE_URL = "https://www.agomez.me"; // Ensure it points to your backend

// Fetch combined weather & agriculture data for a given location
export const fetchCombinedData = async (location) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/weather/combined-data?location=${encodeURIComponent(location)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from backend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching combined data:", error);
    throw error;
  }
};

