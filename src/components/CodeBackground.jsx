import React, { useEffect, useRef } from 'react';

const CodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const codeSnippets = [
      "const [data, setData] = useState(null);",
      "import React, { useEffect } from 'react';",
      "const response = await fetch('/api/messages');",
      "contract ToniDevToken is ERC20 {",
      "function deploySmartContract() public {",
      "npm run build && node server.js",
      "docker-compose up --build -d",
      "git commit -m 'feat: add video text mask'",
      "const db = await MongoClient.connect(url);",
      "app.post('/api/contact', async (req, res) => {",
      "const transporter = nodemailer.createTransport({",
      "AWS.config.update({ region: 'us-east-1' });",
      "res.status(201).json({ success: true });",
      "const query = gql`query GetProjects {`",
      "TailwindCSS: className='hover-lift transition'",
      "const PORT = process.env.PORT || 5005;",
      "mongoose.connect(process.env.MONGODB_URI);",
      "const Schema = mongoose.Schema;",
      "const nextConfig = { reactStrictMode: true };",
      "exports.handler = async (event) => {",
      "return new Promise((resolve) => setTimeout(resolve, 1000));"
    ];

    const fontSize = 12;
    // Calculate columns based on width
    const columnsCount = Math.max(3, Math.floor(canvas.width / 180));
    const lines = [];

    // Initialize lines at random vertical positions
    for (let i = 0; i < columnsCount; i++) {
      lines.push({
        x: i * (canvas.width / columnsCount) + Math.random() * 20,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.6, // Slow, elegant drift
        snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: 0.08 + Math.random() * 0.15
      });
    }

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;
      
      lines.forEach((line) => {
        // Set styling based on dark/light mode
        ctx.fillStyle = isDark 
          ? `rgba(148, 163, 184, ${line.opacity})` // Slate-400 in dark mode
          : `rgba(71, 85, 105, ${line.opacity * 0.8})`; // Slate-600 in light mode
        
        ctx.fillText(line.snippet, line.x, line.y);
        
        // Move down
        line.y += line.speed;
        
        // Loop when off bottom
        if (line.y > canvas.height + 20) {
          line.y = -20;
          line.snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          line.speed = 0.3 + Math.random() * 0.6;
          line.opacity = 0.08 + Math.random() * 0.15;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-300"
    />
  );
};

export default CodeBackground;
