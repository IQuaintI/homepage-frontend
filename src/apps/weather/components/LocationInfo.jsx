import PropTypes from "prop-types";
import { Card } from "../../../components/weather/Card";

const toProperCase = (text) => {
  if (!text) return "";
  return text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function LocationInfo({ temperature, condition, windSpeed, summary, lat, lon }) {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-2/3">
        <Card title="Weather Information">
          <p>🌡 Temperature: {temperature}°C</p>
          <p>🌤 Condition: {toProperCase(condition)}</p> {/* ✅ Proper Case Formatting */}
          <p>💨 Wind Speed: {windSpeed} m/s</p>
        </Card>

        {/* 🔹 Interactive OpenStreetMap Embed (Zoom Adjusted) */}
        {lat && lon && (
          <Card title="Map">
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}&layer=mapnik`}
              style={{ border: "1px solid black", borderRadius: "8px" }}
            ></iframe>
          </Card>
        )}
      </div>

      <div className="w-1/3">
        <Card title="Summary">
          <p>{summary || "No summary available."}</p> {/* ✅ Prevents Undefined Summary */}
        </Card>
      </div>
    </div>
  );
}

LocationInfo.propTypes = {
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  windSpeed: PropTypes.number.isRequired,
  summary: PropTypes.string, 
  lat: PropTypes.number, 
  lon: PropTypes.number,
};