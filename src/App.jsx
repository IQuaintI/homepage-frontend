import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProjectSection from "./components/ProjectsSection";
import About from "./components/About";
import WeatherApp from "./apps/weather/WeatherApp";
import HomepageMarkdownPage from "./docs/Homepage_Markdown";
import RecipesApp from "./apps/recipes/RecipesApp";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors duration-300">
        <Header />

        {/* 🔹 Centered Nav Bar */}
        <nav className="bg-gray-900 text-white py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center gap-8 items-center">
              <a
                href="https://www.linkedin.com/in/alex-gomez-87309b12b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                LinkedIn
              </a>
              <a
                href="/images/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Resume
              </a>
              <a
                href="/"
                className="px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Projects
              </a>
              <a
                href="/about"
                className="px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                About
              </a>
              <a
                href="mailto:alexgomez2797@gmail.com"
                className="px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        <div className="border-t-2 border-gray-700" />

        {/* 🔹 Routing */}
        <Routes>
          <Route path="/" element={<ProjectSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/WeatherApp" element={<WeatherApp />} />
          <Route path="/docs/homepage" element={<HomepageMarkdownPage filePath="/homepage.md" />}/>
          <Route path="/recipes" element={<RecipesApp />} />
          <Route
            path="*"
            element={
              <h1 className="text-center p-8 text-red-600">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
