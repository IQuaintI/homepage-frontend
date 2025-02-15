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

  // 🔹 Fetch Weather & Wikipedia Summary Data
  const fetchWeatherData = async (selectedLocation) => {
    if (!selectedLocation.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    try {
      // 🔹 Fetch Weather Data
      const response = await fetch(
        `https://www.agomez.me/api/weather/combined-data?location=${encodeURIComponent(selectedLocation)}`
      );

      if (!response.ok) throw new Error("Failed to fetch weather data");

      const weatherResult = await response.json();

      console.log("Weather Data:", weatherResult); // ✅ Debugging Weather API Response

      // 🔹 Fetch Wikipedia Summary Separately
      const wikiResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(selectedLocation)}`
      );

      let summaryText = "No summary available."; // Default value

      if (wikiResponse.ok) {
        const wikiResult = await wikiResponse.json();
        summaryText = wikiResult.extract || "No summary available."; // Use Wikipedia extract
      }

      console.log("Wikipedia Summary:", summaryText); // ✅ Debugging Wikipedia Summary

      // 🔹 Set the State with Both Weather & Wikipedia Summary
      setData({
        ...weatherResult,
        summary: summaryText,
      });

      setError("");
      setSuggestions([]);
    } catch (err) {
      console.error(err);
      setError("Could not retrieve data. Try again.");
      setData(null);
    }
  };

  // 🔹 Fetch Location Suggestions (Wikipedia API with Category Filtering)
  const fetchLocationSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
      );

      if (!response.ok) throw new Error("Failed to fetch suggestions");

      const result = await response.json();

      // 🔹 Extract page titles
      const pageTitles = result.query.search.map((entry) => entry.title);
      const titlesParam = pageTitles.map((title) => encodeURIComponent(title)).join("|");

      // 🔹 Fetch additional metadata to filter non-location results
      const categoryResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=categories&titles=${titlesParam}&format=json&origin=*`
      );

      if (!categoryResponse.ok) throw new Error("Failed to fetch category data");

      const categoryData = await categoryResponse.json();

      // 🔹 Filter only places (Cities, Countries, Populated places)
      const filteredSuggestions = result.query.search.filter((entry) => {
        const pageId = Object.keys(categoryData.query.pages).find(
          (id) => categoryData.query.pages[id].title === entry.title
        );

        if (!pageId) return false;

        const categories = categoryData.query.pages[pageId].categories || [];

        return categories.some((cat) =>
          ["Category:Populated places", "Category:Cities", "Category:Towns", "Category:Villages", "Category:Countries", "Category:Geography"]
            .some(validCategory => cat.title.includes(validCategory))
        );
      });

      setSuggestions([...new Set(filteredSuggestions.map((s) => s.title))].slice(0, 5)); // ✅ Remove duplicates & limit to 5
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
      setSuggestions([]);
    }
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
        <Button onClick={() => fetchWeatherData(location)}>Search</Button>
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
          lat={data.weather.coord.lat} 
          lon={data.weather.coord.lon}
        />
      )}
    </div>
  );
}

WeatherApp.propTypes = {
  defaultLocation: PropTypes.string,
};

export default WeatherApp;
