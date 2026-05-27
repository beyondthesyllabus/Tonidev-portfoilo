import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import CodeBackground from './CodeBackground';

const Hero = () => {
  const [line1Progress, setLine1Progress] = useState(0);
  const [line2Progress, setLine2Progress] = useState(0);
  const [phase, setPhase] = useState('typing1'); // 'typing1', 'typing2', 'done'

  useEffect(() => {
    if (phase === 'typing1') {
      const interval = setInterval(() => {
        setLine1Progress((prev) => {
          if (prev >= 16) {
            clearInterval(interval);
            setPhase('typing2');
            return 16;
          }
          return prev + 1;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'typing2') {
      const interval = setInterval(() => {
        setLine2Progress((prev) => {
          if (prev >= 26) {
            clearInterval(interval);
            setPhase('done');
            return 26;
          }
          return prev + 1;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const getLine1Render = (progress) => {
    if (progress === 0) return "\u200b";
    const part1 = "Hi, I'm ".slice(0, progress);
    const part2 = progress > 8 ? "ToniDev".slice(0, progress - 8) : "";
    const part3 = progress > 15 ? ".".slice(0, progress - 15) : "";

    return (
      <>
        {part1}
        {part2 && <span className="text-primary dark:text-blue-400">{part2}</span>}
        {part3}
      </>
    );
  };

  const getLine2Render = (progress) => {
    if (progress === 0) return "\u200b";
    return "Full-Stack Web Developer  ".slice(0, progress);
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
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
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] flex items-center bg-surface-container-lowest dark:bg-[#1e293b] px-6 md:px-12 py-16 overflow-hidden transition-colors duration-300"
    >
      <CodeBackground />
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <div className="w-fit space-y-3 mx-auto md:mx-0">
            <div className="space-y-2">
              <div className="w-full max-w-[520px] mx-auto md:mx-0">

                {/* ── UNIFIED MODE: Sleek Text ── */}
                <div className="space-y-1 select-none">
                  <p
                    style={{ fontSize: '50px', letterSpacing: '-1px', lineHeight: 1.1 }}
                    className="text-slate-800 dark:text-white font-semibold"
                  >
                    {"Hi, I'm ToniDev.".slice(0, line1Progress)}
                    {phase === 'typing1' && <span className="opacity-70 font-light">|</span>}
                  </p>
                  <p
                    style={{ fontSize: '40px', letterSpacing: '-0.5px', lineHeight: 1.1 }}
                    className="text-slate-600 dark:text-slate-300 font-normal"
                  >
                    {"Full-Stack Web Developer".slice(0, line2Progress)}
                    {phase === 'typing2' && <span className="opacity-70 font-light">|</span>}
                  </p>
                </div>

              </div>

            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-0">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="bg-primary dark:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover-lift hover:bg-blue-700 dark:hover:bg-blue-500 transition-standard flex items-center gap-2 shadow-lg"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/favour_toni_cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary/20 dark:border-slate-700 text-primary dark:text-slate-200 px-6 py-3 rounded-full font-semibold hover-lift hover:bg-surface-container dark:hover:bg-slate-800 transition-standard flex items-center gap-2"
              >
                Download CV
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Photo Column */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
