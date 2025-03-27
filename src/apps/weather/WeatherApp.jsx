import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import LocationInfo from "../../apps/weather/components/LocationInfo";
import { Input } from "../../components/weather/Input";
import { Button } from "../../components/weather/Button";
import {
  fetchLocationSuggestions,
  fetchWeatherData,
} from "../weather/components/LocationService";

function WeatherApp({ defaultLocation = "" }) {
  const [location, setLocation] = useState(defaultLocation);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const wrapperRef = useRef(null); // 🔹 Ref for click-outside detection

  // 🔹 Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Fetch Location Suggestions
  const handleLocationInput = async (query) => {
    setLocation(query);

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await fetchLocationSuggestions(query);
      setSuggestions(suggestions.length ? suggestions : []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setSuggestions([]);
    }
  };

  // 🔹 Fetch Weather Data
  const handleWeatherSearch = async (selectedLocation = location) => {
    const safeLocation =
      typeof selectedLocation === "string"
        ? selectedLocation
        : selectedLocation?.name;

    if (!safeLocation || !safeLocation.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    try {
      const weatherData = await fetchWeatherData(safeLocation);
      setData(weatherData);
      setError("");
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Could not retrieve data. Try again.");
      setData(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* 🔹 Input & Dropdown Suggestions */}
      <div
        ref={wrapperRef}
        className="w-full max-w-md flex flex-col relative mb-6"
      >
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
                  const locationName = suggestion.name;
                  setLocation(locationName);
                  handleWeatherSearch(locationName);
                  setSuggestions([]);
                }}
              >
                {suggestion.name}{" "}
                {suggestion.state ? `, ${suggestion.state}` : ""} (
                {suggestion.country})
              </li>
            ))}
          </ul>
        )}
        <Button onClick={() => handleWeatherSearch()}>Search</Button>
      </div>

      {/* 🔹 Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔹 Weather Info */}
      {data && (
        <LocationInfo
          temperature={data?.weather?.main?.temp ?? "N/A"}
          condition={data?.weather?.weather?.[0]?.description ?? "Unknown"}
          windSpeed={data?.weather?.wind?.speed ?? 0}
          summary={data?.summary ?? "No summary available"}
          lat={data?.lat ?? "Unknown"}
          lon={data?.lon ?? "Unknown"}
        />
      )}
    </div>
  );
}

WeatherApp.propTypes = {
  defaultLocation: PropTypes.string,
};

export default WeatherApp;