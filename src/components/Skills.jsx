import React from 'react';
import { Monitor, Cpu, Cloud, Database } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      underlineWord: "Frontend",
      restOfTitle: " Development",
      underlineClass: "chonky-underline-blue",
      description: "Building responsive, modern, and interactive user interfaces using modern frontend frameworks and typing systems.",
      icon: <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      items: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
    },
    {
      title: "Backend & Web3",
      underlineWord: "Backend",
      restOfTitle: " & Web3",
      underlineClass: "chonky-underline-magenta",
      description: "Developing secure REST and GraphQL APIs, backend server architecture, and decentralized smart contracts.",
      icon: <Cpu className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      items: ["Node.js", "Solidity", "GraphQL"]
    },
    {
      title: "Databases",
      underlineWord: "Databases",
      restOfTitle: "",
      underlineClass: "chonky-underline-yellow",
      description: "Designing efficient data schemas, optimizing queries, and managing relational and NoSQL databases.",
      icon: <Database className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      items: ["MongoDB", "PostgreSQL", "Redis"]
    },
    {
      title: "DevOps Tools",
      underlineWord: "DevOps",
      restOfTitle: " Tools",
      underlineClass: "chonky-underline-violet",
      description: "Containerizing services, orchestrating CI/CD pipelines, and configuring cloud deployment pipelines.",
      icon: <Cloud className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      items: ["Docker", "AWS", "GitHub Actions", "Automation Tools"]
    }
  ];

  return (
    <section
      id="skills"
      className="py-24 md:py-[120px] bg-surface-container-lowest dark:bg-[#0f172a] transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl sm:text-[48px] font-bold text-on-surface dark:text-white tracking-tight">
            Technical Expertise
          </h2>
          <div className="w-16 h-1.5 bg-primary dark:bg-blue-600 rounded-full mx-auto"></div>
          <p className="text-sm sm:text-base text-outline dark:text-slate-400 max-w-xl mx-auto font-medium">
            Leveraging a modern tech stack to build robust digital solutions and decentralized web applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="expertise-card p-6 rounded-xl flex flex-col space-y-6 transition-all duration-300 
                bg-white dark:bg-slate-900 md:bg-transparent 
                shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 md:shadow-none 
                border border-outline-variant/40 dark:border-slate-800 md:border-transparent 
                hover:border-outline-variant/60 dark:hover:border-slate-700 
                md:hover:bg-slate-500/5 md:dark:hover:bg-slate-800/20 
                sticky md:static"
              style={{
                top: `calc(100px + ${idx * 20}px)`,
                zIndex: idx
              }}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface-container dark:bg-slate-850 border border-outline-variant/40 dark:border-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface dark:text-white leading-tight">
                  <span className={category.underlineClass}>
                    {category.underlineWord}
                  </span>
                  {category.restOfTitle && (
                    <>
                      <br />
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">{category.restOfTitle.trim()}</span>
                    </>
                  )}
                </h3>
              </div>

              {/* Code Editor Style Box */}
              <div className="relative pl-5 border-l border-slate-300 dark:border-slate-800 font-mono text-sm space-y-2">
                {/* Open Tag */}
                <div className="text-xs text-slate-400/50 dark:text-slate-600 select-none font-semibold">&lt;h3&gt;</div>
                
                {/* Indented Content */}
                <div className="pl-3 space-y-4">
                  <p className="font-sans text-[14px] text-outline dark:text-slate-350 leading-relaxed font-medium">
                    {category.description}
                  </p>
                  
                  {/* Technologies list in code editor format */}
                  <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
                    <div>
                      <span className="text-pink-600 dark:text-pink-400">const</span>{' '}
                      <span className="text-blue-600 dark:text-blue-400">tech</span>{' '}
                      <span className="text-slate-500 dark:text-slate-600">=</span>{' '}
                      <span className="text-slate-500 dark:text-slate-600">[</span>
                    </div>
                    <div className="pl-4 flex flex-wrap gap-x-2">
                      {category.items.map((item, i) => (
                        <span key={i} className="text-emerald-600 dark:text-emerald-400 font-medium">
                          "{item}"{i < category.items.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-600">];</span>
                    </div>
                  </div>
                </div>

                {/* Close Tag */}
                <div className="text-xs text-slate-400/50 dark:text-slate-600 select-none font-semibold">&lt;/h3&gt;</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
