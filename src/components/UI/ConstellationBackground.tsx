
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Stars and constellation configuration
    const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = [];
    const starCount = Math.max(50, Math.floor(window.innerWidth * window.innerHeight / 15000));
    
    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 1.5 + 0.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
      });
    }
    
    // Draw function for animation
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars and update positions
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        // Update position
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }
      
      // Draw constellation lines between close stars
      ctx.beginPath();
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            const opacity = 1 - distance / 100; // Fade out with distance
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity * 0.2})`;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-0"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f13] via-[#1a1a26] to-[#0f0f13] pointer-events-none" />
      
      {/* Stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
      
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-20 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </motion.div>
  );
};

export default ConstellationBackground;
