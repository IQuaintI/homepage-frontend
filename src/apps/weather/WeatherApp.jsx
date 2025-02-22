import { useState } from "react";
import PropTypes from "prop-types";
import LocationInfo from "../../apps/weather/components/LocationInfo";
import { Input } from "../../components/weather/Input";
import { Button } from "../../components/weather/Button";
import { fetchLocationSuggestions, fetchWeatherData } from "../weather/components/LocationService";

function WeatherApp({ defaultLocation = "" }) {
  const [location, setLocation] = useState(defaultLocation);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔹 Handle Location Input & Fetch Suggestions
  const handleLocationInput = (query) => {
    setLocation(query);
    fetchLocationSuggestions(query).then(setSuggestions); // ✅ Uses API function
  };

  // 🔹 Handle Weather Search & Fetch Data
  const handleWeatherSearch = async () => {
    try {
      const weatherData = await fetchWeatherData(location); // ✅ Uses API function
      setData(weatherData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not retrieve data. Try again.");
      setData(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* 🔹 Input Section */}
      <div className="w-full max-w-md flex flex-col relative mb-6">
        <Input
          value={location}
          onChange={(e) => handleLocationInput(e.target.value)}
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
                  handleWeatherSearch();
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <Button onClick={handleWeatherSearch}>Search</Button>
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

