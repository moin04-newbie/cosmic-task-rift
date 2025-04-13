
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BossEnemyProps {
  healthPercentage: number;
}

const BossEnemy = ({ healthPercentage }: BossEnemyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Boss state based on health
  const bossState = 
    healthPercentage > 66 ? "strong" :
    healthPercentage > 33 ? "wounded" :
    healthPercentage > 0 ? "critical" :
    "defeated";
  
  // Color based on boss state
  const primaryColor = 
    bossState === "strong" ? "#FF00FF" :
    bossState === "wounded" ? "#FF8800" :
    bossState === "critical" ? "#FF4444" :
    "#444444";
  
  const secondaryColor = 
    bossState === "strong" ? "#CC00CC" :
    bossState === "wounded" ? "#CC6600" :
    bossState === "critical" ? "#CC0000" :
    "#222222";
    
  const glowColor = 
    bossState === "strong" ? "rgba(255, 0, 255, 0.6)" :
    bossState === "wounded" ? "rgba(255, 136, 0, 0.6)" :
    bossState === "critical" ? "rgba(255, 68, 68, 0.6)" :
    "rgba(0, 0, 0, 0)";
  
  // Animation variants based on state
  const bossVariants = {
    strong: {
      scale: [1, 1.02, 1],
      rotate: [0, 1, 0, -1, 0],
      filter: "drop-shadow(0 0 10px rgba(255, 0, 255, 0.7))",
      transition: { repeat: Infinity, duration: 2 }
    },
    wounded: {
      scale: [0.98, 1, 0.98],
      rotate: [0, 2, 0, -2, 0],
      filter: "drop-shadow(0 0 8px rgba(255, 136, 0, 0.6))",
      transition: { repeat: Infinity, duration: 1.8 }
    },
    critical: {
      scale: [0.95, 0.98, 0.95],
      rotate: [0, 3, 0, -3, 0],
      filter: "drop-shadow(0 0 6px rgba(255, 68, 68, 0.5))",
      transition: { repeat: Infinity, duration: 1.5 }
    },
    defeated: {
      scale: 0.9,
      rotate: 15,
      filter: "grayscale(100%)",
      transition: { duration: 1 }
    }
  };
  
  return (
    <div className="w-full flex items-center justify-center py-4">
      <motion.div
        animate={bossState}
        variants={bossVariants}
        className="relative"
        style={{
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      >
        <svg 
          ref={svgRef}
          width="150" 
          height="150" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Boss SVG shape */}
          <g>
            {/* Boss body */}
            <motion.path
              d="M100,20 L130,50 L170,60 L150,100 L170,140 L130,150 L100,180 L70,150 L30,140 L50,100 L30,60 L70,50 Z"
              fill={primaryColor}
              stroke="#000"
              strokeWidth="2"
              animate={{
                opacity: bossState === "defeated" ? 0.5 : 1,
              }}
            />
            
            {/* Inner shape */}
            <motion.path
              d="M100,40 L120,60 L145,68 L130,100 L145,132 L120,140 L100,160 L80,140 L55,132 L70,100 L55,68 L80,60 Z"
              fill={secondaryColor}
              animate={{
                opacity: bossState === "defeated" ? 0.3 : 0.8,
              }}
            />
            
            {/* Eyes */}
            <motion.circle
              cx="80"
              cy="90"
              r="8"
              fill="#FFFFFF"
              animate={{
                r: bossState === "defeated" ? 2 : [8, 9, 8],
                transition: { repeat: Infinity, duration: 2 }
              }}
            />
            <motion.circle
              cx="120"
              cy="90"
              r="8"
              fill="#FFFFFF"
              animate={{
                r: bossState === "defeated" ? 2 : [8, 9, 8],
                transition: { repeat: Infinity, duration: 2, delay: 0.3 }
              }}
            />
            
            {/* Pupils */}
            <motion.circle
              cx="80"
              cy="90"
              r="4"
              fill="#000000"
              animate={{
                cx: bossState === "defeated" ? 80 : [82, 78, 80],
                cy: bossState === "defeated" ? 90 : [92, 88, 90],
                transition: { repeat: Infinity, duration: 3 }
              }}
            />
            <motion.circle
              cx="120"
              cy="90"
              r="4"
              fill="#000000"
              animate={{
                cx: bossState === "defeated" ? 120 : [122, 118, 120],
                cy: bossState === "defeated" ? 90 : [92, 88, 90],
                transition: { repeat: Infinity, duration: 3, delay: 0.2 }
              }}
            />
            
            {/* Mouth */}
            <motion.path
              d="M90,120 Q100,130 110,120"
              stroke="#000000"
              strokeWidth="3"
              fill="transparent"
              animate={{
                d: bossState === "defeated" 
                  ? "M90,120 Q100,115 110,120" 
                  : bossState === "critical"
                  ? "M90,125 Q100,140 110,125"
                  : bossState === "wounded"
                  ? "M90,120 Q100,135 110,120"
                  : "M90,120 Q100,130 110,120"
              }}
            />
            
            {/* Spikes/horns */}
            {bossState !== "defeated" && (
              <>
                <motion.path
                  d="M100,20 L95,5 L100,20 L105,5 L100,20"
                  fill={primaryColor}
                  animate={{
                    d: [
                      "M100,20 L95,5 L100,20 L105,5 L100,20",
                      "M100,20 L95,0 L100,20 L105,0 L100,20",
                      "M100,20 L95,5 L100,20 L105,5 L100,20"
                    ],
                    transition: { repeat: Infinity, duration: 2 }
                  }}
                />
                <motion.path
                  d="M170,60 L185,55 L170,60 L185,65 L170,60"
                  fill={primaryColor}
                  animate={{
                    d: [
                      "M170,60 L185,55 L170,60 L185,65 L170,60",
                      "M170,60 L190,55 L170,60 L190,65 L170,60",
                      "M170,60 L185,55 L170,60 L185,65 L170,60"
                    ],
                    transition: { repeat: Infinity, duration: 2, delay: 0.3 }
                  }}
                />
                <motion.path
                  d="M30,60 L15,55 L30,60 L15,65 L30,60"
                  fill={primaryColor}
                  animate={{
                    d: [
                      "M30,60 L15,55 L30,60 L15,65 L30,60",
                      "M30,60 L10,55 L30,60 L10,65 L30,60",
                      "M30,60 L15,55 L30,60 L15,65 L30,60"
                    ],
                    transition: { repeat: Infinity, duration: 2, delay: 0.6 }
                  }}
                />
              </>
            )}
          </g>
        </svg>
        
        {/* Damage indicators */}
        {healthPercentage <= 66 && (
          <motion.div
            className="absolute top-1/4 left-1/4 text-xl font-bold text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            💥
          </motion.div>
        )}
        
        {healthPercentage <= 33 && (
          <motion.div
            className="absolute top-1/3 right-1/4 text-xl font-bold text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
          >
            💥
          </motion.div>
        )}
        
        {healthPercentage === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            ⚡
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BossEnemy;
