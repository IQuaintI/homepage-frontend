import PropTypes from "prop-types";

function WeatherDisplay({ data }) {
  if (!data) return null;

  const { weather, agriculture, maps } = data;

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-lg mx-auto mt-6 border border-gray-200">
      {weather && (
        <div>
          <h2 className="text-xl font-bold text-center">{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>🌤️ Condition: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      {agriculture && (
        <div className="mt-4 border-t pt-3">
          <h3 className="text-lg font-bold">🌾 Agriculture Data</h3>
          <p>💧 Humidity: {agriculture.main.humidity}%</p>
          <p>🌡️ Temp: {agriculture.main.temp}°C</p>
          <p>🌦️ Condition: {agriculture.weather[0].description}</p>
        </div>
      )}

      {maps && (
        <div className="mt-4 border-t pt-3">
          <h3 className="text-lg font-bold">🗺️ Maps</h3>
          
          {maps.political_map && (
            <div className="mt-2">
              <p>📍 Political Map:</p>
              <img
                src={maps.political_map}
                alt="Political Map"
                className="w-full rounded-md shadow-md border"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

WeatherDisplay.propTypes = {
  data: PropTypes.object,
};

export default WeatherDisplay;