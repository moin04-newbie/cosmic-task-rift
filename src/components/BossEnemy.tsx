
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BossEnemyProps {
  isAttacking: boolean;
  health: number;
  isDefeated: boolean;
}

const BossEnemy = ({ isAttacking, health, isDefeated }: BossEnemyProps) => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  
  useEffect(() => {
    if (isAttacking) {
      setGlitchIntensity(0.4);
      const timer = setTimeout(() => {
        setGlitchIntensity(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAttacking]);
  
  useEffect(() => {
    if (health < 30) {
      const interval = setInterval(() => {
        setGlitchIntensity(Math.random() * 0.2);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [health]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isDefeated ? [1, 0.8, 0] : 1, 
        opacity: isDefeated ? [1, 0.5, 0] : 1,
        y: isAttacking ? [0, -10, 0] : 0,
        filter: `hue-rotate(${Math.random() * glitchIntensity * 360}deg) 
                blur(${glitchIntensity * 5}px)`,
        x: glitchIntensity > 0 ? [0, -5, 5, -2, 0] : 0,
      }}
      transition={{ 
        duration: isDefeated ? 1.5 : 0.3,
        times: isDefeated ? [0, 0.8, 1] : undefined
      }}
      className="w-40 h-40 relative"
    >
      <div className="absolute inset-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            fill="#FF0066"
            animate={{
              d: [
                "M40,-53.1C51.9,-45.7,61.9,-33.9,67.4,-19.6C72.8,-5.4,73.8,11.2,68.2,25.2C62.5,39.2,50.3,50.6,36.1,57.5C22,64.5,5.8,67.1,-9.5,64.7C-24.8,62.3,-39.1,55,-49.9,43.3C-60.7,31.6,-68,15.8,-69.8,-1.8C-71.6,-19.4,-67.7,-38.8,-56.8,-46.2C-45.8,-53.6,-27.9,-49.1,-11.8,-47.3C4.3,-45.6,28.1,-60.5,40,-53.1Z",
                "M40.5,-49.3C51,-39.1,57.4,-23.8,60.7,-7.1C64,9.7,64.2,27.8,55.8,40.6C47.3,53.3,30.3,60.6,12.9,63C-4.5,65.4,-22.4,62.9,-36.3,53.6C-50.3,44.3,-60.3,28.2,-64.5,10.2C-68.7,-7.9,-67.1,-27.8,-57,-39.8C-46.9,-51.9,-28.4,-56,-11.5,-56.2C5.4,-56.4,30,-59.4,40.5,-49.3Z",
                "M38.5,-48.1C49.3,-40.4,56.9,-26.7,61.4,-10.6C65.9,5.4,67.2,23.8,59.8,37.5C52.3,51.2,36,60.2,18.9,64.6C1.8,69,-16.2,68.7,-27.5,60.5C-38.8,52.3,-43.5,36.3,-49.8,20.8C-56.2,5.4,-64.1,-9.4,-61.5,-22.1C-58.9,-34.8,-45.7,-45.3,-32.1,-52.3C-18.5,-59.4,-4.7,-62.9,8.6,-61.4C21.9,-59.9,27.7,-55.8,38.5,-48.1Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </svg>
      </div>
      
      {/* Boss face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Eyes */}
          <motion.div
            className="flex gap-6"
            animate={{
              y: isAttacking ? [0, -10, 0] : [0, 2, 0],
            }}
            transition={{
              duration: isAttacking ? 0.3 : 2,
              repeat: isAttacking ? 0 : Infinity,
              repeatType: "mirror",
            }}
          >
            <motion.div
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                opacity: glitchIntensity > 0.1 ? [1, 0, 1] : 1,
                scale: health < 10 ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
            <motion.div
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                opacity: glitchIntensity > 0.1 ? [1, 0, 1] : 1,
                scale: health < 10 ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          </motion.div>
          
          {/* Mouth */}
          <motion.div
            className="w-8 h-2 bg-white mt-6 mx-auto"
            animate={{
              height: isAttacking ? 8 : 2,
              width: isAttacking ? 12 : 8,
              y: isAttacking ? 2 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        </div>
      </div>
      
      {/* Damage indicator */}
      {isAttacking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-red-500/30"
        />
      )}
      
      {/* Health bar */}
      <div className="absolute -top-10 left-0 right-0 flex justify-center">
        <div className="w-32 h-2 bg-black/40 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${health}%` }}
            className="h-full bg-gradient-to-r from-red-500 to-red-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BossEnemy;
