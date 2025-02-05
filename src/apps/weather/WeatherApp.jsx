import { useState } from "react";
import PropTypes from "prop-types";

function WeatherApp({ defaultLocation = "" }) {
  const [location, setLocation] = useState(defaultLocation);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!location.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.agomez.me/api/weather/combined-data?location=${encodeURIComponent(
          location
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setData(result);
      setError(""); // Clear previous errors
    } catch (err) {
      console.error(err);
      setError("Could not retrieve data. Try again.");
      setData(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* 🔹 Input Bar */}
      <div className="w-full max-w-md flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter a location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded shadow"
        />
        <button
          onClick={fetchWeatherData}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* 🔹 Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔹 Display Weather & Map */}
      {data && (
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">{data.weather.name}</h2>
          <p>🌡 Temp: {data.weather.main.temp}°C</p>
          <p>🌤 Condition: {data.weather.weather[0].description}</p>
          <p>💨 Wind Speed: {data.weather.wind.speed} m/s</p>

          {data.maps && data.maps.political_map && (
            <div className="mt-4 border-t pt-2">
              <h3 className="text-lg font-bold">🗺️ Map</h3>
              <img
                src={data.maps.political_map}
                alt="Map"
                className="w-full rounded-md shadow-md border"
                crossOrigin="anonymous"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 🔹 Add PropTypes
WeatherApp.propTypes = {
  defaultLocation: PropTypes.string,
};

export default WeatherApp;
