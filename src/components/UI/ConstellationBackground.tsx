
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const points: Array<{x: number, y: number, vx: number, vy: number}> = [];
    const POINT_COUNT = 100;
    const CONNECTION_DISTANCE = 100;
    
    // Create resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Regenerate points when resizing
      points.length = 0;
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(15, 15, 19, 1)");
      gradient.addColorStop(1, "rgba(30, 30, 40, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw connections first (behind points)
      ctx.strokeStyle = "rgba(80, 80, 90, 0.08)";
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(80, 80, 90, ${opacity * 0.15})`;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw points
      points.forEach((point, i) => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        
        // Draw point
        const radius = (i % 5 === 0) ? 1.5 : 1;
        const color = (i % 10 === 0) 
          ? `rgba(0, 245, 255, ${0.5 + Math.sin(Date.now() * 0.002) * 0.2})` 
          : (i % 5 === 0)
            ? `rgba(255, 0, 255, ${0.5 + Math.cos(Date.now() * 0.002) * 0.2})`
            : "rgba(150, 150, 170, 0.7)";
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <>
      <div className="fixed inset-0 bg-[#0f0f13] z-[-2]" />
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-[-1]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="fixed inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-[-1]"
      />
    </>
  );
};

export default ConstellationBackground;
