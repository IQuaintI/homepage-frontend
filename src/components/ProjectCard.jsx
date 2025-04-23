import PropTypes from "prop-types";

function ProjectCard({
  image,
  title,
  description,
  tools,
  projectLink = "",
  repoLink,
  docsLink = "",
  isCurrentPage = false,
}) {
  const hoverColors = {
    React: "hover:bg-blue-200",
    JavaScript: "hover:bg-yellow-200",
    HTML: "hover:bg-orange-200",
    CSS: "hover:bg-sky-200",
    Python: "hover:bg-pink-200",
    Django: "hover:bg-emerald-200",
    API: "hover:bg-purple-200",
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative min-h-[280px]">
      <div className="w-full md:w-1/3 flex-shrink-0 h-[280px] md:h-auto">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <ul className="flex flex-wrap justify-center gap-2 mb-4">
          {tools.map((tool, index) => (
            <li
              key={index}
              className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors duration-200 cursor-default ${hoverColors[tool] || "hover:bg-gray-300"}`}
            >
              {tool}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-4 justify-center">
          {isCurrentPage ? (
            <span
              title="You are currently on this page"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
            >
              View Project
            </span>
          ) : (
            <a
              href={projectLink}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Project
            </a>
          )}

          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            View Code
          </a>

          {docsLink && (
            <a
              href={docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Docs
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tools: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLink: PropTypes.string,
  repoLink: PropTypes.string.isRequired,
  docsLink: PropTypes.string,
  isCurrentPage: PropTypes.bool,
};

export default ProjectCard;

