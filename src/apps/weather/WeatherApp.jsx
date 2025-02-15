import { useState } from "react";
import PropTypes from "prop-types";
import LocationInfo from "../../apps/weather/components/LocationInfo";
import { Input } from "../../components/weather/Input";
import { Button } from "../../components/weather/Button";

function WeatherApp({ defaultLocation = "" }) {
  const [location, setLocation] = useState(defaultLocation);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // 🔹 Fetch Weather & Wikipedia Summary Data
  const fetchWeatherData = async (selectedLocation) => {
    if (!selectedLocation.trim() || loading) return; // Prevent duplicate requests

    setLoading(true); // Start loading

    try {
      // 🔹 Fetch Exact Location from OpenStreetMap
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(selectedLocation)}&addressdetails=1&limit=1`
      );

      if (!locationResponse.ok) throw new Error("Failed to fetch location data");

      const locationResult = await locationResponse.json();
      if (locationResult.length === 0) throw new Error("No valid location found");

      // 🔹 Extract Proper Location Format (e.g., "Orlando, Florida, United States")
      const { lat, lon, display_name, address } = locationResult[0];

      console.log("Verified Location:", display_name);
      console.log("Latitude & Longitude:", lat, lon);

      // 🔹 Format Wikipedia Search Term: "City, State"
      let wikiSearchTerm = address.city || address.town || address.village || address.state;
      if (address.state) {
        wikiSearchTerm += `, ${address.state}`;
      }
      console.log("Wikipedia Search Term (First Attempt):", wikiSearchTerm);

      // 🔹 Fetch Weather Data
      const weatherResponse = await fetch(
        `https://www.agomez.me/api/weather/combined-data?location=${encodeURIComponent(display_name)}`
      );

      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");

      const weatherResult = await weatherResponse.json();
      console.log("Weather Data:", weatherResult);

      // 🔹 Fetch Wikipedia Summary Using "City, State"
      let wikiSummary = "No summary available.";
      let wikiResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSearchTerm)}`
      );

      if (!wikiResponse.ok) {
        console.log("Wikipedia search failed. Retrying with City only...");
        
        // 🔹 Fallback: Try Searching Only "City"
        const fallbackTerm = address.city || address.town || address.village || address.state;
        console.log("Wikipedia Search Term (Retry):", fallbackTerm);

        wikiResponse = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(fallbackTerm)}`
        );
      }

      if (wikiResponse.ok) {
        const wikiResult = await wikiResponse.json();
        if (wikiResult.extract && !wikiResult.extract.startsWith(`${wikiSearchTerm} commonly refers to:`)) {
          wikiSummary = wikiResult.extract;
        }
      }

      console.log("Wikipedia Summary:", wikiSummary);

      // 🔹 Set the State with Weather, Wiki Summary, and Coordinates
      setData({
        ...weatherResult,
        summary: wikiSummary,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      });

      setError("");
      setSuggestions([]);
    } catch (err) {
      console.error(err);
      setError("Could not retrieve data. Try again.");
      setData(null);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  // 🔹 Fetch Location Suggestions (Using OpenStreetMap) with Debounce
  const fetchLocationSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout); // ✅ Cancel previous API call
    }

    setTypingTimeout(
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
          );

          if (!response.ok) throw new Error("Failed to fetch location suggestions");

          const result = await response.json();

          // 🔹 Convert result to "City, State, Country" format
          const formattedSuggestions = result
            .filter((place) => place.address && (place.address.city || place.address.town || place.address.village))
            .map((place) => place.display_name); // ✅ Use `display_name` from OSM

          setSuggestions([...new Set(formattedSuggestions)]); // ✅ Remove duplicates
        } catch (err) {
          console.error("Error fetching location suggestions:", err);
          setSuggestions([]);
        }
      }, 500) // ✅ Delay API call by 500ms to prevent spam requests
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* 🔹 Input Section */}
      <div className="w-full max-w-md flex flex-col relative mb-6">
        <Input
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            fetchLocationSuggestions(e.target.value);
          }}
          placeholder="Enter a location..."
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1 z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setLocation(suggestion);
                  fetchWeatherData(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <Button onClick={() => fetchWeatherData(location)} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      {/* 🔹 Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔹 Display Weather Info */}
      {data && (
        <LocationInfo
          temperature={data.weather.main.temp}
          condition={data.weather.weather[0].description}
          windSpeed={data.weather.wind.speed}
          summary={data.summary} 
          lat={data.lat} 
          lon={data.lon}
        />
      )}
    </div>
  );
}

WeatherApp.propTypes = {
  defaultLocation: PropTypes.string,
};

export default WeatherApp;

