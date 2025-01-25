import Header from './components/Header';
import ProjectSection from './components/ProjectsSection';


function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Navigation Bar */}
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
      </nav>
      <div className="border-t-2 border-gray-700"></div>

      {/* Projects Section */}
      <main className="py-8">
        <ProjectSection />
      </main>
    </div>
  );
}

export default App;
