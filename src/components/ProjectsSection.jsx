import ProjectCard from './ProjectCard';

function ProjectSection() {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
        My Projects
      </h2>
      <div className="flex flex-col gap-8">
        {/* Example Project Cards */}
        <ProjectCard
          image="/images/Homesite.png"
          title="Homepage"
          description="The stumbling blocks that you find yourself on - React frontend with a Django back."
          tools={['React', 'JavaScript', 'HTML', 'Python', 'CSS', 'Django']}
          projectLink="www.agomez.me"
          repoLink="https://github.com/IQuaintI/homepage-frontend"
        />
        <ProjectCard
          image="/path-to-your-image.jpg"
          title="Project Title 2"
          description="A brief description of the second project. Highlight key features or goals."
          tools={['JavaScript', 'Django', 'HTML']}
          projectLink="https://example.com/project2"
          repoLink="https://github.com/username/project2"
        />
      </div>
    </section>
  );
}

export default ProjectSection;
