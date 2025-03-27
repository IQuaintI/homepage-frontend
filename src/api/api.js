const API_BASE_URL = import.meta.env.VITE_API_URL || "https://agomez.me/api";

export const fetchSampleData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/endpoint`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sample data:", error);
    throw error;
  }
};