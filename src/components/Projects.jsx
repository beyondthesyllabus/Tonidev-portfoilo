import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Eye, Loader2 } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&embed=screenshot.url`;

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-2xl border border-outline-variant/60 dark:border-slate-800 overflow-hidden group hover-lift transition-all duration-300 card-shadow flex flex-col cursor-pointer relative aspect-[16/10] bg-slate-900"
    >
      {/* Background/Fallback Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:scale-105 transition-transform duration-700`} />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-blue-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Generating Preview...</span>
          </div>
        </div>
      )}

      {/* Screenshot Image */}
      <img 
        src={screenshotUrl} 
        alt={`${project.title} Preview`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />

      {/* Hover Overlay — Only Explore Project */}
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
        <div className="bg-slate-900/85 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full flex items-center gap-2.5 text-white font-bold text-sm tracking-wide shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <Eye className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <span>Explore Project</span>
          <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-400 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: "Surgetrix",
      desc: "A powerful surge-pricing and ride-hailing analytics platform designed to help users track, compare, and act on real-time pricing data across transport services.",
      tags: ["React", "Vite", "Node.js"],
      category: "Full-Stack",
      gradient: "from-blue-600 to-indigo-500",
      liveUrl: "https://surgetrix-three.vercel.app/"
    },
    {
      title: "NUESA Uniuyo E-Library",
      desc: "A digital library platform for the Faculty of Engineering at the University of Uyo. Students can access course materials, textbooks, and faculty resources — with a companion Android mobile app for offline access.",
      tags: ["React", "Node.js", "MongoDB", "PWA"],
      category: "Education",
      gradient: "from-emerald-600 to-teal-500",
      liveUrl: "https://nuesa-uniuyo-e-library-five.vercel.app/"
    },
    {
      title: "Marv's Haven",
      desc: "A counselling-centred web platform dedicated to guiding young adults toward clarity, emotional intelligence, and purpose. Offers one-on-one sessions, group counselling, personal development resources, and adolescent support services.",
      tags: ["HTML", "CSS", "JavaScript", "Vite"],
      category: "Full-Stack",
      gradient: "from-violet-600 to-fuchsia-500",
      liveUrl: "https://marv-shaven.vercel.app/"
    },
    {
      title: "Paula's Palace Store",
      desc: "A premium e-commerce storefront for babies' and ladies' fashion, featuring curated collections (BQ Kiddies, Baby 0–24 months, Girls' Accessories, Shoes), a cart system, animated hero, and elegant product browsing experience.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudinary"],
      category: "E-Commerce",
      gradient: "from-rose-500 to-pink-500",
      liveUrl: "https://paula-s-palace-store.vercel.app/"
    },
    {
      title: "Beyond the Syllabus",
      desc: "A conference landing page for a 2026 Tech & Web3 summit for students — where tech meets academia. Covers Web3 opportunities, skill-building, and balancing academic success with tech-career growth.",
      tags: ["React", "Vite", "Tailwind CSS"],
      category: "Web3 / DeFi",
      gradient: "from-amber-500 to-orange-500",
      liveUrl: "https://beyondthesyllabus.online/"
    },
    {
      title: "FreedomAI — InfoFi",
      desc: "An AI-powered information finance platform (InfoFi) that brings together intelligent data retrieval, analysis, and monetisation of knowledge assets — built with modern AI tooling and a sleek React + TypeScript frontend.",
      tags: ["React", "TypeScript", "Vite", "AI/LLM"],
      category: "AI / ML",
      gradient: "from-cyan-600 to-blue-500",
      liveUrl: "https://freedomai-infofi.vercel.app/"
    },
    {
      title: "TON Africa",
      desc: "A Web3 community platform empowering Africans through the TON Blockchain and Telegram ecosystem. Focused on education, collaboration, and driving blockchain innovation across the African continent.",
      tags: ["React", "Vite", "TON Blockchain", "Web3"],
      category: "Web3 / DeFi",
      gradient: "from-blue-500 to-sky-400",
      liveUrl: "https://ton-africa.vercel.app/"
    }
  ];

  const categories = ['All', 'Full-Stack', 'E-Commerce', 'Education', 'AI / ML', 'Web3 / DeFi'];

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            project.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="projects" 
      className="py-24 md:py-[120px] bg-surface-container-lowest dark:bg-[#1e293b] transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">        {/* Section Header — My Work */}
        <div className="space-y-7 text-left mb-20 relative">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-[58px] font-black text-on-surface dark:text-white leading-none tracking-tight">
              My <span className="text-primary dark:text-blue-500">Work</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary dark:bg-blue-600 rounded-full"></div>
          </div>
          
          <p className="text-base sm:text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed max-w-2xl">
            Deployed scalable full-stack web platforms and interactive systems. 
            Highly focused on modern engineering practices, performance tuning, and creating premium pixel-perfect user experiences.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary border-primary text-white dark:bg-blue-600 dark:border-blue-600 shadow-md scale-105'
                    : 'bg-white/50 border-outline-variant/60 text-on-surface-variant dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-outline-variant/30 dark:border-slate-800/40 pb-6">
          <p className="text-sm font-semibold text-on-surface-variant dark:text-slate-400">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full border border-outline-variant/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={idx} 
                project={project} 
                onClick={() => setActiveProject(project)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-xl border border-outline-variant/60 dark:border-slate-800 p-8">
            <p className="text-lg font-semibold text-outline dark:text-slate-500">
              No projects found matching your search.
            </p>
          </div>
        )}

        {/* Project Detail Modal Overlay */}
        {activeProject && (
          <ProjectModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
