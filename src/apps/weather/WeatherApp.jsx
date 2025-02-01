import { useState } from "react";
import { fetchCombinedData } from "../../api/WeatherApi";
import WeatherDisplay from "./WeatherDisplay";
import PropTypes from "prop-types";

function WeatherApp({ defaultLocation = "" }) {
  const [location, setLocation] = useState(defaultLocation);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const result = await fetchCombinedData(location);
      setData(result);
      setError(""); // Clear previous errors
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div>
      <h1>Weather & Agriculture App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location (city or lat,lon)"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <WeatherDisplay data={data} />
    </div>
  );
}

// Add PropTypes
WeatherApp.propTypes = {
  defaultLocation: PropTypes.string, // Default location to start with
};

export default WeatherApp;
