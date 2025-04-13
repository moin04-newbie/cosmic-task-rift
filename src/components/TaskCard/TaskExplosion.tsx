
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TaskExplosionProps {
  onComplete: () => void;
}

const createParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 360 - 180,
    y: Math.random() * 360 - 180,
    scale: Math.random() * 0.6 + 0.4,
    opacity: Math.random() * 0.6 + 0.4,
    rotation: Math.random() * 360
  }));
};

const TaskExplosion = ({ onComplete }: TaskExplosionProps) => {
  const particles = useRef(createParticles(16));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0, 
            scale: 0.1,
            rotate: 0 
          }}
          animate={{ 
            x: particle.x, 
            y: particle.y, 
            opacity: [0, particle.opacity, 0], 
            scale: [0.1, particle.scale, 0],
            rotate: particle.rotation
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{
            background: Math.random() > 0.5 ? "#00F5FF" : "#FF00FF",
            boxShadow: Math.random() > 0.5 
              ? "0 0 8px 1px rgba(0, 245, 255, 0.8)" 
              : "0 0 8px 1px rgba(255, 0, 255, 0.8)"
          }}
        />
      ))}
      
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ 
          scale: [0, 1.5, 2],
          opacity: [0.8, 0.4, 0]
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full
                  bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] blur-sm"
      />
    </div>
  );
};

export default TaskExplosion;
