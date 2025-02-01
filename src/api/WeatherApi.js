const API_BASE_URL = "https://agomez.me/"; // Replace with your backend's domain/IP

// Fetch combined data for a given location
export const fetchCombinedData = async (location) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/combined-data?location=${encodeURIComponent(location)}`
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
