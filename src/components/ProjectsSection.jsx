import ProjectCard from './ProjectCard';
import Footer from './Footer';

function ProjectSection() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <section className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col gap-8">
          {/* Homepage Project */}
          <ProjectCard
            image="/images/Homesite.png"
            title="Homepage"
            description="The stumbling blocks that you find yourself on - React frontend with a Django back."
            tools={['React', 'JavaScript', 'Python', 'Django', 'HTML', 'CSS']}
            projectLink="/"
            repoLink="https://github.com/IQuaintI/homepage-frontend"
            docsLink="/docs/homepage"
            isCurrentPage={true}
          />

          {/* Weather & Agriculture Project */}
          <ProjectCard
            image="/images/Weather.png"
            title="Weather"
            description="A weather data visualization app."
            tools={['React', 'JavaScript', 'Python', 'Django', 'API']}
            projectLink="/WeatherApp"
            repoLink="https://github.com/IQuaintI/homepage-frontend"
            docsLink="/docs/weather"
            isCurrentPage={false}
          />

          {/* Recipes Project */}
          <ProjectCard
            image="/images/RecipeBook.png"
            title="Recipes"
            description="A CRUD-based recipe manager with image picker, slide-out editor, and dynamic UI."
            tools={['React', 'JavaScript', 'Python', 'Django', 'MSW']}
            projectLink="/recipes"
            repoLink="https://github.com/IQuaintI/homepage-frontend"
            docsLink="/docs/recipes"
            isCurrentPage={false}
          />
        </div>
      </section>

      {/* Footer Restored */}
      <Footer />
    </div>
  );
}

export default ProjectSection;
