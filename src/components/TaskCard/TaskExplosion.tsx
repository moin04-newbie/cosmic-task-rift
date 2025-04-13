
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";

// Explosion particle component
const Particle = ({ delay, x, y, size, color }: { 
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}) => {
  return (
    <motion.div
      className="absolute rounded-full"
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: x,
        y: y,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: "50%",
        left: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
    />
  );
};

const TaskExplosion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    playSound("explosion");
  }, []);
  
  // Generate random particles
  const particles = [];
  const particleColors = ["#00F5FF", "#FF00FF", "#FFFFFF"];
  
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 70;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 4 + Math.random() * 8;
    const delay = Math.random() * 0.2;
    const colorIndex = Math.floor(Math.random() * particleColors.length);
    
    particles.push(
      <Particle
        key={i}
        delay={delay}
        x={x}
        y={y}
        size={size}
        color={particleColors[colorIndex]}
      />
    );
  }
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-20 overflow-hidden">
      {/* Glow flash */}
      <motion.div
        className="absolute inset-0 bg-[#00F5FF]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Explosion particles */}
      {particles}
      
      {/* XP gain effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, y: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 1, 0],
          y: -40,
          scale: 1
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-[#00F5FF] font-bold text-lg whitespace-nowrap font-heading">
          +10 XP
        </div>
      </motion.div>
    </div>
  );
};

export default TaskExplosion;
