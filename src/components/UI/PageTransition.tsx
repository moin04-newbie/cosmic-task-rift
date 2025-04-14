
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export const PageTransition = ({ children, location }: PageTransitionProps) => {
  const [isReady, setIsReady] = useState(false);
  const currentTheme = useThemeStore(state => state.getTheme());
  
  useEffect(() => {
    // Ensure the component is ready before animating
    setIsReady(true);
    
    return () => {
      setIsReady(false);
    };
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ 
          opacity: 0,
          y: 20
        }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        exit={{ 
          opacity: 0,
          y: -20
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
        className="w-full h-full"
        style={{
          // Apply subtle glow effect based on theme
          boxShadow: `0 0 100px 0 ${currentTheme.primary}05 inset`
        }}
      >
        {isReady && children}
      </motion.div>
    </AnimatePresence>
  );
};
