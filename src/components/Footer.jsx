import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-on-primary-fixed dark:bg-[#080c14] text-on-primary border-t border-outline-variant/15 dark:border-slate-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-8 max-w-[1280px] mx-auto">
        {/* Logo/Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 font-bold text-xl tracking-tight text-white/90 hover:text-white cursor-pointer transition-colors mb-4 md:mb-0 group"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 transition-transform group-hover:scale-105 duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsm3vieVk4gYh9QoJjfZgn6XPAyN0QVyVxWJowK3YEQ-JuSTgJyZ-kZf9LOfPDA4JStRZKiPxs4VZPFNNCB3tz1civLiWAexxvJ8jziHtMJgieTsP5RQvD50j-j5UdvYC4NklK6ICFYal4T4oPPUYZ9V5LqRrgkDOksXMGyRgaj_E1yBSQA_rawzE4zJQmGOekzfCH0AOXcUqWo7Yfmk60RAaBmVU1wyS1kSKAJgZATyjtU78KSWR2UOwJ-1zYeNh1O6AgEZElFwo"
              alt="ToniDev Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span>ToniDev</span>
        </div>

        {/* Copyright */}
        <div className="text-sm text-outline-variant/70 dark:text-slate-500 mb-4 md:mb-0">
          © {new Date().getFullYear()} ToniDev. All rights reserved.
        </div>

        <div className="flex gap-5">
          <a
            className="text-outline-variant/70 dark:text-slate-500 hover:text-green-500 transition-colors duration-200"
            href={import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/qr/656J2WECIZUCH'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2c-5.506 0-9.972 4.471-9.972 9.974 0 1.758.459 3.477 1.334 4.994l-1.42 5.19 5.302-1.391c1.462.798 3.109 1.218 4.752 1.219h.004c5.505 0 9.971-4.473 9.971-9.976 0-2.663-1.037-5.166-2.922-7.053C17.202 3.037 14.7 2 12.031 2zm6.99 14.079c-.285.803-1.43 1.457-1.982 1.514-.503.053-1.15.281-3.328-.621-2.784-1.155-4.577-4.004-4.716-4.189-.139-.185-1.109-1.478-1.109-2.82 0-1.343.702-2.003.953-2.274.25-.272.551-.34.737-.34h.528c.186 0 .438-.071.688.528.25.602.853 2.083.928 2.235.076.151.126.328.026.529-.1.201-.151.328-.302.503-.151.175-.316.39-.452.522-.151.151-.31.316-.134.619.176.302.78 1.282 1.674 2.079.882.787 1.627 1.029 1.854 1.139.227.11.36.092.493-.062.133-.154.572-.667.725-.893.153-.226.306-.188.513-.113.208.075 1.321.622 1.547.737.227.115.378.172.434.269.057.098.057.566-.228 1.369z" />
            </svg>
          </a>
          <a
            className="text-outline-variant/70 dark:text-slate-500 hover:text-[#1DA1F2] transition-colors duration-200"
            href="https://x.com/FavourToni"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a
            className="text-outline-variant/70 dark:text-slate-500 hover:text-[#0088cc] transition-colors duration-200"
            href="https://t.me/Fetony"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-3 17-9-3-4-3L22 2Z" />
              <path d="m22 2-12 12" />
              <path d="v6l4-4" />
            </svg>
          </a>
          <a
            className="text-outline-variant/70 dark:text-slate-500 hover:text-[#0A66C2] transition-colors duration-200"
            href="https://www.linkedin.com/in/favour-etim-7aa243411"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
