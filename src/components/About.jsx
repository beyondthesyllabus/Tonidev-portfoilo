import React from 'react';

const About = () => {
  return (
    <section 
      id="about" 
      className="py-24 md:py-[120px] bg-surface dark:bg-[#0f172a] transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Bio Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-[48px] font-bold text-on-surface dark:text-white leading-tight tracking-tight">
                About Me
              </h2>
              <div className="w-16 h-1.5 bg-primary dark:bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-base sm:text-lg text-black dark:text-white font-bold leading-relaxed">
              I’m a Full Stack Developer passionate about building fast, scalable, and user friendly web applications. I specialize in both frontend and backend development, using modern technologies to create clean, responsive, and efficient digital solutions.
            </p>
            <p className="text-base sm:text-lg text-black dark:text-white font-bold leading-relaxed">
              I enjoy turning ideas into real products, solving problems with code, and delivering experiences that combine great design with strong functionality.
            </p>
          </div>

          {/* Image Column */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Profile Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-outline-variant/60 dark:border-slate-700 p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsm3vieVk4gYh9QoJjfZgn6XPAyN0QVyVxWJowK3YEQ-JuSTgJyZ-kZf9LOfPDA4JStRZKiPxs4VZPFNNCB3tz1civLiWAexxvJ8jziHtMJgieTsP5RQvD50j-j5UdvYC4NklK6ICFYal4T4oPPUYZ9V5LqRrgkDOksXMGyRgaj_E1yBSQA_rawzE4zJQmGOekzfCH0AOXcUqWo7Yfmk60RAaBmVU1wyS1kSKAJgZATyjtU78KSWR2UOwJ-1zYeNh1O6AgEZElFwo"
                  alt="Anthony Profile"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Open for Work Status Button Pill (Floating Overlay) */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-md shadow-lg hover:bg-emerald-50/90 dark:hover:bg-emerald-950/30 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open for work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
