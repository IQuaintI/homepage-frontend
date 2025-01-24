import PropTypes from 'prop-types';

function ProjectCard({
  image,
  title,
  description,
  tools,
  projectLink = '', // Default value
  repoLink,
  isCurrentPage = false, // Default value
}) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <img src={image} alt={title} className="w-full md:w-1/3 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="flex flex-wrap gap-2 mb-4">
          {tools.map((tool, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition hover:bg-gray-400"
            >
              {tool}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-4 relative">
          {/* Project Link Button */}
          {isCurrentPage ? (
            <div className="relative group">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
              >
                View Project
              </button>
              {/* Tooltip */}
              <span className="absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                You are already on this page
              </span>
            </div>
          ) : (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Project
            </a>
          )}
          {/* Repository Link Button */}
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

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tools: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLink: PropTypes.string,
  repoLink: PropTypes.string.isRequired,
  isCurrentPage: PropTypes.bool,
};

export default ProjectCard;
