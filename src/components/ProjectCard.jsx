function ProjectCard({ image, title, description, tools, projectLink, repoLink }) {
    // Define colors for each language
    const languageColors = {
      React: 'hover:bg-blue-500',
      Python: 'hover:bg-yellow-500',
      CSS: 'hover:bg-purple-500',
      JavaScript: 'hover:bg-yellow-400',
      Django: 'hover:bg-green-500',
      HTML: 'hover:bg-orange-500',
    };
  
    return (
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img src={image} alt={title} className="w-full md:w-1/3 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <ul className="flex flex-wrap gap-2 mb-4">
            {tools.map((tool, index) => (
              <li
                key={index}
                className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition ${
                  languageColors[tool] || 'hover:bg-gray-400'
                }`}
              >
                {tool}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-4">
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Project
            </a>
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProjectCard;
  
  