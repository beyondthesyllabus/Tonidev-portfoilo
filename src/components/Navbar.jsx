import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Theme toggle handler
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      // Check if we are at the top of the page
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      let currentSection = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: '// home' },
    { id: 'about', label: '// about' },
    { id: 'skills', label: '// skills' },
    { id: 'projects', label: '// projects' },
    { id: 'contact', label: '// contact' },
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-outline-variant/50 dark:border-slate-800 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1280px] mx-auto h-20">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/20 dark:border-blue-500/30 transition-transform group-hover:scale-105 duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsm3vieVk4gYh9QoJjfZgn6XPAyN0QVyVxWJowK3YEQ-JuSTgJyZ-kZf9LOfPDA4JStRZKiPxs4VZPFNNCB3tz1civLiWAexxvJ8jziHtMJgieTsP5RQvD50j-j5UdvYC4NklK6ICFYal4T4oPPUYZ9V5LqRrgkDOksXMGyRgaj_E1yBSQA_rawzE4zJQmGOekzfCH0AOXcUqWo7Yfmk60RAaBmVU1wyS1kSKAJgZATyjtU78KSWR2UOwJ-1zYeNh1O6AgEZElFwo"
              alt="ToniDev Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-mono text-lg tracking-wider text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200">
            &lt;ToniDev /&gt;
          </span>
        </div>

        {/* Right side group: Links & Actions */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-mono">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-normal transition-all duration-250 cursor-pointer relative py-2 ${
                  activeSection === link.id
                    ? 'text-primary dark:text-blue-400 font-bold'
                    : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface dark:text-slate-300 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle dark mode"
            id="nav-theme-toggle"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface dark:text-slate-300 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle mobile menu"
            id="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-outline-variant/60 dark:border-slate-800 shadow-xl transition-all duration-300 z-40">
          <div className="flex flex-col p-6 space-y-4 font-mono">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
