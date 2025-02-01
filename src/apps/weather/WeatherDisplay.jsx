import PropTypes from "prop-types";

function WeatherDisplay({ data }) {
  if (!data) return null;

  const { weather, agriculture, maps } = data;

  return (
    <div>
      {/* Weather Section */}
      <section>
        <h2>Weather</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </section>

      {/* Agriculture Section */}
      <section>
        <h2>Agricultural Data</h2>
        <pre>{JSON.stringify(agriculture, null, 2)}</pre>
      </section>

      {/* Map Section */}
      <section>
        <h2>Maps</h2>
        <div>
          <h3>Political Map</h3>
          <img src={maps.political_map} alt="Political Map" />
        </div>
        <div>
          <h3>Crop Map</h3>
          <p>{maps.crop_map}</p>
        </div>
      </section>
    </div>
  );
}

// Add PropTypes
WeatherDisplay.propTypes = {
  data: PropTypes.shape({
    weather: PropTypes.shape({
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    agriculture: PropTypes.object.isRequired, // Adjust if you know the exact shape of agriculture data
    maps: PropTypes.shape({
      political_map: PropTypes.string.isRequired,
      crop_map: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default WeatherDisplay;
