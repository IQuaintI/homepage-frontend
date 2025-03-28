function About() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-center">About Me</h1>
  
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* 🔹 Placeholder for a profile picture (rectangle style) */}
          <div className="w-60 h-80 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm shadow-md">
            Your Photo
          </div>
  
          {/* 🔹 Text Content */}
          <div className="flex-1">
            <p className="mb-4 text-lg leading-relaxed">
              Hey there — I&apos;m <strong>Alex Gomez</strong>. I&apos;m a self-taught developer and builder,
              currently transitioning out of the Army and into tech. This site is my personal playground
              and portfolio, where I share the projects I&apos;ve been crafting while I learn how to wield code
              as a tool for clarity, structure, and maybe a little rebellion.
            </p>
  
            <p className="mb-4 text-lg leading-relaxed">
              I&apos;m most comfortable working with <code>React</code> and <code>Django</code> right now, and I&apos;m interested
              in the whole stack — from backend logic to frontend polish. I like writing code that feels solid,
              practical, and purposeful.
            </p>
  
            <p className="mb-4 text-lg leading-relaxed">
              This site itself is built using a Django backend and a React frontend, deployed on a DigitalOcean
              droplet. I try to keep things tidy, documented, and honest — not everything is perfect,
              but everything works.
            </p>
  
            <p className="text-lg leading-relaxed">
              If you want to get in touch, check out the navigation bar above — my{" "}
              <a
                href="mailto:alexgomez2797@gmail.com"
                className="text-blue-600 underline"
              >
                email
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/alex-gomez-87309b12b/"
                className="text-blue-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>{" "}
              are up there.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default About;
  
