import React from 'react';

const Marquee = () => {
  const techs = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      className: "dark:invert"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      className: "dark:invert"
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      name: "Solidity",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
      className: "dark:invert"
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      name: "Rust",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
      className: "dark:invert"
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    }
  ];

  return (
    <div className="w-full">
      <div className="py-3 bg-surface-container/55 dark:bg-slate-900/50 border-y border-outline-variant/60 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
        <div className="mb-2 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-slate-400">
            Powered by modern technologies
          </span>
        </div>
        <div className="relative w-full flex items-center overflow-x-hidden">
          <div className="marquee-track">
            {/* Track 1 */}
            <div className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6">
              {techs.map((tech, index) => (
                <div
                  key={`t1-${index}`}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface/30 dark:bg-slate-800/30 backdrop-blur-sm border border-outline-variant/30 dark:border-slate-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md hover:scale-110 hover:border-primary/50 dark:hover:border-blue-400/50 hover:bg-surface-container dark:hover:bg-slate-800 transition-all duration-300 group cursor-pointer"
                  title={tech.name}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${tech.className || ''}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6">
              {techs.map((tech, index) => (
                <div
                  key={`t2-${index}`}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface/30 dark:bg-slate-800/30 backdrop-blur-sm border border-outline-variant/30 dark:border-slate-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md hover:scale-110 hover:border-primary/50 dark:hover:border-blue-400/50 hover:bg-surface-container dark:hover:bg-slate-800 transition-all duration-300 group cursor-pointer"
                  title={tech.name}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${tech.className || ''}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
