import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProjectSection from "./components/ProjectsSection";
import WeatherApp from "./apps/weather/WeatherApp";

function App() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    console.log("VITE_API_URL:", apiUrl);

    fetch(`${apiUrl}/core/endpoint`)
      .then(response => {
        if (!response.ok) throw new Error("API request failed");
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data);
        setApiMessage(data.message);
      })
      .catch(error => console.error("Fetch Error:", error));
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* 🔹 Header Section */}
        <Header />

        {/* 🔹 Navigation Bar */}
        <nav className="bg-gray-900 text-white flex justify-center gap-8 py-4">
          <a
            href="https://www.linkedin.com/in/alex-gomez-87309b12b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="/images/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Resume
          </a>
          <a
            href="mailto:alexgomez2797@gmail.com"
            className="hover:underline"
            rel="noopener noreferrer"
          >
            Contact
          </a>
          {/* Internal Navigation */}
          <Link to="/" className="hover:underline">Projects</Link>
          <Link to="/weatherapp" className="hover:underline">Weather App</Link>
        </nav>

        <div className="border-t-2 border-gray-700"></div>

        {/* 🔹 Display API Message (For Debugging) */}
        {apiMessage && (
          <div className="p-4 text-center text-green-600 font-bold">
            Backend says: {apiMessage}
          </div>
        )}

        {/* 🔹 Routes for Navigation */}
        <Routes>
          <Route path="/" element={<ProjectSection />} />
          <Route path="/weatherapp" element={<WeatherApp />} />
          <Route path="*" element={<h1 className="text-center p-8">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
