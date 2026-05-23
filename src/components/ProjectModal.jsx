import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import Github from './GithubIcon';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  const getExtendedDetails = (title) => {
    const details = {
      "Surgetrix": {
        role: "Full-Stack Developer",
        challenge: "Ride-hailing prices fluctuate unpredictably and users have no single tool to monitor, compare, and act on surge pricing across multiple transport platforms in real time.",
        solution: "Built a full-stack analytics platform using React and Vite on the frontend with a Node.js backend that aggregates live pricing data. Designed a clean dashboard with real-time indicators, historical charts, and smart fare alerts.",
        features: [
          "Real-time surge price tracking across services",
          "Historical pricing trend charts and analytics",
          "Smart alerts for optimal travel windows",
          "Clean, responsive dashboard interface"
        ]
      },
      "NUESA Uniuyo E-Library": {
        role: "Full-Stack Developer",
        challenge: "Engineering students at the University of Uyo lacked a centralised, easily accessible digital repository for course materials, textbooks, and faculty resources.",
        solution: "Developed a full-featured e-library web app using React and Node.js with a MongoDB database. Implemented search, filtering by department/course, and a companion PWA with offline access. Also published a native Android APK for mobile users.",
        features: [
          "Course material repository by department and level",
          "Downloadable textbooks and faculty resources",
          "Android mobile app with offline support",
          "Fast search and department-based filtering"
        ]
      },
      "Marv's Haven": {
        role: "Frontend Developer",
        challenge: "A counselling practitioner in Port Harcourt needed an engaging online presence to reach young adults, showcase services, and make it easy for clients to get in touch and access resources.",
        solution: "Designed and built a clean, emotionally resonant single-page website using vanilla HTML, CSS, and JavaScript bundled with Vite. Sections include hero, services overview, resources hub, and a contact form with social integration.",
        features: [
          "Services showcase: one-on-one, group & adolescent counselling",
          "Personal development resource hub",
          "Smooth scroll animations and mobile-responsive layout",
          "Integrated contact form and social media links"
        ]
      },
      "Paula's Palace Store": {
        role: "Full-Stack E-Commerce Developer",
        challenge: "A fashion boutique selling premium children's and ladies' clothing needed a visually stunning, fully functional online store with product management, cart functionality, and category browsing.",
        solution: "Engineered a Next.js e-commerce storefront with a TypeScript codebase and Tailwind CSS styling. Integrated Cloudinary for optimised product image delivery, built a cart system, and implemented category pages (BQ Kiddies, Baby 0–24 months, Girls Accessories, Shoes).",
        features: [
          "Animated split-panel hero with hover reveal effects",
          "Fully browsable product catalogue with category pages",
          "Shopping cart with persistent item management",
          "Cloudinary-powered optimised product images"
        ]
      },
      "Beyond the Syllabus": {
        role: "Frontend Developer",
        challenge: "A student-led 2026 Tech & Web3 conference needed a polished, animated landing page that communicates the event vision, schedule, and registration CTA in a way that resonates with a student audience.",
        solution: "Built a fully responsive, animated conference landing page using React, Vite, and Tailwind CSS. Integrated Google Fonts (Inter), Font Awesome icons, and scroll-based reveal animations. Deployed to a custom domain.",
        features: [
          "Animated hero section with conference theme and CTA",
          "Event schedule and speaker info section",
          "Web3 & skill-building information modules",
          "Custom domain deployment with responsive layout"
        ]
      },
      "FreedomAI — InfoFi": {
        role: "Full-Stack AI Developer",
        challenge: "Information on the internet is fragmented and hard to monetise. There was a need for a platform that aggregates, surfaces, and rewards valuable knowledge — the concept of 'Information Finance' (InfoFi).",
        solution: "Built a modern AI-powered InfoFi platform using React and TypeScript on a Vite foundation. Integrated LLM APIs for intelligent information retrieval and processing. Designed a sleek dark-mode UI with fast performance and modular component architecture.",
        features: [
          "AI-driven information retrieval and summarisation",
          "Information monetisation (InfoFi) mechanics",
          "TypeScript codebase for type safety and scalability",
          "Fast, modular React component architecture"
        ]
      },
      "TON Africa": {
        role: "Frontend & Web3 Developer",
        challenge: "The TON Blockchain and Telegram ecosystem are rapidly growing but underrepresented in Africa. A dedicated community platform was needed to educate, connect, and empower African Web3 builders.",
        solution: "Designed and built a vibrant community landing page using React and Vite. The site introduces the TON Africa mission, highlights educational resources, and drives community growth via Telegram. Bold blue/white branding reflects the TON identity.",
        features: [
          "TON Blockchain community hub and onboarding",
          "Education and Web3 resource sections",
          "Telegram ecosystem integration and deep-links",
          "Bold, on-brand responsive design with animations"
        ]
      }
    };

    return details[title] || {
      role: "Software Developer",
      challenge: "Developing a highly optimized, clean, and reliable solution adhering to modern standards.",
      solution: "Created using modular architectural practices, optimised asset loading, and thorough state management.",
      features: [
        "Highly responsive design system",
        "Accessible components and ARIA labels",
        "Robust state tracking and management",
        "Optimised build and execution times"
      ]
    };
  };

  const info = getExtendedDetails(project.title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-outline-variant/60 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient banner */}
        <div className={`h-4 w-full bg-gradient-to-r ${project.gradient}`}></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400">
              {info.role}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-on-surface dark:text-white">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="bg-primary/5 dark:bg-blue-950/40 text-primary dark:text-blue-300 font-semibold px-3 py-1 rounded-full text-xs border border-primary/10 dark:border-blue-900/30 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-outline-variant/30 dark:border-slate-800" />

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
              Project Challenge
            </h4>
            <p className="text-base text-on-surface-variant dark:text-slate-300 leading-relaxed">
              {info.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
              Engineering Solution
            </h4>
            <p className="text-base text-on-surface-variant dark:text-slate-300 leading-relaxed">
              {info.solution}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
              Key Contributions & Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {info.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 bg-surface-container-low dark:bg-slate-900/80 border-t border-outline-variant/30 dark:border-slate-800/80 flex flex-wrap gap-4 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-outline-variant dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary dark:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
