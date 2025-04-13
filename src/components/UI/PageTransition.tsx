
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
}

export const PageTransition = ({ children, location }: PageTransitionProps) => {
  const [previousLocation, setPreviousLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (previousLocation !== location) {
      setIsTransitioning(true);
      setPreviousLocation(location);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Transition duration
      
      return () => clearTimeout(timer);
    }
  }, [location, previousLocation]);

  return (
    <>
      {/* Wormhole overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/80" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.5, 0],
                rotate: [0, 180],
              }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[600px] h-[600px] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] opacity-70" />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `
                      repeating-radial-gradient(
                        circle at center,
                        transparent 0,
                        transparent 20px,
                        rgba(0, 245, 255, 0.3) 20px,
                        rgba(0, 245, 255, 0.3) 22px
                      )
                    `,
                  }}
                />
              </div>
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 0.8,
                  times: [0, 0.5, 1],
                }}
                className="text-4xl font-bold text-white tracking-wider font-heading"
              >
                {location === "/" ? "HOME" : location.substring(1).toUpperCase()}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page content */}
      <div>
        {children}
      </div>
    </>
  );
};
